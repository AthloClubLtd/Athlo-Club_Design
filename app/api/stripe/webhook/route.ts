import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

/**
 * Stripe webhook handler. Verifies the signature when
 * `STRIPE_WEBHOOK_SECRET` is configured, then no-ops on the two events
 * this platform cares about — the real handling is left as TODOs since it
 * depends on decisions (e.g. how order fulfilment failures are surfaced)
 * that are out of scope for this scaffold.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        stub: true,
        message:
          "Stripe isn't configured yet (STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET unset). This is a safe no-op.",
      },
      { status: 200 },
    );
  }

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const checkoutSession = event.data.object as Stripe.Checkout.Session;
      const orderId = checkoutSession.metadata?.orderId;
      if (orderId) {
        // TODO: also verify `checkoutSession.payment_status === "paid"` and
        // reconcile `amountTotalCents` against what Stripe actually
        // charged before marking the order paid.
        await prisma.order
          .update({
            where: { id: orderId },
            data: {
              status: "PAID",
              stripePaymentIntentId:
                typeof checkoutSession.payment_intent === "string"
                  ? checkoutSession.payment_intent
                  : undefined,
            },
          })
          .catch(() => null);
      }
      // TODO: handle the premium-subscription case (metadata.athleteId)
      // by setting Athlete.premiumStatus = "ACTIVE" once subscriptions are
      // live.
      break;
    }
    case "account.updated": {
      // TODO: once Connect onboarding is live, read
      // `event.data.object.charges_enabled` / `details_submitted` and set
      // Club.stripeOnboardingStatus to COMPLETE when the account is fully
      // onboarded.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

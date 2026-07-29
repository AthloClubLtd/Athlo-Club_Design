import { NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Checkout Session for the £9.99/mo athlete premium subscription. This is
 * a direct Athlo subscription — not a marketplace charge — so there's no
 * `application_fee_amount` and no connected account involved.
 */
export async function POST() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PREMIUM_PRICE_ID) {
    // TODO: remove this branch once STRIPE_SECRET_KEY and
    // STRIPE_PREMIUM_PRICE_ID are configured — real Checkout Session
    // creation below runs instead.
    return NextResponse.json({
      ok: false,
      stub: true,
      message:
        "Stripe premium checkout isn't configured yet (STRIPE_SECRET_KEY / STRIPE_PREMIUM_PRICE_ID unset). This is a safe no-op.",
    });
  }

  const athlete = await prisma.athlete.findUnique({ where: { id: session.athleteId } });
  if (!athlete) {
    return NextResponse.json({ error: "Athlete not found." }, { status: 404 });
  }

  const stripe = getStripe();
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  // TODO: once real subscriptions are live, reuse the athlete's existing
  // Stripe customer if `stripeCustomerId` is already set instead of
  // letting Checkout create a new one every time.
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: athlete.stripeCustomerId ?? undefined,
    customer_email: athlete.stripeCustomerId ? undefined : athlete.email,
    line_items: [{ price: process.env.STRIPE_PREMIUM_PRICE_ID, quantity: 1 }],
    success_url: `${baseUrl}/app/settings?premium=success`,
    cancel_url: `${baseUrl}/app/settings?premium=cancelled`,
    metadata: { athleteId: athlete.id },
  });

  return NextResponse.json({ ok: true, url: checkoutSession.url });
}

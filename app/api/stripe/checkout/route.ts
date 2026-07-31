import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { calculateEventTicketFeeCents, getStripe } from "@/lib/stripe";

/**
 * Sketches an event ticket checkout using Stripe Connect destination
 * charges: the full ticket price is charged to the athlete, Athlo's 4%
 * `application_fee_amount` is retained automatically, and the remainder
 * settles to the organising club's connected account via
 * `transfer_data.destination`.
 *
 * Stub for now — safe no-op if Stripe isn't configured, and several real
 * details (idempotency, currency mismatches, capacity checks) are left as
 * TODOs rather than fully implemented.
 */
export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const ticketTypeId = String(body.ticketTypeId ?? "");
  if (!ticketTypeId) {
    return NextResponse.json({ error: "ticketTypeId is required." }, { status: 400 });
  }

  const ticketType = await prisma.ticketType.findUnique({
    where: { id: ticketTypeId },
    include: { event: { include: { club: true } } },
  });
  if (!ticketType) {
    return NextResponse.json({ error: "Ticket type not found." }, { status: 404 });
  }

  const applicationFeeCents = calculateEventTicketFeeCents(ticketType.priceCents);

  if (!process.env.STRIPE_SECRET_KEY) {
    // TODO: remove this branch once STRIPE_SECRET_KEY is configured — the
    // real Checkout Session creation below runs instead.
    return NextResponse.json({
      ok: false,
      stub: true,
      message:
        "Stripe isn't configured yet (STRIPE_SECRET_KEY is unset). This is a safe no-op — no checkout session was created.",
      wouldCharge: {
        amountTotalCents: ticketType.priceCents,
        applicationFeeCents,
      },
    });
  }

  if (!ticketType.event.club.stripeAccountId) {
    return NextResponse.json(
      { error: "This club hasn't finished connecting its Stripe account yet." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  // TODO: wrap this in a transaction with a capacity check once ticket
  // capacity enforcement is implemented.
  const order = await prisma.order.create({
    data: {
      eventId: ticketType.eventId,
      ticketTypeId: ticketType.id,
      athleteId: session.athleteId,
      amountTotalCents: ticketType.priceCents,
      applicationFeeCents,
      status: "PENDING",
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: ticketType.currency.toLowerCase(),
          unit_amount: ticketType.priceCents,
          product_data: { name: `${ticketType.event.title} — ${ticketType.name}` },
        },
      },
    ],
    payment_intent_data: {
      application_fee_amount: applicationFeeCents,
      transfer_data: { destination: ticketType.event.club.stripeAccountId },
    },
    success_url: `${baseUrl}/discover/events/${ticketType.event.slug}?checkout=success`,
    cancel_url: `${baseUrl}/discover/events/${ticketType.event.slug}?checkout=cancelled`,
    metadata: { orderId: order.id },
  });

  return NextResponse.json({ ok: true, url: checkoutSession.url });
}

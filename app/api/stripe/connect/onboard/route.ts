import { NextRequest, NextResponse } from "next/server";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Starts (or resumes) Stripe Connect Standard onboarding for a club, so it
 * can receive destination charges for its events and competitions.
 *
 * Stub for now: if `STRIPE_SECRET_KEY` isn't configured, this safely no-ops
 * and returns a clear message instead of crashing — real onboarding is
 * wired in once Stripe keys exist.
 */
export async function POST(req: NextRequest) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const clubSlug = String(body.clubSlug ?? "");
  if (!clubSlug) {
    return NextResponse.json({ error: "clubSlug is required." }, { status: 400 });
  }

  const club = await prisma.club.findUnique({ where: { slug: clubSlug } });
  if (!club) {
    return NextResponse.json({ error: "Club not found." }, { status: 404 });
  }
  if (club.ownerId !== session.athleteId && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Only the club owner can start onboarding." }, { status: 403 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    // TODO: once STRIPE_SECRET_KEY is configured, this branch goes away —
    // the code below runs for real instead.
    return NextResponse.json({
      ok: false,
      stub: true,
      message:
        "Stripe isn't configured yet (STRIPE_SECRET_KEY is unset). This is a safe no-op — no account was created.",
    });
  }

  const stripe = getStripe();

  // TODO: once real onboarding is live, persist and reuse the same Connect
  // account across repeated onboarding attempts instead of creating a new
  // one every time this route is called.
  let stripeAccountId = club.stripeAccountId;
  if (!stripeAccountId) {
    const account = await stripe.accounts.create({ type: "standard" });
    stripeAccountId = account.id;
    await prisma.club.update({
      where: { id: club.id },
      data: { stripeAccountId, stripeOnboardingStatus: "PENDING" },
    });
  }

  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/app/clubs/${club.slug}`,
    return_url: `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/app/clubs/${club.slug}`,
    type: "account_onboarding",
  });

  return NextResponse.json({ ok: true, url: accountLink.url });
}

import Stripe from "stripe";

/**
 * Stripe client singleton.
 *
 * This is lazy on purpose: importing this module must never crash the app
 * in dev when `STRIPE_SECRET_KEY` isn't set (e.g. running the scaffold
 * before Stripe is configured). The error only throws when a route
 * actually tries to call Stripe.
 */
let cachedStripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (cachedStripe) return cachedStripe;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to your environment before using any Stripe-backed route.",
    );
  }

  cachedStripe = new Stripe(secretKey, {
    apiVersion: "2026-06-24.dahlia",
  });
  return cachedStripe;
}

/** Athlo's marketplace fee model (Step 6 spec — Stripe Connect, Standard accounts). */
export const PLATFORM_FEES = {
  /** 4% of the ticket price, deducted via `application_fee_amount`. */
  eventTicketPercent: 0.04,
  /** 4% + a flat £1.50 (150p) per competition entry. */
  competitionEntryPercent: 0.04,
  competitionEntryFlatCents: 150,
} as const;

export function calculateEventTicketFeeCents(priceCents: number): number {
  return Math.round(priceCents * PLATFORM_FEES.eventTicketPercent);
}

export function calculateCompetitionEntryFeeCents(priceCents: number): number {
  return (
    Math.round(priceCents * PLATFORM_FEES.competitionEntryPercent) +
    PLATFORM_FEES.competitionEntryFlatCents
  );
}

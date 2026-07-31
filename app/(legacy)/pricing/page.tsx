import type { Metadata } from "next";
import { PrimaryCta } from "@/components/cta-link";

export const metadata: Metadata = {
  title: "Pricing — Athlo Club",
  description:
    "Free for athletes. Organisers pay 4% per event ticket, or 4%+£1.50 per competition entry — only when they get paid. Optional £9.99/mo athlete premium.",
};

const premiumFeatures = [
  "Advanced PR and progress analytics across all your sports",
  "Priority registration windows for high-demand events",
  "Downloadable competition history and results export",
  "Early access to new features and event formats",
];

export default function PricingPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pt-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime">Pricing</p>
        <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Free to join. Pay only when you get paid.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-grey-300">
          Athletes never pay to use Athlo Club. Organisers pay a simple
          per-transaction fee — no subscriptions, no setup costs.
        </p>
        <div className="mt-10">
          <PrimaryCta href="/signup" className="px-8 py-4 text-base">
            Start free — pay only when you get paid
          </PrimaryCta>
        </div>
      </section>

      {/* Organiser fee table */}
      <section className="border-t border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Organiser fees</h2>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[480px] border-collapse text-left">
              <thead>
                <tr className="bg-navy-800">
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-widest text-grey-400">
                    Transaction type
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-widest text-grey-400">
                    Fee
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-widest text-grey-400">
                    Billed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="px-6 py-5 font-semibold">Event tickets</td>
                  <td className="px-6 py-5 text-lime font-bold">4%</td>
                  <td className="px-6 py-5 text-grey-400">Deducted at checkout, per ticket</td>
                </tr>
                <tr>
                  <td className="px-6 py-5 font-semibold">Competition entries</td>
                  <td className="px-6 py-5 text-lime font-bold">4% + £1.50</td>
                  <td className="px-6 py-5 text-grey-400">Deducted at checkout, per entry</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-grey-400">
            No monthly fee, no setup fee. Payouts go straight to your
            connected Stripe account, minus Athlo&rsquo;s fee.
          </p>
        </div>
      </section>

      {/* Premium card */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Athlete premium</h2>
        <div className="mt-8 max-w-md rounded-2xl border border-lime/40 bg-navy-800 p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-lime">Premium</p>
          <p className="mt-4 text-4xl font-extrabold tracking-tight">
            £9.99<span className="text-lg font-semibold text-grey-400">/mo</span>
          </p>
          <ul className="mt-6 space-y-3">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-grey-300">
                <span className="mt-0.5 text-lime">&#10003;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <PrimaryCta href="/signup" className="w-full">
              Upgrade to premium
            </PrimaryCta>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import InvestorForm from "@/components/investor-form";

export const metadata: Metadata = {
  title: "Investors — Athlo Club",
  description:
    "Athlo Club is building the platform for strength sports competition. Request data room access to learn more about our traction and roadmap.",
};

export default function InvestorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Investors</p>
      <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Backing the infrastructure for strength sports.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-grey-300">
        Weightlifting, powerlifting, CrossFit and fitness racing are among the
        fastest-growing participation sports in the world, and none of them
        have had software built for how they actually run events. We&rsquo;re
        fixing that.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Request data room access</h2>
          <p className="mt-3 max-w-md text-grey-400">
            Tell us a bit about yourself and we&rsquo;ll follow up with our
            deck, traction data and cap table access.
          </p>
          <div className="mt-8">
            <InvestorForm />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-navy-800 p-10">
          <h3 className="text-lg font-bold tracking-tight">Why now</h3>
          <ul className="mt-4 space-y-4 text-sm text-grey-400">
            <li>
              Strength sports participation is growing fastest at the grassroots
              level, but registration, payments and scoring are still run on
              spreadsheets, Facebook groups and one-off booking tools.
            </li>
            <li>
              Athlo takes a transaction-based cut (4% on tickets, 4%+£1.50 on
              competition entries) rather than charging organisers upfront —
              aligning our growth with theirs.
            </li>
            <li>
              A free, durable athlete profile with real competition history
              gives us a compounding data asset across all four sports.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

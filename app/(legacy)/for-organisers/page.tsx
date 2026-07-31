import type { Metadata } from "next";
import { PrimaryCta } from "@/components/cta-link";

export const metadata: Metadata = {
  title: "For Organisers — Run your event on Athlo Club",
  description:
    "Registration, payments, scoring and live leaderboards for weightlifting, powerlifting, CrossFit and fitness racing events. 4% per ticket, 4%+£1.50 per competition entry. No monthly fees.",
};

const features = [
  {
    title: "Registration",
    body: "Build ticket tiers and competition divisions, cap capacity, and let athletes register in minutes from a page built for your event.",
  },
  {
    title: "Payments",
    body: "Athletes pay by card at checkout. Funds settle to your connected account automatically, minus Athlo's fee — no invoicing, no chasing.",
  },
  {
    title: "Scoring",
    body: "Purpose-built scoring for reps, time, load and placement across all four sports, with tiebreaker rules baked in.",
  },
  {
    title: "Live leaderboards",
    body: "Publish results as they happen so athletes, coaches and spectators can follow along on any device.",
  },
];

export default function ForOrganisersPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pt-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime">
          For organisers
        </p>
        <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Run a better event, without the admin.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-grey-300">
          Whether you&rsquo;re a club running a Saturday meet or a federation
          sanctioning a national championship, Athlo handles registration,
          payments, scoring and leaderboards so you can focus on the floor.
        </p>
        <div className="mt-10">
          <PrimaryCta href="/signup" className="px-8 py-4 text-base">
            Start your first event free
          </PrimaryCta>
        </div>
      </section>

      {/* Fee transparency */}
      <section className="border-t border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Simple, transparent fees
          </h2>
          <p className="mt-3 max-w-xl text-grey-400">
            No subscription, no setup cost. Athlo only makes money when your
            event does.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-navy-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-grey-400">
                Event tickets
              </p>
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-lime">4%</p>
              <p className="mt-2 text-sm text-grey-400">per ticket sold, deducted automatically at checkout.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-navy-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-grey-400">
                Competition entries
              </p>
              <p className="mt-4 text-4xl font-extrabold tracking-tight text-lime">4% + £1.50</p>
              <p className="mt-2 text-sm text-grey-400">per athlete entry, covering scoring and leaderboard infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-lime">
          Everything you need to run event day
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-navy-800 p-8">
              <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-grey-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/5 bg-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Your first event costs nothing to set up.
            </h2>
            <p className="mt-3 text-grey-400">
              Create your club, publish your event, and only pay the fee when
              athletes register.
            </p>
          </div>
          <PrimaryCta href="/signup" className="shrink-0">
            Start your first event free
          </PrimaryCta>
        </div>
      </section>
    </div>
  );
}

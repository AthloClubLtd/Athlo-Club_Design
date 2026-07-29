import type { Metadata } from "next";
import { PrimaryCta, SecondaryCta } from "@/components/cta-link";
import { SPORTS } from "@/lib/sports";

export const metadata: Metadata = {
  title: "Athlo Club — Discover strength sports events near you",
  description:
    "Find weightlifting, powerlifting, CrossFit and fitness racing events and clubs, or run your own with registration, payments, scoring and live leaderboards built in.",
};

const steps = [
  {
    title: "Find your event",
    body: "Filter by sport, location and format to find weightlifting, powerlifting, CrossFit and fitness racing events near you or online.",
  },
  {
    title: "Register in minutes",
    body: "Sign up, pick a ticket or division, and pay securely — your entry and receipt are ready instantly.",
  },
  {
    title: "Compete and track it",
    body: "Show up, compete, and your results, placements and PRs land straight in your athlete profile.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 sm:pt-28">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-lime">
            Weightlifting &middot; Powerlifting &middot; CrossFit &middot; Fitness Racing
          </p>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            The home for strength sports competition.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-grey-300">
            Athlo Club connects athletes with the events, clubs and
            federations that make strength sports happen — and gives
            organisers the tools to run them properly.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <PrimaryCta href="/discover" className="px-8 py-4 text-base">
              Discover events near you
            </PrimaryCta>
            <SecondaryCta href="/for-organisers">
              Running events? See how organisers use Athlo →
            </SecondaryCta>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-lime">
            How it works
          </h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 text-sm font-bold text-lime">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-grey-400">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports strip */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-lime">
          Built for four sports
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPORTS.map((sport) => (
            <div
              key={sport.slug}
              className="rounded-2xl border border-white/10 bg-navy-800 p-6"
            >
              <h3 className="text-lg font-bold tracking-tight">{sport.label}</h3>
              <p className="mt-2 text-sm text-grey-400">{sport.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Organiser teaser band */}
      <section className="border-t border-white/5 bg-navy-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Running a meet, a comp, or a race? Athlo handles the admin.
            </h2>
            <p className="mt-3 text-grey-400">
              Registration, payments, scoring and live leaderboards in one
              place. You only pay when your athletes do — 4% per ticket, or
              4% + £1.50 per competition entry.
            </p>
          </div>
          <PrimaryCta href="/for-organisers" className="shrink-0">
            See organiser tools
          </PrimaryCta>
        </div>
      </section>
    </div>
  );
}

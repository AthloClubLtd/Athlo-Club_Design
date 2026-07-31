import type { Metadata } from "next";
import { PrimaryCta } from "@/components/cta-link";

export const metadata: Metadata = {
  title: "For Athletes — Track your progress, find your next competition",
  description:
    "Build your athlete profile, log your PRs, and discover weightlifting, powerlifting, CrossFit and fitness racing events near you. Free forever, premium optional.",
};

const hooks = [
  {
    title: "One profile, every result",
    body: "Every competition you enter through Athlo adds to a single history — placements, scores and divisions, all in one place.",
  },
  {
    title: "PR tracking that means something",
    body: "Log lifts, times and distances against real competition data, not just gym notes. Watch your progress over months and years.",
  },
  {
    title: "Competition history that travels with you",
    body: "Change clubs, change federations, change cities — your record stays yours.",
  },
];

export default function ForAthletesPage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pt-28">
        <p className="text-sm font-semibold uppercase tracking-widest text-lime">
          For athletes
        </p>
        <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Your competition history, finally in one place.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-grey-300">
          Athlo Club is free for athletes. Build a profile, track your PRs
          across weightlifting, powerlifting, CrossFit and fitness racing,
          and find your next event without digging through spreadsheets and
          group chats.
        </p>
        <div className="mt-10">
          <PrimaryCta href="/signup" className="px-8 py-4 text-base">
            Create your profile
          </PrimaryCta>
        </div>
      </section>

      <section className="border-t border-white/5 bg-ink">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 sm:grid-cols-3">
            {hooks.map((h) => (
              <div key={h.title}>
                <h3 className="text-xl font-bold tracking-tight">{h.title}</h3>
                <p className="mt-2 text-grey-400">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-navy-800 p-10 sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-lime">
            Free, with an optional upgrade
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-extrabold tracking-tight">
            Athlo is free for every athlete. Premium is there if you want more.
          </h2>
          <p className="mt-4 max-w-xl text-grey-400">
            Discovering events, registering, tracking PRs and building your
            competition history will always be free. Premium adds deeper
            analytics and priority access to popular events for £9.99/mo.
          </p>
          <div className="mt-8">
            <PrimaryCta href="/pricing">See premium features</PrimaryCta>
          </div>
        </div>
      </section>
    </div>
  );
}

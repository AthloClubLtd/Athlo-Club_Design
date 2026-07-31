import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Athlo Club",
  description:
    "Athlo Club exists to make strength sports easier to run and easier to find — for weightlifting, powerlifting, CrossFit and fitness racing.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-20 sm:pt-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">About</p>
      <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Built by people who ran meets on spreadsheets.
      </h1>

      <div className="mt-10 space-y-6 text-lg text-grey-300">
        <p>
          Athlo Club started with a simple frustration: every weightlifting
          meet, powerlifting comp, CrossFit throwdown and fitness race we
          helped run was held together by a spreadsheet, a Facebook event, a
          separate payment link, and someone frantically updating a
          whiteboard with live scores. The sports had grown up. The tools
          hadn&rsquo;t.
        </p>
        <p>
          We started in weightlifting and powerlifting, where local clubs
          affiliate to federations but still run their own meets by hand. We
          added CrossFit, where scoring rules and time caps vary comp to
          comp and leaderboards are often a shared document refreshed by
          hand. Fitness racing came next — heats, waves and mixed formats
          that none of the existing tools handled well.
        </p>
        <p>
          Four sports, one shared problem: organisers needed registration,
          payments and scoring in one place, and athletes needed a single
          record of who they are as a competitor that didn&rsquo;t disappear
          when a season ended or a club changed hands.
        </p>
        <p>
          That&rsquo;s Athlo Club. Free for athletes, forever. Simple,
          transparent fees for organisers, only charged when they get paid.
          Built for the four sports we love, by people who&rsquo;ve stood on
          the competition floor running them.
        </p>
      </div>

      <div className="mt-14 rounded-2xl border border-white/10 bg-navy-800 p-10">
        <h2 className="text-xl font-bold tracking-tight">Get in touch</h2>
        <p className="mt-3 text-grey-400">
          Questions, partnership ideas, or just want to say hello — we&rsquo;d
          love to hear from you.
        </p>
        <a
          href="mailto:hello@athloclub.com"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-lime px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          hello@athloclub.com
        </a>
      </div>
    </div>
  );
}

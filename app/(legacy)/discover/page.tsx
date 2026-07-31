import type { Metadata } from "next";
import Link from "next/link";
import DiscoverFilters from "@/components/discover-filters";
import { getEvents } from "@/lib/discover";
import { sportLabel } from "@/lib/sports";

export const metadata: Metadata = {
  title: "Discover — Athlo Club",
  description:
    "Find weightlifting, powerlifting, CrossFit and fitness racing events and clubs near you, or join virtually from anywhere.",
};

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" };
  const startStr = startDate.toLocaleDateString("en-GB", opts);
  const endStr = endDate.toLocaleDateString("en-GB", opts);
  return startStr === endStr ? startStr : `${startStr} – ${endStr}`;
}

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: { sport?: string; location?: string; mode?: string; level?: string };
}) {
  const events = await getEvents({
    sport: searchParams.sport,
    location: searchParams.location,
    mode: searchParams.mode as "virtual" | "in-person" | undefined,
    level: searchParams.level,
  });

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Discover</p>
      <h1 className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Find your next event.
      </h1>
      <p className="mt-6 max-w-xl text-lg text-grey-300">
        Filter by sport, format and level to find weightlifting,
        powerlifting, CrossFit and fitness racing events near you, or join
        virtually from anywhere.
      </p>

      <div className="mt-10">
        <DiscoverFilters />
      </div>

      <p className="mt-8 text-sm text-grey-400">
        {events.length} event{events.length === 1 ? "" : "s"} found
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.slug}
            href={`/discover/events/${event.slug}`}
            className="flex flex-col rounded-2xl border border-white/10 bg-navy-800 p-6 transition-colors hover:border-lime/50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-lime">
                {sportLabel(event.sport)}
              </span>
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-grey-300">
                {event.format === "VIRTUAL"
                  ? "Virtual"
                  : event.format === "HYBRID"
                    ? "Hybrid"
                    : "In person"}
              </span>
            </div>
            <h2 className="mt-3 text-lg font-bold leading-snug tracking-tight">{event.title}</h2>
            <p className="mt-2 flex-1 text-sm text-grey-400">{event.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-grey-400">
              <span>{formatDateRange(event.startDate, event.endDate)}</span>
              <span>{event.location ?? "Online"}</span>
            </div>
          </Link>
        ))}
      </div>

      {events.length === 0 && (
        <p className="mt-16 text-grey-400">No events match those filters yet — try widening your search.</p>
      )}
    </div>
  );
}

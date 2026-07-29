"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SPORTS } from "@/lib/sports";
import { LEVELS } from "@/lib/discover";

const MODES: { value: "virtual" | "in-person"; label: string }[] = [
  { value: "in-person", label: "In person" },
  { value: "virtual", label: "Virtual" },
];

export default function DiscoverFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [location, setLocation] = useState(searchParams.get("location") ?? "");

  const activeSport = searchParams.get("sport");
  const activeMode = searchParams.get("mode");
  const activeLevel = searchParams.get("level");

  function pushParams(next: URLSearchParams) {
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  }

  function toggle(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (next.get(key) === value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    pushParams(next);
  }

  function submitLocation(e: React.FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(searchParams.toString());
    if (location.trim()) {
      next.set("location", location.trim());
    } else {
      next.delete("location");
    }
    pushParams(next);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={submitLocation} className="flex max-w-md gap-2">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location or venue"
          className="w-full rounded-full border border-white/15 bg-ink px-4 py-2 text-sm text-white outline-none focus:border-lime"
        />
        <button
          type="submit"
          className="rounded-full bg-lime px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-grey-400">
          Sport
        </span>
        {SPORTS.map((sport) => (
          <button
            key={sport.slug}
            onClick={() => toggle("sport", sport.slug)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeSport === sport.slug
                ? "border-lime bg-lime text-navy"
                : "border-white/15 text-grey-300 hover:text-white"
            }`}
          >
            {sport.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-grey-400">
          Format
        </span>
        {MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => toggle("mode", mode.value)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeMode === mode.value
                ? "border-lime bg-lime text-navy"
                : "border-white/15 text-grey-300 hover:text-white"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-widest text-grey-400">
          Level
        </span>
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => toggle("level", level)}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeLevel === level
                ? "border-lime bg-lime text-navy"
                : "border-white/15 text-grey-300 hover:text-white"
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

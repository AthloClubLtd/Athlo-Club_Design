"use client";

import { ChevronDown } from "lucide-react";
import { DIFFICULTY_FILTERS, type Difficulty } from "@/lib/playground/types";

export function DifficultySelect({
  value,
  onChange,
}: {
  value: Difficulty | "all";
  onChange: (value: Difficulty | "all") => void;
}) {
  return (
    <div className="relative inline-flex">
      <label htmlFor="discover-difficulty" className="sr-only">
        Filter by level
      </label>
      <select
        id="discover-difficulty"
        value={value}
        onChange={(e) => onChange(e.target.value as Difficulty | "all")}
        className="min-h-9 appearance-none rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-base py-[var(--space-1)] pl-[var(--space-4)] pr-[var(--space-8)] font-body text-athlo-label font-semibold text-athlo-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-athlo-lime"
      >
        {DIFFICULTY_FILTERS.map((d) => (
          <option key={d.value} value={d.value} className="bg-athlo-bg-raised text-athlo-text-primary">
            {d.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        aria-hidden="true"
        className="pointer-events-none absolute right-[var(--space-3)] top-1/2 -translate-y-1/2 text-athlo-text-secondary"
      />
    </div>
  );
}

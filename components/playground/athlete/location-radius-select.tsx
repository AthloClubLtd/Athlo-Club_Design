"use client";

import { ChevronDown } from "lucide-react";
import { RADIUS_FILTERS } from "@/lib/playground/types";

export function LocationRadiusSelect({
  value,
  onChange,
}: {
  value: number | "any";
  onChange: (value: number | "any") => void;
}) {
  return (
    <div className="relative inline-flex">
      <label htmlFor="discover-radius" className="sr-only">
        Filter by distance
      </label>
      <select
        id="discover-radius"
        value={value}
        onChange={(e) => onChange(e.target.value === "any" ? "any" : Number(e.target.value))}
        className="min-h-9 appearance-none rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-base py-[var(--space-1)] pl-[var(--space-4)] pr-[var(--space-8)] font-body text-athlo-label font-semibold text-athlo-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-athlo-lime"
      >
        {RADIUS_FILTERS.map((r) => (
          <option key={r.value} value={r.value} className="bg-athlo-bg-raised text-athlo-text-primary">
            {r.label}
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

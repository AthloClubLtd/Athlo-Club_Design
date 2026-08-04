"use client";

import { SPORT_FILTERS, type Sport } from "@/lib/playground/types";

export function SportFilterChips({
  selected,
  onToggle,
  onSelectAll,
}: {
  selected: Set<Sport>;
  onToggle: (sport: Sport) => void;
  onSelectAll: () => void;
}) {
  const isAllActive = selected.size === 0;

  return (
    <div
      className="flex gap-[var(--space-2)] overflow-x-auto px-[var(--space-4)] pb-[var(--space-1)]"
      style={{ scrollbarWidth: "none" }}
    >
      <button
        type="button"
        aria-pressed={isAllActive}
        onClick={onSelectAll}
        className={`min-h-9 shrink-0 whitespace-nowrap rounded-athlo-pill px-[var(--space-4)] font-body text-athlo-label font-semibold transition-colors ${
          isAllActive ? "bg-athlo-lime text-athlo-text-on-lime" : "bg-athlo-bg-overlay text-athlo-text-secondary"
        }`}
      >
        All
      </button>
      {SPORT_FILTERS.map((sport) => {
        const active = selected.has(sport.value);
        return (
          <button
            key={sport.value}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(sport.value)}
            className={`min-h-9 shrink-0 whitespace-nowrap rounded-athlo-pill px-[var(--space-4)] font-body text-athlo-label font-semibold transition-colors ${
              active ? "bg-athlo-line-strong text-athlo-text-primary" : "bg-athlo-bg-overlay text-athlo-text-secondary"
            }`}
          >
            {sport.label}
          </button>
        );
      })}
    </div>
  );
}

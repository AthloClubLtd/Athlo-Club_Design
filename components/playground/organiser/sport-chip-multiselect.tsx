import { SPORT_FILTERS, type Sport } from "@/lib/playground/types";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";

/** Same chip visuals/data as Discover's SportFilterChips, but without an
 * "All" option — a filter's "show everything" doesn't apply to a form
 * input, which instead needs at least one sport genuinely selected. */
export function SportChipMultiselect({
  selected,
  onToggle,
}: {
  selected: Set<Sport>;
  onToggle: (sport: Sport) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-[var(--space-2)] overflow-x-auto pb-[var(--space-1)]">
      {SPORT_FILTERS.map((sport) => {
        const active = selected.has(sport.value);
        const Icon = SPORT_ICONS[sport.value];
        return (
          <button
            key={sport.value}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(sport.value)}
            className={`flex min-h-9 shrink-0 items-center gap-[var(--space-2)] whitespace-nowrap rounded-athlo-pill px-[var(--space-4)] font-body text-athlo-label font-semibold transition-colors ${
              active ? "bg-athlo-lime text-athlo-text-on-lime" : "bg-athlo-bg-overlay text-athlo-text-secondary"
            }`}
          >
            <span aria-hidden="true" className="shrink-0">
              <Icon size={14} />
            </span>
            {sport.label}
          </button>
        );
      })}
    </div>
  );
}

import { DIFFICULTY_FILTERS, SPORT_FILTERS, type MockEvent } from "@/lib/playground/types";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";

/** "Events from clubs you follow" carousel card — a date block (amber
 * month, white day) + title + club + sport/level chips, per the Clubs
 * screen reference. */
export function ClubEventCard({ event, onSelect }: { event: MockEvent; onSelect: (eventId: string) => void }) {
  const date = new Date(`${event.date}T00:00:00`);
  const month = date.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const day = date.getDate();
  const levelLabel = DIFFICULTY_FILTERS.find((d) => d.value === event.level)?.label ?? event.level;
  const primarySport = event.sports[0];
  const SportIcon = primarySport ? SPORT_ICONS[primarySport] : null;
  const sportLabel = primarySport ? SPORT_FILTERS.find((s) => s.value === primarySport)?.label : null;

  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className="w-44 shrink-0 rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-3)] text-left"
    >
      <div className="flex items-baseline gap-[var(--space-2)]">
        <span className="font-display text-athlo-label font-bold uppercase tracking-[var(--tracking-label)] text-athlo-warning">
          {month}
        </span>
        <span className="font-display text-athlo-h3 font-bold text-athlo-text-primary">{day}</span>
      </div>
      <p className="mt-[var(--space-2)] line-clamp-2 font-display text-athlo-body font-semibold text-athlo-text-primary">
        {event.title}
      </p>
      <p className="mt-[var(--space-1)] truncate font-body text-athlo-label text-athlo-text-secondary">{event.clubName}</p>
      <div className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-1)]">
        {SportIcon && sportLabel && (
          <span className="inline-flex items-center gap-[var(--space-1)] rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
            <SportIcon size={11} />
            {sportLabel}
          </span>
        )}
        <span className="rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
          {levelLabel}
        </span>
      </div>
    </button>
  );
}

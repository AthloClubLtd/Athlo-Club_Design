import { Clock, MapPin, Trophy, Wifi } from "lucide-react";
import type { MockEvent } from "@/lib/playground/types";
import { formatClosesIn, formatPrice } from "@/lib/playground/format";
import { AttendeeAvatars } from "@/components/playground/athlete/detail/attendee-avatars";
import { EventThumb } from "@/components/playground/athlete/event-thumb";

export function EventRow({ event, onSelect }: { event: MockEvent; onSelect: (eventId: string) => void }) {
  const isCompetition = event.type === "competition";

  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className="flex w-full gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-4)] text-left"
    >
      <div className="relative h-14 w-14 shrink-0">
        <EventThumb event={event} className="h-14 w-14 shrink-0 rounded-athlo-md" />
        {/* Icon-only, overlaid on the thumbnail's own fixed-size box rather
            than sharing a row with clubName: a labelled "Competition" chip
            here is wider (~134px) than the middle column ever has to give
            it (~94px is typical, once the thumbnail and the count/price
            column take their share), so it doesn't matter how much
            clubName truncates — the chip still doesn't fit and spills onto
            the count column next to it (confirmed: badge measured 36px
            into "N registered"'s space). The thumbnail box's size never
            depends on either text column, so a badge anchored to it can
            never contend with them. */}
        {isCompetition && (
          <span
            aria-label="Competition"
            className="absolute -left-[var(--space-1)] -top-[var(--space-1)] flex h-5 w-5 items-center justify-center rounded-athlo-pill border border-athlo-line-strong bg-athlo-bg-overlay text-athlo-text-primary"
          >
            <Trophy size={11} aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <span className="block truncate font-body text-athlo-label text-athlo-text-secondary">{event.clubName}</span>

        <p className="mt-[var(--space-1)] line-clamp-2 font-display text-athlo-body font-semibold text-athlo-text-primary">
          {event.title}
        </p>

        {/* Density-optimised row: no start time (moves to the event-detail
            screen) and no sport tag (the filters above already carry that
            context) — maximises events above the fold.

            Every line here is single-line-intended: each text run gets its
            own min-w-0 truncate span (icons stay shrink-0 outside it), so a
            long value ellipsizes on one line instead of wrapping — without
            this, e.g. "Staffordshire Arena · 3.4 mi" and "Open · Masters ·
            U23" measurably wrapped to 2 lines in their ~94px column. */}
        <div className="mt-[var(--space-2)] flex flex-col gap-[var(--space-1)]">
          <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label text-athlo-text-secondary">
            {event.location.isVirtual ? (
              <Wifi size={13} aria-hidden="true" className="shrink-0" />
            ) : (
              <MapPin size={13} aria-hidden="true" className="shrink-0" />
            )}
            <span className="min-w-0 truncate">
              {event.location.isVirtual ? "Virtual" : `${event.location.name} · ${event.location.distanceMiles} mi`}
            </span>
          </span>
          {isCompetition && event.categories && (
            <span className="block truncate font-body text-athlo-label text-athlo-text-secondary">
              {event.categories.join(" · ")}
            </span>
          )}
          {isCompetition && event.registrationClosesAt && (
            <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-warning">
              <Clock size={13} aria-hidden="true" className="shrink-0" />
              <span className="min-w-0 truncate">{formatClosesIn(event.registrationClosesAt)}</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between text-right">
        <div className="flex items-center gap-[var(--space-1)]">
          <AttendeeAvatars compact count={isCompetition ? (event.registeredCount ?? 0) : (event.goingCount ?? 0)} />
          <span className="font-body text-athlo-label text-athlo-text-secondary">
            {isCompetition ? `${event.registeredCount} registered` : `${event.goingCount} going`}
          </span>
        </div>
        <span className="mt-[var(--space-2)] font-display text-athlo-body font-semibold text-athlo-text-primary">
          {formatPrice(event.price)}
        </span>
      </div>
    </button>
  );
}

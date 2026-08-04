"use client";

import { Clock, MapPin, Trophy, Wifi } from "lucide-react";
import type { MockEvent } from "@/lib/playground/types";
import { useEventsStore } from "@/lib/playground/events-store";
import { formatClosesIn, formatPrice } from "@/lib/playground/format";

export function EventRow({ event }: { event: MockEvent }) {
  const { getClub } = useEventsStore();
  const club = getClub(event.clubId);
  const isCompetition = event.type === "competition";

  return (
    <div className="flex gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-4)]">
      {/* Club-logo placeholder — decorative, the club name text beside it
          already carries the information. */}
      <div aria-hidden="true" className="h-14 w-14 shrink-0 rounded-athlo-md bg-athlo-bg-overlay" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[var(--space-2)]">
          <span className="truncate font-body text-athlo-label text-athlo-text-secondary">{club?.name}</span>
          {isCompetition && (
            <span className="flex shrink-0 items-center gap-[var(--space-1)] rounded-athlo-sm bg-athlo-bg-overlay px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-secondary">
              <Trophy size={11} aria-hidden="true" />
              Competition
            </span>
          )}
        </div>

        <p className="mt-[var(--space-1)] font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
          {event.title}
        </p>

        <div className="mt-[var(--space-2)] flex flex-col gap-[var(--space-1)]">
          {event.time && (
            <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label text-athlo-text-secondary">
              <Clock size={13} aria-hidden="true" />
              {event.time}
            </span>
          )}
          <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label text-athlo-text-secondary">
            {event.location.isVirtual ? (
              <Wifi size={13} aria-hidden="true" />
            ) : (
              <MapPin size={13} aria-hidden="true" />
            )}
            {event.location.isVirtual ? "Virtual" : `${event.location.name} · ${event.location.distanceMiles} mi`}
          </span>
          {isCompetition && event.categories && (
            <span className="font-body text-athlo-label text-athlo-text-secondary">
              {event.categories.join(" · ")}
            </span>
          )}
          {isCompetition && event.registrationClosesAt && (
            <span className="flex items-center gap-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-amber">
              <Clock size={13} aria-hidden="true" />
              {formatClosesIn(event.registrationClosesAt)}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-between text-right">
        <span className="font-body text-athlo-label text-athlo-text-secondary">
          {isCompetition ? `${event.registeredCount} registered` : `${event.goingCount} going`}
        </span>
        <span className="mt-[var(--space-2)] font-display text-athlo-body font-semibold text-athlo-text-primary">
          {formatPrice(event.price)}
        </span>
      </div>
    </div>
  );
}

"use client";

import type { MockEvent } from "@/lib/playground/types";
import { useEventsStore } from "@/lib/playground/events-store";
import { formatPrice } from "@/lib/playground/format";

export function EventCardHorizontal({ event }: { event: MockEvent }) {
  const { getClub } = useEventsStore();
  const club = getClub(event.clubId);
  const weekday = new Date(`${event.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short" });

  return (
    <div className="w-36 shrink-0">
      <div aria-hidden="true" className="h-24 w-full rounded-athlo-md bg-athlo-bg-overlay" />
      <p className="mt-[var(--space-2)] truncate font-body text-athlo-label text-athlo-text-secondary">
        {club?.name}
      </p>
      <p className="mt-[var(--space-1)] line-clamp-2 font-display text-athlo-body font-semibold text-athlo-text-primary">
        {event.title}
      </p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
        {event.location.isVirtual ? "Virtual" : `${event.location.distanceMiles} mi`} · {weekday}
      </p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-text-primary">
        {formatPrice(event.price)}
      </p>
    </div>
  );
}

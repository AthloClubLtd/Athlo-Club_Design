import type { MockEvent } from "@/lib/playground/types";
import { formatPrice } from "@/lib/playground/format";

export function EventCardHorizontal({
  event,
  onSelect,
}: {
  event: MockEvent;
  onSelect: (eventId: string) => void;
}) {
  const weekday = new Date(`${event.date}T00:00:00`).toLocaleDateString("en-GB", { weekday: "short" });

  return (
    <button type="button" onClick={() => onSelect(event.id)} className="w-36 shrink-0 text-left">
      {event.imageUrl ? (
        <img src={event.imageUrl} alt="" className="h-24 w-full rounded-athlo-md object-cover" />
      ) : (
        // Same slight lime-tinted placeholder gradient as EventRow's
        // thumbnail — kept consistent across every event-image slot.
        <div
          aria-hidden="true"
          className="h-24 w-full rounded-athlo-md bg-gradient-to-br from-athlo-bg-overlay to-athlo-lime-tint"
        />
      )}
      <p className="mt-[var(--space-2)] truncate font-body text-athlo-label text-athlo-text-secondary">
        {event.clubName}
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
    </button>
  );
}

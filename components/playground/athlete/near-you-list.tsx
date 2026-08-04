import type { MockEvent } from "@/lib/playground/types";
import { formatDateGroupLabel } from "@/lib/playground/format";
import { DateGroupHeader } from "@/components/playground/athlete/date-group-header";
import { EventRow } from "@/components/playground/athlete/event-row";

function groupByDate(events: MockEvent[]): { label: string; items: MockEvent[] }[] {
  const sorted = [...events].sort(
    (a, b) => a.date.localeCompare(b.date) || a.location.distanceMiles - b.location.distanceMiles,
  );

  const groups: { label: string; items: MockEvent[] }[] = [];
  for (const event of sorted) {
    const label = formatDateGroupLabel(event.date);
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.label === label) {
      lastGroup.items.push(event);
    } else {
      groups.push({ label, items: [event] });
    }
  }
  return groups;
}

export function NearYouList({ events }: { events: MockEvent[] }) {
  const groups = groupByDate(events);

  return (
    <div>
      <div className="flex items-baseline justify-between px-[var(--space-4)]">
        <h2 className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">Near you</h2>
        <span className="font-body text-athlo-label text-athlo-text-secondary">Sorted by distance</span>
      </div>

      {groups.length === 0 ? (
        <p className="px-[var(--space-4)] py-[var(--space-6)] text-center font-body text-athlo-body text-athlo-text-secondary">
          No events match your filters yet.
        </p>
      ) : (
        groups.map((group) => (
          <div key={group.label}>
            <DateGroupHeader label={group.label} />
            <div className="divide-y divide-athlo-line-subtle">
              {group.items.map((event) => (
                <EventRow key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

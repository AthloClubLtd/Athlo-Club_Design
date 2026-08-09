"use client";

import { Plus } from "lucide-react";
import { EventRow } from "@/components/playground/athlete/event-row";
import type { MockEvent } from "@/lib/playground/types";

/** No detail screen for the organiser's own rows yet — EventRow's onSelect
 * is a required prop but intentionally a no-op here; only "Create event" is
 * a real action on this screen, keeping the one-primary-action rule intact. */
export function OrganiserEventsList({
  events,
  onCreate,
}: {
  events: MockEvent[];
  onCreate: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-[var(--space-4)] py-[var(--space-4)]">
        <h2 className="font-display text-athlo-h3 font-bold text-athlo-text-primary">Your events</h2>
        <span className="font-body text-athlo-label text-athlo-text-secondary">{events.length}</span>
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
        {events.length === 0 ? (
          <p className="px-[var(--space-4)] font-body text-athlo-body text-athlo-text-secondary">
            No events yet — create your first one to see it appear here and on Discover.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-athlo-line-subtle">
            {events.map((event) => (
              <EventRow key={event.id} event={event} onSelect={() => {}} />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-3)]">
        <button
          type="button"
          onClick={onCreate}
          className="flex min-h-[44px] w-full items-center justify-center gap-[var(--space-2)] rounded-athlo-md bg-athlo-lime px-[var(--space-5)] font-body font-semibold text-athlo-text-on-lime transition-all hover:-translate-y-px hover:shadow-athlo-lime"
        >
          <Plus size={18} aria-hidden="true" />
          Create event
        </button>
      </div>
    </div>
  );
}

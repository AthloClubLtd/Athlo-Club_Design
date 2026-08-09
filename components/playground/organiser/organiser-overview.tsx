import { ChevronRight, Settings, Users } from "lucide-react";
import type { Club, MockEvent } from "@/lib/playground/types";

const STATIC_ROWS = [
  { label: "Members", icon: Users },
  { label: "Settings", icon: Settings },
];

/** Members/Settings are static-only in this demo — real rows shown for
 * shape, but they don't navigate anywhere (aria-disabled). */
export function OrganiserOverview({ club, events }: { club: Club; events: MockEvent[] }) {
  const totalInterest = events.reduce(
    (sum, e) => sum + (e.type === "competition" ? (e.registeredCount ?? 0) : (e.goingCount ?? 0)),
    0,
  );

  return (
    <div className="no-scrollbar h-full overflow-y-auto px-[var(--space-4)] py-[var(--space-4)]">
      <p className="font-display text-athlo-h3 font-bold text-athlo-text-primary">{club.name}</p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{club.location}</p>

      <div className="mt-[var(--space-5)] grid grid-cols-2 gap-[var(--space-3)]">
        <div className="rounded-athlo-lg border border-athlo-line-strong bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-4)]">
          <p className="font-display text-athlo-h2 font-bold text-athlo-text-primary">{events.length}</p>
          <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">Upcoming events</p>
        </div>
        <div className="rounded-athlo-lg border border-athlo-line-strong bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-4)]">
          <p className="font-display text-athlo-h2 font-bold text-athlo-text-primary">{totalInterest}</p>
          <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">Athletes engaged</p>
        </div>
      </div>

      <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-2)]">
        {STATIC_ROWS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            aria-disabled="true"
            className="flex items-center justify-between rounded-athlo-md border border-athlo-line-subtle px-[var(--space-4)] py-[var(--space-3)] text-athlo-text-secondary"
          >
            <span className="flex items-center gap-[var(--space-3)] font-body font-semibold">
              <Icon size={16} aria-hidden="true" />
              {label}
            </span>
            <ChevronRight size={16} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

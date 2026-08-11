"use client";

import { useEventsStore } from "@/lib/playground/events-store";
import type { Club } from "@/lib/playground/types";
import { ClubAvatar } from "@/components/playground/athlete/club-avatar";

export function ClubCard({ club }: { club: Club }) {
  // Shared with the store (not local state) so following a club here and
  // from the event-detail Hosted By card always agree.
  const { followedClubIds, toggleFollow } = useEventsStore();
  const following = followedClubIds.has(club.id);

  return (
    <div className="flex w-36 shrink-0 flex-col items-center rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)] text-center">
      <ClubAvatar club={club} />
      <p className="mt-[var(--space-3)] font-display text-athlo-body font-semibold text-athlo-text-primary">
        {club.name}
      </p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{club.location}</p>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => toggleFollow(club.id)}
        className={`mt-[var(--space-3)] min-h-9 w-full rounded-athlo-md border px-[var(--space-3)] font-body text-athlo-label font-semibold transition-colors ${
          following
            ? "border-athlo-line-strong bg-athlo-bg-overlay text-athlo-text-primary"
            : "border-athlo-line-strong text-athlo-text-primary hover:border-athlo-text-secondary"
        }`}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

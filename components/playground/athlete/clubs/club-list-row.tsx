"use client";

import { ChevronRight } from "lucide-react";
import { useEventsStore } from "@/lib/playground/events-store";
import { SPORT_FILTERS, type Club } from "@/lib/playground/types";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";
import { ClubAvatar } from "@/components/playground/athlete/club-avatar";

/** One row shape, two trailing treatments: "follow" (the common case — All
 * Clubs groups, Clubs you follow) and "chevron" (Your Clubs — no follow
 * state to toggle on your own club, taps through instead). */
export function ClubListRow({
  club,
  variant,
  showSportChip = false,
  onSelect,
}: {
  club: Club;
  variant: "follow" | "chevron";
  showSportChip?: boolean;
  onSelect?: () => void;
}) {
  const { followedClubIds, toggleFollow } = useEventsStore();
  const following = followedClubIds.has(club.id);
  const primarySport = club.sports[0];
  const SportIcon = primarySport ? SPORT_ICONS[primarySport] : null;
  const sportLabel = primarySport ? SPORT_FILTERS.find((s) => s.value === primarySport)?.label : null;

  const info = (
    <div className="min-w-0 flex-1 text-left">
      <div className="flex flex-wrap items-center gap-[var(--space-2)]">
        <p className="truncate font-display text-athlo-body font-semibold text-athlo-text-primary">{club.name}</p>
        {club.unreadNotification && (
          <span className="shrink-0 rounded-athlo-pill bg-athlo-warning/15 px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-warning">
            {club.unreadNotification.label}
          </span>
        )}
      </div>
      <p className="mt-[var(--space-1)] truncate font-body text-athlo-label text-athlo-text-secondary">
        {club.location} · {club.memberCount.toLocaleString()} members
      </p>
      {showSportChip && SportIcon && sportLabel && (
        <span className="mt-[var(--space-2)] inline-flex items-center gap-[var(--space-1)] rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">
          <SportIcon size={12} />
          {sportLabel}
        </span>
      )}
    </div>
  );

  if (variant === "chevron") {
    return (
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)] text-left"
      >
        <ClubAvatar club={club} size="sm" />
        {info}
        <ChevronRight size={16} aria-hidden="true" className="shrink-0 text-athlo-text-secondary" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-3)]">
      <ClubAvatar club={club} size="sm" />
      {info}
      <button
        type="button"
        aria-pressed={following}
        aria-label={`${following ? "Unfollow" : "Follow"} ${club.name}`}
        onClick={() => toggleFollow(club.id)}
        className={`min-h-[44px] shrink-0 rounded-athlo-md border px-[var(--space-4)] font-body text-athlo-label font-semibold transition-colors ${
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

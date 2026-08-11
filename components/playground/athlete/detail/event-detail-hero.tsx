import { ChevronLeft, Share2, Trophy } from "lucide-react";
import { SPORT_FILTERS } from "@/lib/playground/types";
import { SPORT_ICONS } from "@/components/playground/athlete/sport-icons";
import { EventThumb } from "@/components/playground/athlete/event-thumb";
import type { MockEvent } from "@/lib/playground/types";

export function EventDetailHero({
  event,
  onBack,
  onShowLeaderboards,
  onShare,
}: {
  event: MockEvent;
  onBack: () => void;
  onShowLeaderboards?: () => void;
  onShare?: () => void;
}) {
  const isCompetition = event.type === "competition";
  const primarySport = event.sports[0];
  const SportIcon = primarySport ? SPORT_ICONS[primarySport] : null;
  const sportLabel = SPORT_FILTERS.find((s) => s.value === primarySport)?.label;

  return (
    <div className="relative">
      <EventThumb event={event} className="h-48 w-full" />

      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute left-[var(--space-4)] top-[var(--space-4)] flex h-11 w-11 items-center justify-center rounded-athlo-pill bg-athlo-bg-base/70 text-athlo-text-primary backdrop-blur-sm"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>

      {isCompetition && (
        <div className="absolute right-[var(--space-4)] top-[var(--space-4)] flex items-center gap-[var(--space-2)]">
          {onShowLeaderboards && (
            <button
              type="button"
              onClick={onShowLeaderboards}
              className="flex min-h-[44px] items-center gap-[var(--space-2)] rounded-athlo-pill bg-athlo-bg-base/70 px-[var(--space-3)] font-body text-athlo-label font-semibold text-athlo-text-primary backdrop-blur-sm"
            >
              <Trophy size={14} aria-hidden="true" />
              Leaderboards
            </button>
          )}
          {onShare && (
            <button
              type="button"
              onClick={onShare}
              aria-label="Share"
              className="flex h-11 w-11 items-center justify-center rounded-athlo-pill bg-athlo-bg-base/70 text-athlo-text-primary backdrop-blur-sm"
            >
              <Share2 size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <div className="absolute bottom-[var(--space-3)] left-[var(--space-4)]">
        {isCompetition ? (
          <span className="flex items-center gap-[var(--space-1)] rounded-athlo-sm bg-athlo-warning px-[var(--space-3)] py-[var(--space-1)] font-body text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-on-lime">
            <Trophy size={12} aria-hidden="true" />
            Competition
          </span>
        ) : (
          SportIcon &&
          sportLabel && (
            <span className="flex items-center gap-[var(--space-2)] rounded-athlo-sm bg-athlo-bg-base/70 px-[var(--space-3)] py-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-text-primary backdrop-blur-sm">
              <SportIcon size={14} />
              {sportLabel}
            </span>
          )
        )}
      </div>
    </div>
  );
}

"use client";

import { Calendar } from "lucide-react";
import { mockAthlete } from "@/lib/playground/events-store";
import { AthloClubWordmark } from "@/components/marketing/ui/athlo-club-wordmark";

/** `centerLabel` (e.g. "Clubs") switches to a 3-column grid with the label
 * centred between the wordmark and the icon pair — every other screen
 * omits it and keeps the original 2-column (wordmark left, icons right)
 * layout unchanged. */
export function TopBar({ centerLabel }: { centerLabel?: string }) {
  const icons = (
    <div className="flex items-center justify-self-end gap-[var(--space-2)]">
      {/* Calendar replaces the old Create/Notifications pair — matches
          the Figma reference's two-button header (calendar + avatar). */}
      <button
        type="button"
        aria-label="My schedule"
        className="flex h-10 w-10 items-center justify-center rounded-athlo-md border border-athlo-line-strong text-athlo-text-primary transition-colors hover:border-athlo-text-secondary"
      >
        <Calendar size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`${mockAthlete.name}'s profile`}
        className="flex h-10 w-10 items-center justify-center rounded-athlo-pill bg-athlo-bg-overlay font-display text-athlo-label font-semibold text-athlo-text-primary"
      >
        {mockAthlete.initials}
      </button>
    </div>
  );

  const wordmark = (
    // Wordmark kept as the full "Athlo Club" lockup (not bare "ATHLO") per
    // CLAUDE.md's non-negotiable naming rule, even though the Figma
    // reference shows a bare outline wordmark with no visible "Club".
    <AthloClubWordmark imgClassName="h-5 w-auto" textClassName="text-athlo-body" showClub={false} />
  );

  if (centerLabel) {
    return (
      <div className="grid grid-cols-3 items-center px-[var(--space-4)]">
        <div className="justify-self-start">{wordmark}</div>
        <h1 className="justify-self-center font-display text-athlo-body-lg font-bold text-athlo-text-primary">
          {centerLabel}
        </h1>
        {icons}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-[var(--space-4)] px-[var(--space-4)]">
      {wordmark}
      {icons}
    </div>
  );
}

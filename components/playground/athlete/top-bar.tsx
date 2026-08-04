"use client";

import { Bell, Plus } from "lucide-react";
import { mockAthlete } from "@/lib/playground/events-store";

export function TopBar() {
  return (
    <div className="flex items-center justify-between gap-[var(--space-3)] px-[var(--space-4)]">
      <span className="font-display text-athlo-body-lg font-bold tracking-[var(--tracking-heading)] text-athlo-lime">
        ATHLO
      </span>
      <div className="flex items-center gap-[var(--space-2)]">
        <button
          type="button"
          aria-label="Create"
          className="flex h-10 w-10 items-center justify-center rounded-athlo-md border border-athlo-line-strong text-athlo-text-primary transition-colors hover:border-athlo-text-secondary"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Notifications — unread"
          className="relative flex h-10 w-10 items-center justify-center rounded-athlo-md border border-athlo-line-strong text-athlo-text-primary transition-colors hover:border-athlo-text-secondary"
        >
          <Bell size={16} aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-athlo-pill bg-athlo-lime"
          />
        </button>
        <button
          type="button"
          aria-label={`${mockAthlete.name}'s profile`}
          className="flex h-10 w-10 items-center justify-center rounded-athlo-pill bg-athlo-bg-overlay font-display text-athlo-label font-semibold text-athlo-text-primary"
        >
          {mockAthlete.initials}
        </button>
      </div>
    </div>
  );
}

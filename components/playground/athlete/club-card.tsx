"use client";

import { useState } from "react";
import type { Club } from "@/lib/playground/types";

function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ClubCard({ club }: { club: Club }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex w-36 shrink-0 flex-col items-center rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)] text-center">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-athlo-md bg-athlo-bg-overlay font-display text-athlo-label font-semibold text-athlo-text-secondary"
      >
        {initialsOf(club.name)}
      </div>
      <p className="mt-[var(--space-3)] font-display text-athlo-body font-semibold text-athlo-text-primary">
        {club.name}
      </p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{club.location}</p>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((f) => !f)}
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

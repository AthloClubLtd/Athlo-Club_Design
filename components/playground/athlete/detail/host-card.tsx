"use client";

import { useEventsStore } from "@/lib/playground/events-store";
import type { EventHost } from "@/lib/playground/types";
import { InstagramIcon, XIcon } from "@/components/playground/athlete/detail/social-icons";
import { ClubAvatar } from "@/components/playground/athlete/club-avatar";

export function HostCard({ host, clubId }: { host: EventHost; clubId?: string }) {
  const { followedClubIds, toggleFollow } = useEventsStore();
  const following = clubId ? followedClubIds.has(clubId) : false;

  return (
    <div className="rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)]">
      <div className="flex items-start gap-[var(--space-3)]">
        <ClubAvatar club={host} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-[var(--space-2)]">
            <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">{host.name}</p>
            {host.roleTag && (
              <span className="rounded-athlo-sm bg-athlo-bg-overlay px-[var(--space-2)] py-[var(--space-1)] font-body text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-secondary">
                {host.roleTag}
              </span>
            )}
          </div>
          <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{host.blurb}</p>
        </div>
        <div className="flex shrink-0 items-center gap-[var(--space-2)]">
          {host.socials?.instagram && (
            <a
              href={`https://instagram.com/${host.socials.instagram}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`${host.name} on Instagram`}
              className="flex h-11 w-11 items-center justify-center rounded-athlo-pill border border-athlo-line-strong text-athlo-text-secondary transition-colors hover:text-athlo-text-primary"
            >
              <InstagramIcon size={14} />
            </a>
          )}
          {host.socials?.x && (
            <a
              href={`https://x.com/${host.socials.x}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`${host.name} on X`}
              className="flex h-11 w-11 items-center justify-center rounded-athlo-pill border border-athlo-line-strong text-athlo-text-secondary transition-colors hover:text-athlo-text-primary"
            >
              <XIcon size={14} />
            </a>
          )}
        </div>
      </div>
      {clubId && (
        <button
          type="button"
          aria-pressed={following}
          onClick={() => toggleFollow(clubId)}
          className={`mt-[var(--space-3)] min-h-[44px] w-full rounded-athlo-md border px-[var(--space-3)] font-body text-athlo-label font-semibold transition-colors ${
            following
              ? "border-athlo-line-strong bg-athlo-bg-overlay text-athlo-text-primary"
              : "border-athlo-line-strong text-athlo-text-primary hover:border-athlo-text-secondary"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}

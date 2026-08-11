"use client";

import { useMemo, useState } from "react";
import { useEventsStore } from "@/lib/playground/events-store";
import { SPORT_FILTERS } from "@/lib/playground/types";
import { SearchBar } from "@/components/playground/athlete/search-bar";
import { ClubListRow } from "@/components/playground/athlete/clubs/club-list-row";
import { CreateClubBanner } from "@/components/playground/athlete/clubs/create-club-banner";
import { ClubsEmptyState } from "@/components/playground/athlete/clubs/clubs-empty-state";

/** Clubs within this many miles count as "near you" — the app's other
 * radius filters (Discover) are mile-based too, so this stays consistent
 * with that rather than introducing a separate km unit. */
const NEARBY_RADIUS_MILES = 3;
/** A sport only earns its own section once enough clubs actually offer
 * it — otherwise every sport with a single club would produce a
 * one-row section, which reads as clutter rather than a real group. */
const MIN_CLUBS_PER_SPORT_GROUP = 2;

export function AllClubsTab({ onCreateClub }: { onCreateClub: () => void }) {
  const { clubs } = useEventsStore();
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const result: { title: string; clubs: typeof clubs }[] = [];

    const womensClubs = clubs.filter((c) => c.isWomensOnly);
    if (womensClubs.length > 0) result.push({ title: "The Sisterhood", clubs: womensClubs });

    for (const sport of SPORT_FILTERS) {
      const matches = clubs.filter((c) => c.sports.includes(sport.value));
      if (matches.length >= MIN_CLUBS_PER_SPORT_GROUP) {
        result.push({ title: `${sport.label} clubs`, clubs: matches });
      }
    }

    const nearbyClubs = clubs
      .filter((c) => c.distanceMiles <= NEARBY_RADIUS_MILES)
      .sort((a, b) => a.distanceMiles - b.distanceMiles);
    if (nearbyClubs.length > 0) result.push({ title: "Clubs near you", clubs: nearbyClubs });

    return result;
  }, [clubs]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return clubs.filter((c) => {
      const haystack = `${c.name} ${c.sports.map((s) => SPORT_FILTERS.find((f) => f.value === s)?.label ?? s).join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [clubs, query]);

  return (
    <div className="flex flex-col gap-[var(--space-6)] pb-[var(--space-8)]">
      <CreateClubBanner onCreate={onCreateClub} />

      <SearchBar
        id="clubs-search"
        label="Search a club by name or sport type"
        placeholder="Search a club by name or sport type"
        value={query}
        onChange={setQuery}
      />

      <div aria-live="polite" className="flex flex-col gap-[var(--space-6)]">
        {searchResults ? (
          <div>
            <h2 className="px-[var(--space-4)] font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
              Results
            </h2>
            {searchResults.length === 0 ? (
              <ClubsEmptyState title="No clubs match your search" body="Try a different name or sport." />
            ) : (
              <div className="mt-[var(--space-2)] flex flex-col divide-y divide-athlo-line-subtle">
                {searchResults.map((club) => (
                  <ClubListRow key={club.id} club={club} variant="follow" />
                ))}
              </div>
            )}
          </div>
        ) : (
          groups.map((group) => (
            <div key={group.title}>
              <h2 className="px-[var(--space-4)] font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
                {group.title}
              </h2>
              <div className="mt-[var(--space-2)] flex flex-col divide-y divide-athlo-line-subtle">
                {group.clubs.map((club) => (
                  <ClubListRow key={club.id} club={club} variant="follow" />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

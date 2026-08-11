import { useMemo } from "react";
import { useEventsStore } from "@/lib/playground/events-store";
import { SectionShelf } from "@/components/playground/athlete/section-shelf";
import { ClubEventCard } from "@/components/playground/athlete/clubs/club-event-card";
import { ClubListRow } from "@/components/playground/athlete/clubs/club-list-row";
import { CreateClubBanner } from "@/components/playground/athlete/clubs/create-club-banner";
import { ClubsEmptyState } from "@/components/playground/athlete/clubs/clubs-empty-state";

export function MyClubsTab({
  onCreateClub,
  onSelectEvent,
  onSelectClub,
}: {
  onCreateClub: () => void;
  onSelectEvent: (eventId: string) => void;
  onSelectClub: () => void;
}) {
  const { events, clubs, followedClubIds } = useEventsStore();

  const followedEvents = useMemo(
    () =>
      events
        .filter((e) => followedClubIds.has(e.clubId))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events, followedClubIds],
  );

  const yourClubs = useMemo(() => clubs.filter((c) => c.isCreatedByUser), [clubs]);
  const followedClubs = useMemo(() => clubs.filter((c) => followedClubIds.has(c.id)), [clubs, followedClubIds]);

  return (
    <div className="flex flex-col gap-[var(--space-6)] pb-[var(--space-8)]">
      <CreateClubBanner onCreate={onCreateClub} />

      <SectionShelf
        title="Events from clubs you follow"
        items={followedEvents}
        getKey={(e) => e.id}
        renderItem={(e) => <ClubEventCard event={e} onSelect={onSelectEvent} />}
      />
      {followedEvents.length === 0 && (
        <ClubsEmptyState
          title="No upcoming events yet"
          body="Follow a club below to see their events here."
        />
      )}

      <div>
        <h2 className="px-[var(--space-4)] font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
          Your Clubs
        </h2>
        {yourClubs.length === 0 ? (
          <ClubsEmptyState title="You haven't created a club yet" body="Create one to start hosting events." />
        ) : (
          <div className="mt-[var(--space-2)] flex flex-col divide-y divide-athlo-line-subtle">
            {yourClubs.map((club) => (
              <ClubListRow key={club.id} club={club} variant="chevron" onSelect={onSelectClub} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="px-[var(--space-4)] font-display text-athlo-body-lg font-semibold text-athlo-text-primary">
          Clubs you follow
        </h2>
        {followedClubs.length === 0 ? (
          <ClubsEmptyState title="You're not following any clubs yet" body="Explore All Clubs to find your people." />
        ) : (
          <div className="mt-[var(--space-2)] flex flex-col divide-y divide-athlo-line-subtle">
            {followedClubs.map((club) => (
              <ClubListRow key={club.id} club={club} variant="follow" showSportChip />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

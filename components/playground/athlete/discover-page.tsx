"use client";

import { useMemo, useState } from "react";
import { useEventsStore } from "@/lib/playground/events-store";
import { DIFFICULTY_FILTERS, RADIUS_FILTERS, type Difficulty, type Sport } from "@/lib/playground/types";
import { TopBar } from "@/components/playground/athlete/top-bar";
import { SearchBar } from "@/components/playground/athlete/search-bar";
import { DiscoverTabs, type DiscoverTabKey } from "@/components/playground/athlete/discover-tabs";
import { SportFilterChips } from "@/components/playground/athlete/sport-filter-chips";
import { FilterDropdown } from "@/components/playground/athlete/filter-dropdown";
import { NearYouList } from "@/components/playground/athlete/near-you-list";
import { SectionShelf } from "@/components/playground/athlete/section-shelf";
import { EventCardHorizontal } from "@/components/playground/athlete/event-card-horizontal";
import { ClubCard } from "@/components/playground/athlete/club-card";
import { VolunteeringEmptyState } from "@/components/playground/athlete/volunteering-empty-state";
import { BottomNav } from "@/components/playground/athlete/bottom-nav";

const THIS_WEEK_DAYS = 7;
const TRENDING_COUNT = 5;
const DEFAULT_RADIUS = 10;

export function DiscoverPage({ onSelectEvent }: { onSelectEvent: (eventId: string) => void }) {
  const { events, clubs } = useEventsStore();
  const [activeTab, setActiveTab] = useState<DiscoverTabKey>("events");
  const [selectedSports, setSelectedSports] = useState<Set<Sport>>(new Set());
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [radius, setRadius] = useState<number | "any">(DEFAULT_RADIUS);
  const [query, setQuery] = useState("");

  const toggleSport = (sport: Sport) => {
    setSelectedSports((prev) => {
      const next = new Set(prev);
      if (next.has(sport)) {
        next.delete(sport);
      } else {
        next.add(sport);
      }
      return next;
    });
  };
  const clearSports = () => setSelectedSports(new Set());

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((event) => {
      // Private clubs never surface in public Discover listings.
      if (event.isPrivateClub) return false;
      if (selectedSports.size > 0 && !event.sports.some((s) => selectedSports.has(s))) return false;
      if (difficulty !== "all" && event.level !== difficulty) return false;
      // "Within N mi" has no meaning for a virtual event, so it always
      // passes the radius filter rather than being wrongly excluded.
      if (radius !== "any" && !event.location.isVirtual && event.location.distanceMiles > radius) return false;
      if (q) {
        const haystack = `${event.title} ${event.clubName} ${event.sports.join(" ")} ${event.location.name}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, selectedSports, difficulty, radius, query]);

  const thisWeek = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() + THIS_WEEK_DAYS);
    return filteredEvents.filter((e) => new Date(`${e.date}T00:00:00`) <= cutoff);
  }, [filteredEvents]);

  const trending = useMemo(
    () =>
      [...filteredEvents]
        .sort((a, b) => (b.goingCount ?? b.registeredCount ?? 0) - (a.goingCount ?? a.registeredCount ?? 0))
        .slice(0, TRENDING_COUNT),
    [filteredEvents],
  );

  const followableClubs = useMemo(() => clubs.filter((c) => !c.isPrivateClub), [clubs]);

  return (
    <div className="flex h-full flex-col">
      {/* No pt- here — PhoneFrame's own screen wrapper already reserves
          the Dynamic Island safe-area clearance for every screen. */}
      <div className="flex flex-col gap-[var(--space-4)] pb-[var(--space-4)]">
        <TopBar />
        <SearchBar value={query} onChange={setQuery} />
        <DiscoverTabs active={activeTab} onChange={setActiveTab} />
        {activeTab === "events" && (
          <div className="flex flex-col gap-[var(--space-3)]">
            <SportFilterChips selected={selectedSports} onToggle={toggleSport} onSelectAll={clearSports} />
            <div className="flex flex-wrap gap-[var(--space-2)] px-[var(--space-4)]">
              <FilterDropdown
                id="discover-difficulty"
                label="Filter by level"
                options={DIFFICULTY_FILTERS}
                value={difficulty}
                onChange={setDifficulty}
              />
              <FilterDropdown
                id="discover-radius"
                label="Filter by distance"
                options={RADIUS_FILTERS}
                value={radius}
                onChange={setRadius}
              />
            </div>
          </div>
        )}
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        {activeTab === "volunteering" ? (
          <VolunteeringEmptyState />
        ) : (
          <div
            role="tabpanel"
            id="discover-panel-events"
            aria-labelledby="discover-tab-events"
            className="pt-[var(--space-5)] pb-[var(--space-8)]"
          >
            <NearYouList events={filteredEvents} onSelectEvent={onSelectEvent} />
            <SectionShelf
              title="This week"
              subtitle="Next 7 days"
              items={thisWeek}
              getKey={(e) => e.id}
              renderItem={(e) => <EventCardHorizontal event={e} onSelect={onSelectEvent} />}
            />
            <SectionShelf
              title="Clubs to follow"
              subtitle="Communities near you"
              items={followableClubs}
              getKey={(c) => c.id}
              renderItem={(c) => <ClubCard club={c} />}
            />
            <SectionShelf
              title="Trending"
              subtitle="Popular near you"
              items={trending}
              getKey={(e) => e.id}
              renderItem={(e) => <EventCardHorizontal event={e} onSelect={onSelectEvent} />}
            />
          </div>
        )}
      </div>

      <BottomNav active="discover" />
    </div>
  );
}

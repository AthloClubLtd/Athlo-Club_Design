"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Club, MockEvent } from "@/lib/playground/types";
import { mockClubs, seedEvents, SEEDED_FOLLOWED_CLUB_IDS } from "@/lib/playground/seed-data";

export type MockAthlete = {
  name: string;
  initials: string;
  homeLocation: string;
};

export const mockAthlete: MockAthlete = {
  name: "Swathi Pai",
  initials: "SP",
  homeLocation: "Stafford, UK",
};

type EventsContextValue = {
  events: MockEvent[];
  clubs: Club[];
  /** The organiser "create event" flow (later phase) writes here — the
   * same store Discover reads from, so a new event appears immediately. */
  addEvent: (event: MockEvent) => void;
  getClub: (clubId: string) => Club | undefined;
  getEvent: (eventId: string) => MockEvent | undefined;
  /** Clubs the mock athlete follows — shared so Discover's "Clubs to
   * follow" shelf and the detail screen's Hosted By card always agree. */
  followedClubIds: Set<string>;
  toggleFollow: (clubId: string) => void;
  /** Events the mock athlete has reserved a spot in / registered for.
   * One action for both — "Reserve" (event) and "Register" (competition)
   * are the same underlying state, just labelled differently. Tapping
   * again reverses it, adjusting goingCount/registeredCount to match. */
  reservedEventIds: Set<string>;
  toggleReservation: (eventId: string) => void;
};

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<MockEvent[]>(seedEvents);
  const [clubs] = useState<Club[]>(mockClubs);
  const [followedClubIds, setFollowedClubIds] = useState<Set<string>>(new Set(SEEDED_FOLLOWED_CLUB_IDS));
  const [reservedEventIds, setReservedEventIds] = useState<Set<string>>(new Set());

  const value = useMemo<EventsContextValue>(
    () => ({
      events,
      clubs,
      addEvent: (event) => setEvents((prev) => [...prev, event]),
      getClub: (clubId) => clubs.find((c) => c.id === clubId),
      getEvent: (eventId) => events.find((e) => e.id === eventId),
      followedClubIds,
      toggleFollow: (clubId) => {
        setFollowedClubIds((prev) => {
          const next = new Set(prev);
          if (next.has(clubId)) {
            next.delete(clubId);
          } else {
            next.add(clubId);
          }
          return next;
        });
      },
      reservedEventIds,
      toggleReservation: (eventId) => {
        const alreadyReserved = reservedEventIds.has(eventId);
        setReservedEventIds((prev) => {
          const next = new Set(prev);
          if (alreadyReserved) {
            next.delete(eventId);
          } else {
            next.add(eventId);
          }
          return next;
        });
        setEvents((prev) =>
          prev.map((e) => {
            if (e.id !== eventId) return e;
            const delta = alreadyReserved ? -1 : 1;
            return e.type === "competition"
              ? { ...e, registeredCount: (e.registeredCount ?? 0) + delta }
              : { ...e, goingCount: (e.goingCount ?? 0) + delta };
          }),
        );
      },
    }),
    [events, clubs, followedClubIds, reservedEventIds],
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEventsStore() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEventsStore must be used within an EventsProvider");
  return ctx;
}

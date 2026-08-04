"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Club, MockEvent } from "@/lib/playground/types";
import { mockClubs, seedEvents } from "@/lib/playground/seed-data";

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
};

const EventsContext = createContext<EventsContextValue | null>(null);

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<MockEvent[]>(seedEvents);
  const [clubs] = useState<Club[]>(mockClubs);

  const value = useMemo<EventsContextValue>(
    () => ({
      events,
      clubs,
      addEvent: (event) => setEvents((prev) => [...prev, event]),
      getClub: (clubId) => clubs.find((c) => c.id === clubId),
    }),
    [events, clubs],
  );

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>;
}

export function useEventsStore() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEventsStore must be used within an EventsProvider");
  return ctx;
}

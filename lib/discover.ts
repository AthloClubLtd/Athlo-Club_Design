import type { ClubDetail, ClubSummary, EventDetail, EventSummary } from "@/lib/types";
import { STUB_CLUBS, STUB_EVENTS } from "@/lib/data/stub-data";

/**
 * Discovery data access layer.
 *
 * Step 3: reads from the typed in-memory stub in `lib/data/stub-data.ts`.
 * Step 4: these function bodies are swapped to query Prisma (seeded via
 * `prisma/seed.ts`) instead — the signatures below are the stable contract
 * that `/discover` and its detail pages depend on, so nothing above this
 * file needs to change when the data source does.
 */

export const LEVELS = ["Beginner", "Novice", "Intermediate", "Elite", "Open"] as const;
export type Level = (typeof LEVELS)[number];

export type EventFilters = {
  sport?: string;
  location?: string;
  mode?: "virtual" | "in-person";
  level?: string;
};

function matchesLevel(event: EventSummary, level?: string): boolean {
  if (!level) return true;
  const haystack = `${event.title} ${event.description}`.toLowerCase();
  return haystack.includes(level.toLowerCase());
}

function matchesMode(event: EventSummary, mode?: string): boolean {
  if (!mode) return true;
  if (mode === "virtual") return event.format === "VIRTUAL" || event.format === "HYBRID";
  if (mode === "in-person") return event.format === "IN_PERSON" || event.format === "HYBRID";
  return true;
}

function matchesLocation(event: EventSummary, location?: string): boolean {
  if (!location) return true;
  const haystack = `${event.location ?? ""} ${event.venue ?? ""}`.toLowerCase();
  return haystack.includes(location.toLowerCase());
}

export async function getEvents(filters: EventFilters = {}): Promise<EventSummary[]> {
  return STUB_EVENTS.filter(
    (event) =>
      event.status === "PUBLISHED" &&
      (!filters.sport || event.sport === filters.sport) &&
      matchesMode(event, filters.mode) &&
      matchesLocation(event, filters.location) &&
      matchesLevel(event, filters.level),
  ).sort((a, b) => (a.startDate < b.startDate ? -1 : 1));
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  return STUB_EVENTS.find((event) => event.slug === slug) ?? null;
}

export async function getClubs(): Promise<ClubSummary[]> {
  return STUB_CLUBS;
}

export async function getClubBySlug(slug: string): Promise<ClubDetail | null> {
  const club = STUB_CLUBS.find((c) => c.slug === slug);
  if (!club) return null;
  const upcomingEvents = STUB_EVENTS.filter(
    (event) => event.clubSlug === slug && event.status === "PUBLISHED",
  );
  return { ...club, upcomingEvents };
}

export async function getAllEventSlugs(): Promise<string[]> {
  return STUB_EVENTS.map((e) => e.slug);
}

export async function getAllClubSlugs(): Promise<string[]> {
  return STUB_CLUBS.map((c) => c.slug);
}

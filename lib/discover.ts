import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  ClubDetail,
  ClubSummary,
  EventDetail,
  EventSummary,
  Sport,
  TicketType,
} from "@/lib/types";

/**
 * Discovery data access layer, backed by Prisma (seeded via
 * `prisma/seed.ts`). This replaced the Step 3 in-memory stub in
 * `lib/data/stub-data.ts` — that file has been removed so `/discover` and
 * its detail pages have exactly one data source.
 */

export const LEVELS = ["Beginner", "Novice", "Intermediate", "Elite", "Open"] as const;
export type Level = (typeof LEVELS)[number];

export type EventFilters = {
  sport?: string;
  location?: string;
  mode?: "virtual" | "in-person";
  level?: string;
};

type EventWithClub = Prisma.EventGetPayload<{
  include: { club: true; ticketTypes: true };
}>;

function toEventSummary(event: EventWithClub): EventSummary {
  return {
    slug: event.slug,
    title: event.title,
    sport: event.sport as Sport,
    format: event.format,
    venue: event.venue,
    location: event.format === "VIRTUAL" ? "Online" : event.club.location,
    startDate: event.startDate.toISOString(),
    endDate: event.endDate.toISOString(),
    status: event.status,
    clubSlug: event.club.slug,
    clubName: event.club.name,
    description: event.description ?? "",
  };
}

function toTicketType(tt: {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  capacity: number | null;
}): TicketType {
  return {
    id: tt.id,
    name: tt.name,
    priceCents: tt.priceCents,
    currency: tt.currency,
    capacity: tt.capacity,
  };
}

export async function getEvents(filters: EventFilters = {}): Promise<EventSummary[]> {
  const where: Prisma.EventWhereInput = {
    status: "PUBLISHED",
  };

  if (filters.sport) {
    where.sport = filters.sport as Sport;
  }

  if (filters.mode === "virtual") {
    where.format = { in: ["VIRTUAL", "HYBRID"] };
  } else if (filters.mode === "in-person") {
    where.format = { in: ["IN_PERSON", "HYBRID"] };
  }

  if (filters.location) {
    where.OR = [
      { venue: { contains: filters.location, mode: "insensitive" } },
      { club: { location: { contains: filters.location, mode: "insensitive" } } },
    ];
  }

  if (filters.level) {
    const level = filters.level;
    where.AND = [
      {
        OR: [
          { title: { contains: level, mode: "insensitive" } },
          { description: { contains: level, mode: "insensitive" } },
        ],
      },
    ];
  }

  const events = await prisma.event.findMany({
    where,
    include: { club: true, ticketTypes: true },
    orderBy: { startDate: "asc" },
  });

  return events.map(toEventSummary);
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: { club: true, ticketTypes: true },
  });
  if (!event) return null;

  return {
    ...toEventSummary(event),
    virtualUrl: event.virtualUrl,
    ticketTypes: event.ticketTypes.map(toTicketType),
  };
}

function toClubSummary(club: {
  slug: string;
  name: string;
  type: string;
  sports: string[];
  location: string | null;
  description: string | null;
  federationId: string | null;
  _count?: { members: number };
}): ClubSummary {
  return {
    slug: club.slug,
    name: club.name,
    type: club.type as ClubSummary["type"],
    sports: club.sports as Sport[],
    location: club.location,
    description: club.description ?? "",
    memberCount: club._count?.members ?? 0,
    federationSlug: null,
  };
}

export async function getClubs(): Promise<ClubSummary[]> {
  const clubs = await prisma.club.findMany({
    include: { _count: { select: { members: true } } },
    orderBy: { name: "asc" },
  });

  const federationById = new Map(clubs.map((c) => [c.id, c.slug]));

  return clubs.map((club) => ({
    ...toClubSummary(club),
    federationSlug: club.federationId ? (federationById.get(club.federationId) ?? null) : null,
  }));
}

export async function getClubBySlug(slug: string): Promise<ClubDetail | null> {
  const club = await prisma.club.findUnique({
    where: { slug },
    include: {
      _count: { select: { members: true } },
      federation: true,
      events: {
        where: { status: "PUBLISHED" },
        include: { club: true, ticketTypes: true },
        orderBy: { startDate: "asc" },
      },
    },
  });
  if (!club) return null;

  return {
    ...toClubSummary(club),
    federationSlug: club.federation?.slug ?? null,
    upcomingEvents: club.events.map(toEventSummary),
  };
}

export async function getAllEventSlugs(): Promise<string[]> {
  const events = await prisma.event.findMany({ select: { slug: true } });
  return events.map((e) => e.slug);
}

export async function getAllClubSlugs(): Promise<string[]> {
  const clubs = await prisma.club.findMany({ select: { slug: true } });
  return clubs.map((c) => c.slug);
}

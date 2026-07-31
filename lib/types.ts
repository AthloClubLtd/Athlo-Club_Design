// Shared domain types. These mirror the Prisma enums defined in
// `prisma/schema.prisma` (Step 4) so the same shapes can be used by the
// Step 3 in-memory stub data and, later, by real Prisma query results
// without changing any call sites in the discovery pages.

export type Sport =
  | "WEIGHTLIFTING"
  | "POWERLIFTING"
  | "CROSSFIT"
  | "FITNESS_RACING";

export type EventFormat = "VIRTUAL" | "IN_PERSON" | "HYBRID";

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

export type ClubType = "SOCIAL" | "BUSINESS" | "FEDERATION";

export type TicketType = {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  capacity: number | null;
};

export type EventSummary = {
  slug: string;
  title: string;
  sport: Sport;
  format: EventFormat;
  venue: string | null;
  location: string | null;
  startDate: string;
  endDate: string;
  status: EventStatus;
  clubSlug: string;
  clubName: string;
  description: string;
};

export type EventDetail = EventSummary & {
  virtualUrl: string | null;
  ticketTypes: TicketType[];
};

export type ClubSummary = {
  slug: string;
  name: string;
  type: ClubType;
  sports: Sport[];
  location: string | null;
  description: string;
  memberCount: number;
  federationSlug: string | null;
};

export type ClubDetail = ClubSummary & {
  upcomingEvents: EventSummary[];
};

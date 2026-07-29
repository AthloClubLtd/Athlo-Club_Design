import type { ClubSummary, EventDetail } from "@/lib/types";

/**
 * Step 3 stub data source.
 *
 * This is a single, typed in-memory dataset standing in for Prisma until
 * the schema and seed lands in Step 4. `lib/discover.ts` is the only file
 * that imports this module — once Prisma is wired up, that file's
 * implementations are swapped to query the database instead, and this
 * file (and its import) is removed so there is exactly one data source.
 */

export const STUB_CLUBS: ClubSummary[] = [
  {
    slug: "iron-city-weightlifting",
    name: "Iron City Weightlifting Club",
    type: "SOCIAL",
    sports: ["WEIGHTLIFTING"],
    location: "Manchester, UK",
    description:
      "A community weightlifting club training snatch and clean & jerk out of Manchester, running an open meet every autumn.",
    memberCount: 42,
    federationSlug: "national-strength-federation",
  },
  {
    slug: "vanguard-powerlifting",
    name: "Vanguard Powerlifting",
    type: "BUSINESS",
    sports: ["POWERLIFTING"],
    location: "London, UK",
    description:
      "A dedicated powerlifting gym and competition team running regular push-pull and full-power meets across London.",
    memberCount: 88,
    federationSlug: null,
  },
  {
    slug: "crossfit-riverside",
    name: "CrossFit Riverside",
    type: "BUSINESS",
    sports: ["CROSSFIT"],
    location: "Bristol, UK",
    description:
      "An affiliate CrossFit box on the Bristol harbourside, running an annual throwdown alongside an online qualifier.",
    memberCount: 120,
    federationSlug: null,
  },
  {
    slug: "pace-collective",
    name: "Pace Collective",
    type: "SOCIAL",
    sports: ["FITNESS_RACING"],
    location: "Online / UK-wide",
    description:
      "A fitness racing community running a virtual race series so athletes anywhere in the UK can compete head to head.",
    memberCount: 65,
    federationSlug: null,
  },
  {
    slug: "national-strength-federation",
    name: "National Strength Federation",
    type: "FEDERATION",
    sports: ["WEIGHTLIFTING", "POWERLIFTING"],
    location: "UK-wide",
    description:
      "The governing body sanctioning weightlifting and powerlifting competitions and affiliating clubs across the UK.",
    memberCount: 12,
    federationSlug: null,
  },
];

export const STUB_EVENTS: EventDetail[] = [
  {
    slug: "manchester-open-weightlifting-2026",
    title: "Manchester Open Weightlifting Championships",
    sport: "WEIGHTLIFTING",
    format: "IN_PERSON",
    venue: "Manchester Arena Sports Hall",
    location: "Manchester, UK",
    virtualUrl: null,
    startDate: "2026-09-12T09:00:00.000Z",
    endDate: "2026-09-12T18:00:00.000Z",
    status: "PUBLISHED",
    clubSlug: "iron-city-weightlifting",
    clubName: "Iron City Weightlifting Club",
    description:
      "An Open-level snatch and clean & jerk championship welcoming lifters of all weight classes, hosted on a single platform with live scoring.",
    ticketTypes: [
      { id: "t1", name: "Lifter Entry", priceCents: 3500, currency: "GBP", capacity: 60 },
      { id: "t2", name: "Spectator", priceCents: 500, currency: "GBP", capacity: 200 },
    ],
  },
  {
    slug: "vanguard-autumn-push-pull",
    title: "Vanguard Autumn Push-Pull Meet",
    sport: "POWERLIFTING",
    format: "IN_PERSON",
    venue: "Vanguard Strength Gym",
    location: "London, UK",
    virtualUrl: null,
    startDate: "2026-10-04T08:30:00.000Z",
    endDate: "2026-10-04T17:00:00.000Z",
    status: "PUBLISHED",
    clubSlug: "vanguard-powerlifting",
    clubName: "Vanguard Powerlifting",
    description:
      "A Novice-friendly bench press and deadlift meet, run single-platform with a qualified three-judge panel and live leaderboard.",
    ticketTypes: [
      { id: "t3", name: "Lifter Entry", priceCents: 4000, currency: "GBP", capacity: 40 },
    ],
  },
  {
    slug: "crossfit-riverside-throwdown",
    title: "Riverside Throwdown",
    sport: "CROSSFIT",
    format: "IN_PERSON",
    venue: "CrossFit Riverside",
    location: "Bristol, UK",
    virtualUrl: null,
    startDate: "2026-08-22T08:00:00.000Z",
    endDate: "2026-08-22T19:00:00.000Z",
    status: "PUBLISHED",
    clubSlug: "crossfit-riverside",
    clubName: "CrossFit Riverside",
    description:
      "An Intermediate/RX team throwdown across three workouts, scored live with points-based overall placement and a final tiebreak WOD.",
    ticketTypes: [
      { id: "t4", name: "Team Entry (2 athletes)", priceCents: 9000, currency: "GBP", capacity: 24 },
      { id: "t5", name: "Spectator", priceCents: 1000, currency: "GBP", capacity: 150 },
    ],
  },
  {
    slug: "virtual-fitness-race-series-1",
    title: "Virtual Fitness Race Series — Round 1",
    sport: "FITNESS_RACING",
    format: "VIRTUAL",
    venue: null,
    location: "Online",
    virtualUrl: "https://athloclub.com/live/virtual-fitness-race-series-1",
    startDate: "2026-09-05T18:00:00.000Z",
    endDate: "2026-09-05T20:00:00.000Z",
    status: "PUBLISHED",
    clubSlug: "pace-collective",
    clubName: "Pace Collective",
    description:
      "A Beginner-friendly virtual fitness race — run the course wherever you are and submit your time for a nationwide leaderboard.",
    ticketTypes: [
      { id: "t6", name: "Race Entry", priceCents: 1500, currency: "GBP", capacity: null },
    ],
  },
  {
    slug: "national-qualifier-weightlifting",
    title: "National Qualifier — Weightlifting",
    sport: "WEIGHTLIFTING",
    format: "IN_PERSON",
    venue: "Birmingham NEC",
    location: "Birmingham, UK",
    virtualUrl: null,
    startDate: "2026-11-14T09:00:00.000Z",
    endDate: "2026-11-15T18:00:00.000Z",
    status: "PUBLISHED",
    clubSlug: "national-strength-federation",
    clubName: "National Strength Federation",
    description:
      "The Elite qualifying event for next season's national championship, sanctioned and multi-platform across two days.",
    ticketTypes: [
      { id: "t7", name: "Lifter Entry", priceCents: 6000, currency: "GBP", capacity: 120 },
      { id: "t8", name: "Spectator (Day Pass)", priceCents: 1200, currency: "GBP", capacity: 500 },
    ],
  },
  {
    slug: "crossfit-riverside-online-open",
    title: "Riverside Online Open",
    sport: "CROSSFIT",
    format: "VIRTUAL",
    venue: null,
    location: "Online",
    virtualUrl: "https://athloclub.com/live/crossfit-riverside-online-open",
    startDate: "2026-08-01T00:00:00.000Z",
    endDate: "2026-08-08T23:59:00.000Z",
    status: "PUBLISHED",
    clubSlug: "crossfit-riverside",
    clubName: "CrossFit Riverside",
    description:
      "An Open-level online qualifier — submit video-verified scores across a week-long window ahead of the in-person Throwdown.",
    ticketTypes: [
      { id: "t9", name: "Entry", priceCents: 2000, currency: "GBP", capacity: null },
    ],
  },
];

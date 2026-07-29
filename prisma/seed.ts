import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // -------------------------------------------------------------------
  // Athletes
  // -------------------------------------------------------------------
  const admin = await prisma.athlete.upsert({
    where: { email: "admin@athloclub.com" },
    update: {},
    create: {
      email: "admin@athloclub.com",
      handle: "admin",
      name: "Alex Admin",
      role: "ADMIN",
      location: "London, UK",
      sports: ["WEIGHTLIFTING", "POWERLIFTING"],
      bio: "Athlo Club platform admin.",
    },
  });

  const sam = await prisma.athlete.upsert({
    where: { email: "sam@athloclub.com" },
    update: {},
    create: {
      email: "sam@athloclub.com",
      handle: "sam-lifts",
      name: "Sam Carter",
      location: "Manchester, UK",
      sports: ["WEIGHTLIFTING"],
      bio: "Weightlifting coach and meet director at Iron City.",
    },
  });

  const priya = await prisma.athlete.upsert({
    where: { email: "priya@athloclub.com" },
    update: {},
    create: {
      email: "priya@athloclub.com",
      handle: "priya-pulls",
      name: "Priya Shah",
      location: "London, UK",
      sports: ["POWERLIFTING"],
      bio: "Runs Vanguard Powerlifting out of London.",
    },
  });

  const jordan = await prisma.athlete.upsert({
    where: { email: "jordan@athloclub.com" },
    update: {},
    create: {
      email: "jordan@athloclub.com",
      handle: "jordan-wod",
      name: "Jordan Lee",
      location: "Bristol, UK",
      sports: ["CROSSFIT", "FITNESS_RACING"],
      bio: "Owns CrossFit Riverside and runs its comps.",
    },
  });

  // -------------------------------------------------------------------
  // Clubs
  // -------------------------------------------------------------------
  const federation = await prisma.club.upsert({
    where: { slug: "national-strength-federation" },
    update: {},
    create: {
      slug: "national-strength-federation",
      name: "National Strength Federation",
      type: "FEDERATION",
      description:
        "The governing body sanctioning weightlifting and powerlifting competitions and affiliating clubs across the UK.",
      location: "UK-wide",
      sports: ["WEIGHTLIFTING", "POWERLIFTING"],
      ownerId: admin.id,
      stripeOnboardingStatus: "COMPLETE",
      stripeAccountId: "acct_stub_federation",
    },
  });

  const ironCity = await prisma.club.upsert({
    where: { slug: "iron-city-weightlifting" },
    update: {},
    create: {
      slug: "iron-city-weightlifting",
      name: "Iron City Weightlifting Club",
      type: "SOCIAL",
      description:
        "A community weightlifting club training snatch and clean & jerk out of Manchester, running an open meet every autumn.",
      location: "Manchester, UK",
      sports: ["WEIGHTLIFTING"],
      ownerId: sam.id,
      federationId: federation.id,
      stripeOnboardingStatus: "COMPLETE",
      stripeAccountId: "acct_stub_iron_city",
    },
  });

  const vanguard = await prisma.club.upsert({
    where: { slug: "vanguard-powerlifting" },
    update: {},
    create: {
      slug: "vanguard-powerlifting",
      name: "Vanguard Powerlifting",
      type: "BUSINESS",
      description:
        "A dedicated powerlifting gym and competition team running regular push-pull and full-power meets across London.",
      location: "London, UK",
      sports: ["POWERLIFTING"],
      ownerId: priya.id,
      stripeOnboardingStatus: "PENDING",
    },
  });

  const riverside = await prisma.club.upsert({
    where: { slug: "crossfit-riverside" },
    update: {},
    create: {
      slug: "crossfit-riverside",
      name: "CrossFit Riverside",
      type: "BUSINESS",
      description:
        "An affiliate CrossFit box on the Bristol harbourside, running an annual throwdown, an online qualifier, and a virtual fitness race series.",
      location: "Bristol, UK",
      sports: ["CROSSFIT", "FITNESS_RACING"],
      ownerId: jordan.id,
      stripeOnboardingStatus: "NONE",
    },
  });

  // Owners are also OWNER-role members of their own club.
  for (const [club, athlete] of [
    [federation, admin],
    [ironCity, sam],
    [vanguard, priya],
    [riverside, jordan],
  ] as const) {
    await prisma.clubMembership.upsert({
      where: { clubId_athleteId: { clubId: club.id, athleteId: athlete.id } },
      update: {},
      create: { clubId: club.id, athleteId: athlete.id, role: "OWNER" },
    });
  }

  // -------------------------------------------------------------------
  // Affiliation: Iron City -> National Strength Federation (approved)
  // -------------------------------------------------------------------
  const existingAffiliation = await prisma.affiliationRequest.findFirst({
    where: { clubId: ironCity.id, federationId: federation.id },
  });
  if (!existingAffiliation) {
    await prisma.affiliationRequest.create({
      data: {
        clubId: ironCity.id,
        federationId: federation.id,
        status: "APPROVED",
        requestedAt: new Date("2026-02-01T09:00:00.000Z"),
        decidedAt: new Date("2026-02-04T12:00:00.000Z"),
        decidedById: admin.id,
      },
    });
  }

  // -------------------------------------------------------------------
  // Events (6, spread across all 4 sports and both formats)
  // -------------------------------------------------------------------
  const manchesterOpen = await prisma.event.upsert({
    where: { slug: "manchester-open-weightlifting-2026" },
    update: {},
    create: {
      slug: "manchester-open-weightlifting-2026",
      clubId: ironCity.id,
      title: "Manchester Open Weightlifting Championships",
      description:
        "An Open-level snatch and clean & jerk championship welcoming lifters of all weight classes, hosted on a single platform with live scoring.",
      sport: "WEIGHTLIFTING",
      format: "IN_PERSON",
      venue: "Manchester Arena Sports Hall",
      startDate: new Date("2026-09-12T09:00:00.000Z"),
      endDate: new Date("2026-09-12T18:00:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          { name: "Lifter Entry", priceCents: 3500, currency: "GBP", capacity: 60 },
          { name: "Spectator", priceCents: 500, currency: "GBP", capacity: 200 },
        ],
      },
    },
  });

  const nationalQualifier = await prisma.event.upsert({
    where: { slug: "national-qualifier-weightlifting" },
    update: {},
    create: {
      slug: "national-qualifier-weightlifting",
      clubId: federation.id,
      title: "National Qualifier — Weightlifting",
      description:
        "The Elite qualifying event for next season's national championship, sanctioned and multi-platform across two days.",
      sport: "WEIGHTLIFTING",
      format: "IN_PERSON",
      venue: "Birmingham NEC",
      startDate: new Date("2026-11-14T09:00:00.000Z"),
      endDate: new Date("2026-11-15T18:00:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          { name: "Lifter Entry", priceCents: 6000, currency: "GBP", capacity: 120 },
          { name: "Spectator (Day Pass)", priceCents: 1200, currency: "GBP", capacity: 500 },
        ],
      },
    },
  });

  const vanguardMeet = await prisma.event.upsert({
    where: { slug: "vanguard-autumn-push-pull" },
    update: {},
    create: {
      slug: "vanguard-autumn-push-pull",
      clubId: vanguard.id,
      title: "Vanguard Autumn Push-Pull Meet",
      description:
        "A Novice-friendly bench press and deadlift meet, run single-platform with a qualified three-judge panel and live leaderboard.",
      sport: "POWERLIFTING",
      format: "IN_PERSON",
      venue: "Vanguard Strength Gym",
      startDate: new Date("2026-10-04T08:30:00.000Z"),
      endDate: new Date("2026-10-04T17:00:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [{ name: "Lifter Entry", priceCents: 4000, currency: "GBP", capacity: 40 }],
      },
    },
  });

  const riversideThrowdown = await prisma.event.upsert({
    where: { slug: "crossfit-riverside-throwdown" },
    update: {},
    create: {
      slug: "crossfit-riverside-throwdown",
      clubId: riverside.id,
      title: "Riverside Throwdown",
      description:
        "An Intermediate/RX team throwdown across three workouts, scored live with points-based overall placement and a final tiebreak WOD.",
      sport: "CROSSFIT",
      format: "IN_PERSON",
      venue: "CrossFit Riverside",
      startDate: new Date("2026-08-22T08:00:00.000Z"),
      endDate: new Date("2026-08-22T19:00:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [
          { name: "Team Entry (2 athletes)", priceCents: 9000, currency: "GBP", capacity: 24 },
          { name: "Spectator", priceCents: 1000, currency: "GBP", capacity: 150 },
        ],
      },
    },
  });

  const riversideOnlineOpen = await prisma.event.upsert({
    where: { slug: "crossfit-riverside-online-open" },
    update: {},
    create: {
      slug: "crossfit-riverside-online-open",
      clubId: riverside.id,
      title: "Riverside Online Open",
      description:
        "An Open-level online qualifier — submit video-verified scores across a week-long window ahead of the in-person Throwdown.",
      sport: "CROSSFIT",
      format: "VIRTUAL",
      virtualUrl: "https://athloclub.com/live/crossfit-riverside-online-open",
      startDate: new Date("2026-08-01T00:00:00.000Z"),
      endDate: new Date("2026-08-08T23:59:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [{ name: "Entry", priceCents: 2000, currency: "GBP", capacity: null }],
      },
    },
  });

  const virtualRaceSeries = await prisma.event.upsert({
    where: { slug: "virtual-fitness-race-series-1" },
    update: {},
    create: {
      slug: "virtual-fitness-race-series-1",
      clubId: riverside.id,
      title: "Virtual Fitness Race Series — Round 1",
      description:
        "A Beginner-friendly virtual fitness race — run the course wherever you are and submit your time for a nationwide leaderboard.",
      sport: "FITNESS_RACING",
      format: "VIRTUAL",
      virtualUrl: "https://athloclub.com/live/virtual-fitness-race-series-1",
      startDate: new Date("2026-09-05T18:00:00.000Z"),
      endDate: new Date("2026-09-05T20:00:00.000Z"),
      status: "PUBLISHED",
      ticketTypes: {
        create: [{ name: "Race Entry", priceCents: 1500, currency: "GBP", capacity: null }],
      },
    },
  });

  // -------------------------------------------------------------------
  // Competitions + entries
  // -------------------------------------------------------------------
  let qualifierComp = await prisma.competition.findFirst({
    where: { eventId: nationalQualifier.id },
  });
  if (!qualifierComp) {
    qualifierComp = await prisma.competition.create({
      data: {
        eventId: nationalQualifier.id,
        name: "National Qualifier — 81kg/89kg",
        sport: "WEIGHTLIFTING",
        discipline: "Snatch & Clean and Jerk",
        isSanctioned: true,
        registrationOpensAt: new Date("2026-09-01T00:00:00.000Z"),
        registrationClosesAt: new Date("2026-11-01T23:59:00.000Z"),
        scoringConfig: {
          attemptsPerLift: 3,
          lifts: ["snatch", "clean_and_jerk"],
          tiebreaker: "bodyweight",
        },
      },
    });
  }

  let throwdownComp = await prisma.competition.findFirst({
    where: { eventId: riversideThrowdown.id },
  });
  if (!throwdownComp) {
    throwdownComp = await prisma.competition.create({
      data: {
        eventId: riversideThrowdown.id,
        name: "Riverside Throwdown — RX Division",
        sport: "CROSSFIT",
        discipline: "3-workout team throwdown",
        isSanctioned: false,
        registrationOpensAt: new Date("2026-06-01T00:00:00.000Z"),
        registrationClosesAt: new Date("2026-08-15T23:59:00.000Z"),
        scoringConfig: {
          workouts: 3,
          scoring: "points",
          tiebreaker: "final_workout_placement",
        },
      },
    });
  }

  const existingQualifierEntry = await prisma.competitionEntry.findFirst({
    where: { competitionId: qualifierComp.id, athleteId: sam.id },
  });
  if (!existingQualifierEntry) {
    await prisma.competitionEntry.create({
      data: {
        competitionId: qualifierComp.id,
        athleteId: sam.id,
        division: "81kg",
        placement: 2,
        resultsJson: { snatch: 85, cleanAndJerk: 110, total: 195 },
      },
    });
  }

  const existingThrowdownEntry = await prisma.competitionEntry.findFirst({
    where: { competitionId: throwdownComp.id, athleteId: jordan.id },
  });
  if (!existingThrowdownEntry) {
    await prisma.competitionEntry.create({
      data: {
        competitionId: throwdownComp.id,
        athleteId: jordan.id,
        division: "RX Men",
        placement: 1,
        resultsJson: { workout1: 142, workout2: "8:32", workout3: 210 },
      },
    });
  }

  // -------------------------------------------------------------------
  // Personal records
  // -------------------------------------------------------------------
  await prisma.personalRecord.createMany({
    data: [
      {
        athleteId: sam.id,
        sport: "WEIGHTLIFTING",
        discipline: "Snatch",
        value: 85,
        unit: "kg",
        achievedAt: new Date("2026-05-20T00:00:00.000Z"),
        verified: true,
      },
      {
        athleteId: priya.id,
        sport: "POWERLIFTING",
        discipline: "Deadlift",
        value: 180,
        unit: "kg",
        achievedAt: new Date("2026-04-10T00:00:00.000Z"),
        verified: true,
      },
      {
        athleteId: jordan.id,
        sport: "CROSSFIT",
        discipline: "Fran",
        value: 225,
        unit: "seconds",
        achievedAt: new Date("2026-03-02T00:00:00.000Z"),
        verified: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed complete:", {
    athletes: [admin.handle, sam.handle, priya.handle, jordan.handle],
    clubs: [federation.slug, ironCity.slug, vanguard.slug, riverside.slug],
    events: [
      manchesterOpen.slug,
      nationalQualifier.slug,
      vanguardMeet.slug,
      riversideThrowdown.slug,
      riversideOnlineOpen.slug,
      virtualRaceSeries.slug,
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

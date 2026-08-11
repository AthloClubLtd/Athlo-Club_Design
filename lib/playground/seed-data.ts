import type { Club, MockEvent } from "@/lib/playground/types";

/** All dates are relative to "now" so the demo's date grouping and
 * registration-deadline countdown are always correct, whenever it's run —
 * never a fixed calendar date that would go stale. */
function isoDateInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Sample clubs only — distinct from the real beta-club names used on the
 * Home page, so nothing here reads as a real stat.
 *
 * logoUrl only set where a real file exists in /public/clubs (see the
 * README there) — everything else falls back to ClubAvatar's initials
 * tile, same "real asset if present, tasteful fallback if not" pattern
 * used for event thumbnails. */
export const mockClubs: Club[] = [
  {
    id: "central-staffs-crossfit",
    name: "Central Staffs CrossFit",
    location: "Stafford, UK",
    distanceMiles: 1.2,
    isPrivateClub: false,
    logoUrl: "/clubs/central-staffs-crossfit.png",
    memberCount: 5412,
    sports: ["crossfit-affiliated", "strongman"],
    isWomensOnly: false,
    intensity: "high",
    type: "gym",
    isCreatedByUser: false,
    unreadNotification: { type: "event", label: "New event" },
  },
  {
    id: "crazy-strength",
    name: "Crazy Strength",
    location: "Wolverhampton, UK",
    distanceMiles: 14.5,
    isPrivateClub: false,
    logoUrl: "/clubs/crazy-strength.png",
    memberCount: 640,
    sports: ["hyrox", "fitness-racing"],
    isWomensOnly: false,
    intensity: "moderate",
    type: "club",
    isCreatedByUser: false,
    unreadNotification: null,
  },
  {
    id: "london-wl-club",
    name: "London WL Club",
    location: "London, UK",
    distanceMiles: 2.1,
    isPrivateClub: false,
    memberCount: 1204,
    sports: ["weightlifting"],
    isWomensOnly: false,
    intensity: "moderate",
    type: "club",
    isCreatedByUser: false,
    unreadNotification: null,
  },
  {
    id: "british-powerlifting",
    name: "British Powerlifting",
    location: "Staffordshire, UK",
    distanceMiles: 3.4,
    isPrivateClub: false,
    logoUrl: "/clubs/british-powerlifting.jpg",
    memberCount: 3150,
    sports: ["powerlifting"],
    isWomensOnly: false,
    intensity: "moderate",
    type: "federation",
    isCreatedByUser: false,
    unreadNotification: null,
  },
  {
    id: "strong-girls-hq",
    name: "Strong Girls HQ",
    location: "London, UK",
    distanceMiles: 0.8,
    isPrivateClub: false,
    memberCount: 860,
    sports: ["weightlifting"],
    isWomensOnly: true,
    intensity: "moderate",
    type: "club",
    isCreatedByUser: false,
    unreadNotification: { type: "post", label: "New post" },
  },
  {
    id: "hackney-women-lift",
    name: "Hackney Women Lift",
    location: "London, UK",
    distanceMiles: 3.5,
    isPrivateClub: false,
    memberCount: 318,
    sports: ["weightlifting"],
    isWomensOnly: true,
    intensity: "low",
    type: "club",
    isCreatedByUser: false,
    unreadNotification: null,
  },
  {
    id: "stafford-strongman",
    name: "Stafford Strongman",
    location: "Stafford, UK",
    distanceMiles: 2.0,
    isPrivateClub: false,
    memberCount: 210,
    sports: ["strongman"],
    isWomensOnly: false,
    intensity: "high",
    type: "club",
    isCreatedByUser: false,
    unreadNotification: null,
  },
  {
    id: "swathis-strength-collective",
    name: "Swathi's Strength Collective",
    location: "London, UK",
    distanceMiles: 1.5,
    isPrivateClub: false,
    memberCount: 42,
    sports: ["weightlifting", "powerlifting"],
    isWomensOnly: false,
    intensity: "moderate",
    type: "club",
    isCreatedByUser: true,
    unreadNotification: null,
  },
];

/** Clubs the mock athlete already follows on first load — matches the
 * Clubs-screen reference (Central Staffs CrossFit, London WL Club, Strong
 * Girls HQ all show "Following" there), and drives the "Events from clubs
 * you follow" carousel + "Clubs you follow" list having real content from
 * the start rather than an empty demo. */
export const SEEDED_FOLLOWED_CLUB_IDS = ["central-staffs-crossfit", "london-wl-club", "strong-girls-hq"];

function clubOf(clubId: string): Club {
  const club = mockClubs.find((c) => c.id === clubId);
  if (!club) throw new Error(`Unknown seed club: ${clubId}`);
  return club;
}

/** clubName/isPrivateClub are denormalized from the club record here, at
 * seed time, so they can never drift out of sync with mockClubs. */
function seedEvent(clubId: string, event: Omit<MockEvent, "clubId" | "clubName" | "isPrivateClub">): MockEvent {
  const club = clubOf(clubId);
  return { ...event, clubId, clubName: club.name, isPrivateClub: club.isPrivateClub };
}

export const seedEvents: MockEvent[] = [
  // Flagship event — full detail-screen data.
  seedEvent("central-staffs-crossfit", {
    id: "weekend-warrior-wod",
    title: "Weekend Warrior WOD",
    type: "event",
    sports: ["crossfit-affiliated"],
    level: "beginner",
    date: isoDateInDays(0),
    time: "9:00 AM",
    endTime: "11:00 AM",
    timezoneLabel: "BST",
    location: {
      name: "Central Staffs CrossFit",
      distanceMiles: 1.2,
      isVirtual: false,
      address: "12 Foregate St, Stafford ST16 2BE",
    },
    price: "free",
    goingCount: 38,
    goingFromFollowedCount: 4,
    weatherTempC: 16,
    weatherIcon: "cloud",
    aboutText:
      "A community WOD open to all levels — members and drop-ins welcome. Coaches scale every movement, so whether it's your first session or your fiftieth, you'll get a proper workout in. Stick around after for coffee and a chat.",
    organiser: {
      name: "Central Staffs CrossFit",
      blurb: "Stafford's home for functional fitness — daily classes, open gym, and a community that shows up.",
      email: "hello@centralstaffscrossfit.example",
      socials: { instagram: "centralstaffscrossfit" },
    },
    tickets: [
      { name: "Free spot", detail: "Members & drop-ins welcome", price: "free" },
      { name: "Coffee & social add-on", detail: "Optional · post-session brunch", price: 5 },
    ],
  }),
  seedEvent("london-wl-club", {
    id: "barbell-club-open-session",
    title: "Barbell Club Open Session",
    type: "event",
    sports: ["weightlifting"],
    level: "beginner",
    date: isoDateInDays(0),
    time: "6:00 PM",
    endTime: "8:00 PM",
    timezoneLabel: "BST",
    location: { name: "London WL Club", distanceMiles: 2.1, isVirtual: false, address: "44 Bermondsey St, London SE1 3UD" },
    price: 15,
    goingCount: 9,
    goingFromFollowedCount: 1,
    weatherTempC: 18,
    weatherIcon: "sun",
    aboutText: "Open platform time for snatch and clean & jerk technique work, coached. Bring your own kit or borrow ours.",
    organiser: {
      name: "London WL Club",
      blurb: "A weightlifting club for London lifters of every level.",
      email: "hello@londonwlclub.example",
      socials: { instagram: "londonwlclub" },
    },
    tickets: [{ name: "Open session", detail: "Platform time & coaching included", price: 15 }],
  }),
  seedEvent("crazy-strength", {
    id: "summer-hyrox-simulation",
    title: "Summer Hyrox Simulation",
    type: "event",
    sports: ["hyrox"],
    level: "intermediate",
    date: isoDateInDays(14),
    timezoneLabel: "BST",
    location: { name: "Virtual", distanceMiles: 0, isVirtual: true },
    price: 45,
    goingCount: 12,
    goingFromFollowedCount: 0,
    aboutText: "A full Hyrox-format simulation you can run wherever you train — stations, splits and a shared leaderboard.",
    organiser: {
      name: "Crazy Strength",
      blurb: "Wolverhampton strength & conditioning, built for Hyrox and functional racing.",
      email: "hello@crazystrength.example",
      socials: { instagram: "crazystrength" },
    },
    tickets: [{ name: "Entry", detail: "Full simulation + results tracking", price: 45 }],
  }),
  seedEvent("strong-girls-hq", {
    id: "womens-strength-circuit",
    title: "Women's Strength Circuit",
    type: "event",
    // "Women's only" is an eligibility trait, not a Sport (see types.ts) —
    // this stays discoverable under Weightlifting until a real eligibility
    // filter exists.
    sports: ["weightlifting"],
    level: "intermediate",
    date: isoDateInDays(3),
    time: "6:30 PM",
    endTime: "7:45 PM",
    timezoneLabel: "BST",
    location: { name: "Strong Girls HQ", distanceMiles: 0.8, isVirtual: false, address: "9 Shoreditch High St, London E1 6PJ" },
    price: "free",
    goingCount: 21,
    goingFromFollowedCount: 2,
    weatherTempC: 17,
    weatherIcon: "cloud",
    aboutText: "A women's strength circuit mixing barbell and bodyweight work — beginner-friendly, always coached.",
    organiser: {
      name: "Strong Girls HQ",
      blurb: "A women's strength community — every session coached, every athlete welcome.",
      email: "hello@stronggirlshq.example",
      socials: { instagram: "stronggirlshq" },
    },
    tickets: [{ name: "Free spot", detail: "Members & first-timers welcome", price: "free" }],
  }),
  seedEvent("crazy-strength", {
    id: "fitness-racing-trail-series",
    title: "Fitness Racing Trail Series",
    type: "event",
    sports: ["fitness-racing"],
    level: "open",
    date: isoDateInDays(5),
    time: "8:00 AM",
    endTime: "10:00 AM",
    timezoneLabel: "BST",
    location: { name: "West Park", distanceMiles: 3.0, isVirtual: false, address: "West Park, Wolverhampton WV1 4PR" },
    price: 20,
    goingCount: 15,
    goingFromFollowedCount: 1,
    weatherTempC: 15,
    weatherIcon: "cloud",
    aboutText: "A trail-format fitness race with obstacles and functional stations along the route. All paces welcome.",
    organiser: {
      name: "Crazy Strength",
      blurb: "Wolverhampton strength & conditioning, built for Hyrox and functional racing.",
      email: "hello@crazystrength.example",
      socials: { instagram: "crazystrength" },
    },
    tickets: [{ name: "Race entry", detail: "Timed run + finisher tracking", price: 20 }],
  }),
  // Flagship competition — full detail-screen data.
  seedEvent("british-powerlifting", {
    id: "summer-classic-powerlifting",
    title: "Summer Classic — Powerlifting",
    type: "competition",
    sports: ["powerlifting"],
    level: "open",
    date: isoDateInDays(7),
    time: "9:00 AM",
    endTime: "6:00 PM",
    timezoneLabel: "BST",
    location: {
      name: "Staffordshire Arena",
      distanceMiles: 3.4,
      isVirtual: false,
      address: "Staffordshire Arena, Uttoxeter Rd, Staffordshire ST18 0BX",
    },
    price: 120,
    registeredCount: 214,
    goingFromFollowedCount: 6,
    weatherTempC: 21,
    weatherIcon: "sun",
    aboutText:
      "British Powerlifting's flagship summer meet — full squat, bench and deadlift competition across four divisions, run to full IPF-style rules with certified referees. Spectators welcome all day, free of charge.",
    registrationClosesAt: isoDateInDays(5),
    categories: ["Open", "Masters", "U23"],
    capacity: 240,
    weighInTime: "7:00 AM",
    liftingFromTime: "9:00 AM",
    divisions: [
      {
        name: "Beginner",
        tag: "Open",
        description: "For athletes developing their powerlifting skills — no qualifying total required.",
        registeredCount: 62,
      },
      {
        name: "Intermediate",
        tag: "Open",
        description: "Qualifying total required · 180 kg total minimum.",
        registeredCount: 74,
      },
      {
        name: "Advanced",
        tag: "Qualified",
        description: "Qualifying total required · 320 kg total minimum.",
        registeredCount: 51,
      },
      {
        name: "Masters",
        tag: "35–44 yrs",
        description: "Open to lifters aged 35 and over on competition day.",
        registeredCount: 27,
      },
    ],
    leaderboard: {
      locked: true,
      unlocksLabel: "Unlocks on event day · real-time scoring",
      unlocksAt: isoDateInDays(7),
    },
    organiser: {
      name: "British Powerlifting",
      roleTag: "Federation",
      blurb: "The UK's home for tested and untested powerlifting competition, from local meets to internationals.",
      email: "events@britishpowerlifting.example",
      socials: { instagram: "britishpowerlifting", x: "britishpl" },
    },
    partners: [
      {
        name: "Staffordshire Arena",
        roleTag: "Venue partner",
        blurb: "A multi-purpose sports arena in the heart of Staffordshire, hosting competitions year-round.",
        email: "events@staffordshirearena.example",
        socials: { instagram: "staffordshirearena" },
      },
    ],
    tickets: [
      {
        name: "Athlete entry",
        detail: "Competition entry, warm-up access & results certificate",
        price: 120,
      },
      { name: "Spectator", detail: "Watch all day · under-16s free", price: "free" },
    ],
  }),
  seedEvent("central-staffs-crossfit", {
    id: "strongman-novice-throwdown",
    title: "Strongman Novice Throwdown",
    type: "competition",
    sports: ["strongman"],
    level: "beginner",
    date: isoDateInDays(10),
    time: "10:00 AM",
    endTime: "4:00 PM",
    timezoneLabel: "BST",
    location: { name: "Central Staffs CrossFit", distanceMiles: 1.2, isVirtual: false, address: "12 Foregate St, Stafford ST16 2BE" },
    price: 30,
    registeredCount: 24,
    goingFromFollowedCount: 2,
    weatherTempC: 14,
    weatherIcon: "cloud",
    aboutText: "An entry-level strongman competition — atlas stones, farmer's carry, log press and more. Coaching on hand for first-timers.",
    registrationClosesAt: isoDateInDays(2),
    categories: ["Novice"],
    capacity: 40,
    weighInTime: "9:00 AM",
    liftingFromTime: "10:00 AM",
    divisions: [
      {
        name: "Novice",
        tag: "Open",
        description: "First competition welcome — lighter implement weights throughout.",
        registeredCount: 24,
      },
    ],
    leaderboard: {
      locked: true,
      unlocksLabel: "Unlocks on event day · real-time scoring",
      unlocksAt: isoDateInDays(10),
    },
    organiser: {
      name: "Central Staffs CrossFit",
      blurb: "Stafford's home for functional fitness — daily classes, open gym, and a community that shows up.",
      email: "hello@centralstaffscrossfit.example",
      socials: { instagram: "centralstaffscrossfit" },
    },
    tickets: [{ name: "Athlete entry", detail: "Competition entry & results", price: 30 }],
  }),
  // Deliberately outside the default 10 mi radius, so the radius filter has
  // something real to demonstrate (falls out at 10 mi, back at 25 mi/Any).
  seedEvent("crazy-strength", {
    id: "autumn-hyrox-qualifier",
    title: "Autumn Hyrox Qualifier",
    type: "competition",
    sports: ["hyrox"],
    level: "advanced",
    date: isoDateInDays(21),
    time: "8:00 AM",
    endTime: "5:00 PM",
    timezoneLabel: "BST",
    location: { name: "Crazy Strength", distanceMiles: 14.5, isVirtual: false, address: "Wolverhampton Business Park, WV10 6TA" },
    price: 65,
    registeredCount: 87,
    goingFromFollowedCount: 3,
    weatherTempC: 13,
    weatherIcon: "cloud",
    aboutText: "A qualifying event for the regional Hyrox series — full 8-station format, official timing and results.",
    registrationClosesAt: isoDateInDays(10),
    categories: ["Open", "Elite"],
    capacity: 150,
    weighInTime: "7:00 AM",
    liftingFromTime: "8:00 AM",
    divisions: [
      { name: "Open", tag: "Open", description: "No qualifying result required.", registeredCount: 61 },
      { name: "Elite", tag: "Qualified", description: "Qualifying time required from a prior Hyrox event.", registeredCount: 26 },
    ],
    leaderboard: {
      locked: true,
      unlocksLabel: "Unlocks on event day · real-time scoring",
      unlocksAt: isoDateInDays(21),
    },
    organiser: {
      name: "Crazy Strength",
      blurb: "Wolverhampton strength & conditioning, built for Hyrox and functional racing.",
      email: "hello@crazystrength.example",
      socials: { instagram: "crazystrength" },
    },
    tickets: [{ name: "Athlete entry", detail: "Full qualifier entry & results", price: 65 }],
  }),
];

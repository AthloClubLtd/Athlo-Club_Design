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
 * Home page, so nothing here reads as a real stat. */
export const mockClubs: Club[] = [
  { id: "central-staffs-crossfit", name: "Central Staffs CrossFit", location: "Stafford, UK", isPrivateClub: false },
  { id: "crazy-strength", name: "Crazy Strength", location: "Wolverhampton, UK", isPrivateClub: false },
  { id: "london-wl-club", name: "London WL Club", location: "London, UK", isPrivateClub: false },
  { id: "british-powerlifting", name: "British Powerlifting", location: "Staffordshire, UK", isPrivateClub: false },
  { id: "strong-girls-hq", name: "Strong Girls HQ", location: "London, UK", isPrivateClub: false },
];

export const seedEvents: MockEvent[] = [
  {
    id: "weekend-warrior-wod",
    title: "Weekend Warrior WOD",
    clubId: "central-staffs-crossfit",
    type: "event",
    sports: ["crossfit-affiliated"],
    level: "beginner",
    date: isoDateInDays(0),
    time: "9:00 AM",
    location: { name: "Stafford", distanceMiles: 1.2, isVirtual: false },
    price: "free",
    goingCount: 38,
  },
  {
    id: "barbell-club-open-session",
    title: "Barbell Club Open Session",
    clubId: "london-wl-club",
    type: "event",
    sports: ["weightlifting"],
    level: "beginner",
    date: isoDateInDays(0),
    time: "6:00 PM",
    location: { name: "London", distanceMiles: 2.1, isVirtual: false },
    price: 15,
    goingCount: 9,
  },
  {
    id: "summer-hyrox-simulation",
    title: "Summer Hyrox Simulation",
    clubId: "crazy-strength",
    type: "event",
    sports: ["hyrox"],
    level: "intermediate",
    date: isoDateInDays(14),
    location: { name: "Virtual", distanceMiles: 0, isVirtual: true },
    price: 45,
    goingCount: 12,
  },
  {
    id: "womens-strength-circuit",
    title: "Women's Strength Circuit",
    clubId: "strong-girls-hq",
    type: "event",
    sports: ["weightlifting", "womens-only"],
    level: "intermediate",
    date: isoDateInDays(3),
    time: "6:30 PM",
    location: { name: "London", distanceMiles: 0.8, isVirtual: false },
    price: "free",
    goingCount: 21,
  },
  {
    id: "fitness-racing-trail-series",
    title: "Fitness Racing Trail Series",
    clubId: "crazy-strength",
    type: "event",
    sports: ["fitness-racing"],
    level: "open",
    date: isoDateInDays(5),
    time: "8:00 AM",
    location: { name: "Wolverhampton", distanceMiles: 3.0, isVirtual: false },
    price: 20,
    goingCount: 15,
  },
  {
    id: "summer-classic-powerlifting",
    title: "Summer Classic — Powerlifting",
    clubId: "british-powerlifting",
    type: "competition",
    sports: ["powerlifting"],
    level: "open",
    date: isoDateInDays(7),
    location: { name: "Staffordshire", distanceMiles: 3.4, isVirtual: false },
    price: 120,
    registeredCount: 214,
    registrationClosesAt: isoDateInDays(5),
    categories: ["Open", "Masters", "U23"],
  },
  {
    id: "strongman-novice-throwdown",
    title: "Strongman Novice Throwdown",
    clubId: "central-staffs-crossfit",
    type: "competition",
    sports: ["strongman"],
    level: "beginner",
    date: isoDateInDays(10),
    location: { name: "Stafford", distanceMiles: 1.2, isVirtual: false },
    price: 30,
    registeredCount: 24,
    registrationClosesAt: isoDateInDays(2),
    categories: ["Novice"],
  },
  {
    id: "autumn-hyrox-qualifier",
    title: "Autumn Hyrox Qualifier",
    clubId: "crazy-strength",
    type: "competition",
    sports: ["hyrox"],
    level: "advanced",
    date: isoDateInDays(21),
    location: { name: "Wolverhampton", distanceMiles: 4.5, isVirtual: false },
    price: 65,
    registeredCount: 87,
    registrationClosesAt: isoDateInDays(10),
    categories: ["Open", "Elite"],
  },
];

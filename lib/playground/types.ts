// Eligibility (women's/men's-only) is intentionally not a Sport — it'll be
// a separate eligibility filter later, not mixed into this list.
export type Sport =
  | "weightlifting"
  | "powerlifting"
  | "fitness-racing"
  | "hyrox"
  | "crossfit-affiliated"
  | "bodybuilding"
  | "strongman";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "open";

export const SPORT_FILTERS: { value: Sport; label: string }[] = [
  { value: "weightlifting", label: "Weightlifting" },
  { value: "powerlifting", label: "Powerlifting" },
  { value: "fitness-racing", label: "Fitness racing" },
  { value: "hyrox", label: "Hyrox" },
  { value: "crossfit-affiliated", label: "CrossFit affiliated" },
  { value: "bodybuilding", label: "Bodybuilding" },
  { value: "strongman", label: "Strongman" },
];

export const DIFFICULTY_FILTERS: { value: Difficulty | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "open", label: "Open" },
];

/** "any" = no distance ceiling — always passes, same as a virtual event. */
export const RADIUS_FILTERS: { value: number | "any"; label: string }[] = [
  { value: 5, label: "Within 5 mi" },
  { value: 10, label: "Within 10 mi" },
  { value: 25, label: "Within 25 mi" },
  { value: 50, label: "Within 50 mi" },
  { value: "any", label: "Any distance" },
];

export type Club = {
  id: string;
  name: string;
  location: string;
  /** Private clubs' events are excluded from public Discover listings. */
  isPrivateClub: boolean;
};

export type EventLocation = {
  name: string;
  distanceMiles: number;
  isVirtual: boolean;
};

export type MockEvent = {
  id: string;
  title: string;
  clubId: string;
  /** Denormalized from the owning club at seed time — clubId stays the
   * source of truth for lookups (e.g. isPrivateClub); this just avoids a
   * join on every row render. */
  clubName: string;
  isPrivateClub: boolean;
  type: "event" | "competition";
  /** Multi — an event can belong to more than one sport filter. */
  sports: Sport[];
  level: Difficulty;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO time — shown on the event detail screen (not built yet), never
   * on the density-optimised Discover row. */
  time?: string;
  location: EventLocation;
  price: number | "free";
  /** Placeholder-ok — no seed event sets this yet (no real images
   * supplied); rows fall back to a decorative placeholder without one. */
  imageUrl?: string;
  goingCount?: number;
  registeredCount?: number;
  /** Competitions only — ISO date the countdown is computed from. */
  registrationClosesAt?: string;
  /** Competitions only, e.g. ["Open", "Masters", "U23"]. */
  categories?: string[];
};

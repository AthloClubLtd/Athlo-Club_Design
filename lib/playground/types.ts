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
  /** Detail screen only — Discover rows only ever show name + distance. */
  address?: string;
};

export type SocialLinks = {
  instagram?: string;
  x?: string;
};

export type EventHost = {
  name: string;
  /** e.g. "Federation" / "Venue partner" — omitted for a plain event organiser. */
  roleTag?: string;
  blurb: string;
  logoUrl?: string;
  email: string;
  socials?: SocialLinks;
};

export type Ticket = {
  name: string;
  detail: string;
  price: number | "free" | null;
};

/** Competitions only. */
export type Division = {
  name: string;
  tag: string;
  description: string;
  registeredCount: number;
};

/** Competitions only. */
export type Leaderboard = {
  locked: boolean;
  unlocksLabel: string;
  unlocksAt: string;
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
  /** ISO time — shown on the event detail screen, never on the
   * density-optimised Discover row. */
  time?: string;
  /** Detail screen only. */
  endTime?: string;
  /** Detail screen only, e.g. "BST". */
  timezoneLabel?: string;
  location: EventLocation;
  price: number | "free";
  /** Placeholder-ok — no seed event sets this yet (no real images
   * supplied); rows fall back to a decorative placeholder without one. */
  imageUrl?: string;
  goingCount?: number;
  registeredCount?: number;
  /** Detail screen only — "N from clubs you follow" under the going count. */
  goingFromFollowedCount?: number;
  /** Detail screen only. */
  weatherTempC?: number;
  weatherIcon?: "sun" | "cloud";
  /** Detail screen only. */
  aboutText?: string;
  /** Detail screen only. */
  organiser?: EventHost;
  /** Detail screen only, competitions typically — additional hosts shown
   * alongside `organiser` in Hosted By. */
  partners?: EventHost[];
  /** Detail screen only — Tickets (event) / Entry Fees (competition), same
   * row shape either way. */
  tickets?: Ticket[];
  /** Competitions only — ISO date the countdown is computed from. */
  registrationClosesAt?: string;
  /** Competitions only, e.g. ["Open", "Masters", "U23"]. */
  categories?: string[];
  /** Competitions only, detail screen. */
  capacity?: number;
  /** Competitions only, detail screen. */
  weighInTime?: string;
  /** Competitions only, detail screen. */
  liftingFromTime?: string;
  /** Competitions only, detail screen. */
  divisions?: Division[];
  /** Competitions only, detail screen. */
  leaderboard?: Leaderboard;
};

export type Sport =
  | "weightlifting"
  | "powerlifting"
  | "fitness-racing"
  | "hyrox"
  | "crossfit-affiliated"
  | "womens-only"
  | "mens-only"
  | "bodybuilding"
  | "strongman";

export type Difficulty = "beginner" | "intermediate" | "advanced" | "open";

export const SPORT_FILTERS: { value: Sport; label: string }[] = [
  { value: "weightlifting", label: "Weightlifting" },
  { value: "powerlifting", label: "Powerlifting" },
  { value: "fitness-racing", label: "Fitness racing" },
  { value: "hyrox", label: "Hyrox" },
  { value: "crossfit-affiliated", label: "CrossFit affiliated" },
  { value: "womens-only", label: "Women's only" },
  { value: "mens-only", label: "Men's only" },
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
  type: "event" | "competition";
  /** Multi — an event can belong to more than one sport filter. */
  sports: Sport[];
  level: Difficulty;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Human-formatted start time, e.g. "9:00 AM" — omitted for some virtual/competition entries. */
  time?: string;
  location: EventLocation;
  price: number | "free";
  goingCount?: number;
  registeredCount?: number;
  /** Competitions only — ISO datetime the countdown is computed from. */
  registrationClosesAt?: string;
  /** Competitions only, e.g. ["Open", "Masters", "U23"]. */
  categories?: string[];
};

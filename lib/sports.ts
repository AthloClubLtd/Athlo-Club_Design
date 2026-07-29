export type SportSlug =
  | "WEIGHTLIFTING"
  | "POWERLIFTING"
  | "CROSSFIT"
  | "FITNESS_RACING";

export const SPORTS: {
  slug: SportSlug;
  label: string;
  description: string;
}[] = [
  {
    slug: "WEIGHTLIFTING",
    label: "Weightlifting",
    description: "Snatch and clean & jerk meets, from club nights to nationals.",
  },
  {
    slug: "POWERLIFTING",
    label: "Powerlifting",
    description: "Squat, bench and deadlift meets with full IPF-style scoring.",
  },
  {
    slug: "CROSSFIT",
    label: "CrossFit",
    description: "Timed and rep-scored WODs, leaderboards and time caps.",
  },
  {
    slug: "FITNESS_RACING",
    label: "Fitness Racing",
    description: "Hyrox-style and obstacle race formats with heats and waves.",
  },
];

export function sportLabel(slug: string): string {
  return SPORTS.find((s) => s.slug === slug)?.label ?? slug;
}

import { BadgeCheck, Dumbbell, Flame, Footprints, Mars, Venus } from "lucide-react";
import type { Sport } from "@/lib/playground/types";

type IconComponent = (props: { size?: number; className?: string }) => React.ReactNode;

// lucide-react has no lifting-specific icons — these three are custom,
// hand-drawn to match its stroke conventions (24x24 viewBox, round caps,
// 2px stroke) so they sit consistently beside the imported ones below.

const BarbellIcon: IconComponent = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <rect x="1.5" y="8" width="3" height="8" rx="1" />
    <rect x="19.5" y="8" width="3" height="8" rx="1" />
    <rect x="6" y="9.5" width="2" height="5" rx="0.5" />
    <rect x="16" y="9.5" width="2" height="5" rx="0.5" />
  </svg>
);

const BicepIcon: IconComponent = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19c1-2 1-4 0-6 1-2 3-2 4 0 1 2 3 2 4 0 1-2 3-2 4 0 1 2 1 4 0 6" />
  </svg>
);

const AtlasStoneIcon: IconComponent = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="10" r="6" />
    <line x1="5" y1="19" x2="19" y2="19" />
  </svg>
);

export const SPORT_ICONS: Record<Sport, IconComponent> = {
  weightlifting: Dumbbell,
  powerlifting: BarbellIcon,
  "fitness-racing": Footprints,
  hyrox: Flame,
  "crossfit-affiliated": BadgeCheck,
  "womens-only": Venus,
  "mens-only": Mars,
  bodybuilding: BicepIcon,
  strongman: AtlasStoneIcon,
};

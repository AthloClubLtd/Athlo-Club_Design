export function initialsOf(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const SIZE_CLASSES = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

/** Renders a real club logo when one exists (see /public/clubs), else an
 * initials tile — the one place this fallback lives, used everywhere a
 * club is shown (Discover rows/shelves, Clubs screen, Event Detail's
 * Hosted By) so a logo file dropped into /public/clubs appears app-wide
 * with zero further code changes. */
export function ClubAvatar({
  club,
  size = "md",
  className = "",
}: {
  club: { name: string; logoUrl?: string };
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
}) {
  const sizeClass = SIZE_CLASSES[size];

  if (club.logoUrl) {
    return (
      <img
        src={club.logoUrl}
        alt={club.name}
        className={`${sizeClass} shrink-0 rounded-athlo-md bg-athlo-bg-overlay object-contain p-1 ${className}`.trim()}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex ${sizeClass} shrink-0 items-center justify-center rounded-athlo-md bg-athlo-bg-overlay font-display text-athlo-label font-semibold text-athlo-text-secondary ${className}`.trim()}
    >
      {initialsOf(club.name)}
    </div>
  );
}

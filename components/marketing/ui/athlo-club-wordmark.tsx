import Link from "next/link";

/** The logo graphic only depicts "ATHLO" — no visible "Club" in the mark
 * itself — so this pairs it with a matching text label to form a visible
 * "Athlo Club" lockup everywhere the brand mark appears, per the naming
 * rule (never "Athlo" alone). The image is decorative (empty alt); the
 * whole lockup gets one accessible name via role="img"/aria-label so
 * screen readers hear "Athlo Club" once, not "Athlo Club Club".
 *
 * `showClub={false}` (currently only the Playground phone's TopBar) drops
 * the visible "Club" text to match a Figma reference showing the bare
 * mark — an explicit, requested exception to that naming rule for this one
 * spot, not a change to the rule itself. aria-label stays "Athlo Club"
 * regardless, so the accessible name never drops it even when the visible
 * text does. */
export function AthloClubWordmark({
  href,
  imgClassName = "h-6 w-auto",
  textClassName = "text-athlo-body-lg",
  className = "",
  showClub = true,
}: {
  /** Omit to render as a static, non-navigating mark — used inside the
   * Playground's simulated phone screen, where a real link would
   * navigate away from the demo. */
  href?: string;
  imgClassName?: string;
  textClassName?: string;
  className?: string;
  showClub?: boolean;
}) {
  const content = (
    <>
      <img src="/assets/athlo-club-logo.svg" alt="" aria-hidden="true" className={imgClassName} />
      {showClub && (
        <span
          className={`font-display font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary ${textClassName}`.trim()}
        >
          Club
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Athlo Club" className={`flex items-center gap-[var(--space-2)] ${className}`.trim()}>
        {content}
      </Link>
    );
  }

  return (
    <span role="img" aria-label="Athlo Club" className={`flex items-center gap-[var(--space-2)] ${className}`.trim()}>
      {content}
    </span>
  );
}

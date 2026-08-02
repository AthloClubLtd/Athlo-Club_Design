export function ProductScreenshotPlaceholder({
  label,
  alt,
  className = "",
}: {
  /** Short name of the screen this card represents, shown centered. */
  label: string;
  /** Describes what the real screenshot should show — the accessible name
   * for this placeholder (role="img") and the // TODO alt for later. */
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex aspect-[4/3] items-center justify-center rounded-athlo-xl border border-dashed border-athlo-line-subtle bg-athlo-bg-raised ${className}`.trim()}
    >
      {/* Purely visual kicker — the placeholder's aria-label above already
          carries the meaningful description, so this is redundant for AT. */}
      <span
        aria-hidden="true"
        className="absolute left-[var(--space-4)] top-[var(--space-4)] font-display text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-disabled"
      >
        Product screenshot
      </span>
      <span className="font-body text-athlo-label text-athlo-text-disabled">{label} — Image // TODO</span>
    </div>
  );
}

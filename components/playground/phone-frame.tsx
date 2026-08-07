export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    // Minimal — a thin outline framing the screen, not a detailed device
    // (no notch, no fake status bar, no thick bezel). The organiser laptop
    // frame (later phase) should match this same restrained treatment.
    <div
      className={`mx-auto w-full max-w-[360px] rounded-athlo-xl border border-athlo-line-strong p-[var(--space-1)] shadow-athlo-card ${className}`.trim()}
    >
      {/* Height caps at the smaller of a comfortable device height or 72%
          of the viewport, so the whole frame — including the bottom nav —
          reliably fits without the page needing a scroll just to reveal
          it, on typical laptop-height windows. A hard clip boundary, not
          itself scrolling: screen content (e.g. Discover) owns its own
          internal scroll region between a fixed header and fixed bottom
          nav, like a real app, instead of stretching the marketing page
          underneath it. */}
      <div className="h-[min(640px,72vh)] overflow-hidden rounded-athlo-lg bg-athlo-bg-inset">{children}</div>
    </div>
  );
}

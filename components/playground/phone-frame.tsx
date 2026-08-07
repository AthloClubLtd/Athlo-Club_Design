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
      {/* Fixed phone-sized viewport — a hard clip boundary, not itself
          scrolling. Screen content (e.g. Discover) owns its own internal
          scroll region between a fixed header and fixed bottom nav, like
          a real app, instead of stretching the marketing page underneath
          it. */}
      <div className="h-[700px] overflow-hidden rounded-athlo-lg bg-athlo-bg-inset">{children}</div>
    </div>
  );
}

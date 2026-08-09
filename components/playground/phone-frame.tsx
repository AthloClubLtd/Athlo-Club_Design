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
    //
    // Sized to the iPhone 15 Pro Max's logical viewport ratio (430x932pt,
    // 19.5:9 — not its @3x physical pixel resolution, which reduces to
    // the identical ratio). Height and width are BOTH explicit, driven by
    // the same clamp(floor, 72vh, cap) formula (0.4614 = 430/932) rather
    // than leaning on `aspect-ratio` + `width:auto` to derive one from the
    // other: that auto-resolution reliably worked in isolation but not
    // once nested this deep in the real component tree (confirmed by
    // direct measurement — a real, reproducible browser quirk in this
    // context, not a guess), so this sidesteps it rather than fighting it.
    //
    // The width floor (320px) is deliberate: a pure 72vh-driven width with
    // no floor shrank to as little as 189px on real mobile viewport
    // heights (iPhone SE-class down to ~568px tall) — nowhere near enough
    // room for the header/search/row content, causing exactly the text
    // overlap and truncation seen on real devices. 320px is the standard
    // "smallest supported mobile width" baseline; 694px is that width's
    // corresponding height via the same ratio (320/0.4614), so both
    // clamps agree with each other at the floor, not just independently.
    <div
      className={`mx-auto h-[clamp(694px,72vh,780px)] w-[clamp(320px,calc(72vh*0.4614),360px)] rounded-athlo-xl border border-athlo-line-strong p-[var(--space-1)] shadow-athlo-card ${className}`.trim()}
    >
      {/* Top padding approximates the Dynamic Island safe area
          (proportionally ~48px at this scale) so screen content never
          sits flush under where it would be — without drawing an actual
          notch/status bar graphic. A hard clip boundary, not itself
          scrolling: screen content (e.g. Discover) owns its own internal
          scroll region between a fixed header and fixed bottom nav, like
          a real app, instead of stretching the marketing page underneath
          it. */}
      <div className="h-full w-full overflow-hidden rounded-athlo-lg bg-athlo-bg-inset pt-[var(--space-7)]">
        {children}
      </div>
    </div>
  );
}

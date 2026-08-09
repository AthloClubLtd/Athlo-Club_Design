import { TractionStat } from "@/components/playground/traction-stat";

// Split into two rows of 3 rather than one row of 6 — CLAUDE.md's brand law 5
// caps traction numbers at three data points per section. Lime stays on a
// single standout stat (the lead number), not every numeral, per this
// feature's explicit "rare accent" instruction — a deliberate departure from
// the Home page's beta-clubs strip, where every number is lime.
export function TractionStrip() {
  return (
    <div className="mx-auto mt-[var(--space-8)] flex max-w-2xl flex-col gap-[var(--space-6)]">
      <div className="grid grid-cols-3 gap-[var(--space-4)]">
        <TractionStat value="700+" label="Registered athletes" lime />
        <TractionStat value="50+" label="Events hosted since Jul 2025" />
        <TractionStat value="30+" label="Paid ticketed events since Dec 2025" />
      </div>
      <div className="grid grid-cols-3 gap-[var(--space-4)]">
        <TractionStat value="6" label="Beta clubs (4 active)" />
        <TractionStat value="UK" label="Armed Forces contract signed" />
        <TractionStat value="£0" label="Marketing spend" />
      </div>
    </div>
  );
}

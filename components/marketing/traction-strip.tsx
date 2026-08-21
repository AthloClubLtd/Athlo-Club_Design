import { SectionLabel } from "@/components/marketing/ui/section-label";

// Numbers from CLAUDE.md §7 (§5 Beta clubs) — the site's one source of truth
// for real figures. Brand law 5: numbers do the talking, max three data
// points, big lime Space Grotesk numerals.
const STATS = [
  { value: "55+", label: "Events run in 8 months" },
  { value: "23", label: "Paid events" },
  { value: "£10k+", label: "Revenue, near-zero marketing spend" },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-athlo-numeral font-bold text-athlo-lime">{value}</p>
      <p className="mt-[var(--space-2)] font-body text-athlo-body text-athlo-text-secondary">{label}</p>
    </div>
  );
}

export function TractionStrip() {
  return (
    <div className="text-center">
      <SectionLabel tone="lime">Traction</SectionLabel>
      <h2 className="mt-[var(--space-3)] font-display text-athlo-h2 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
        The clubs building Athlo Club with us.
      </h2>
      <div className="mx-auto mt-[var(--space-8)] grid max-w-2xl grid-cols-1 gap-[var(--space-7)] sm:grid-cols-3">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}

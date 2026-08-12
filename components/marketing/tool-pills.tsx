// Copy says "5+ tools" — 6 named here, so the claim holds without inventing
// anything beyond what was given.
const REPLACED_TOOLS = ["Eventbrite", "Spreadsheets", "WhatsApp", "owlcms", "Mailchimp", "Instagram"];

export function ToolPills() {
  return (
    <ul
      aria-label="Tools Athlo Club replaces"
      className="flex flex-wrap items-center gap-[var(--space-3)]"
    >
      {REPLACED_TOOLS.map((tool) => (
        <li
          key={tool}
          className="rounded-athlo-pill border border-athlo-line-strong px-[var(--space-4)] py-[var(--space-2)] font-body text-athlo-body text-athlo-text-secondary line-through decoration-athlo-text-secondary"
        >
          {tool}
          {/* Strikethrough is a visual-only cue — screen readers don't
              announce it, so say "replaced" explicitly for non-sighted users. */}
          <span className="sr-only"> — replaced</span>
        </li>
      ))}
      <li aria-hidden="true" className="px-[var(--space-1)] font-body text-athlo-lime">
        →
      </li>
      <li className="rounded-athlo-pill bg-athlo-lime px-[var(--space-4)] py-[var(--space-2)] font-body font-semibold text-athlo-text-on-lime">
        Athlo Club
      </li>
    </ul>
  );
}

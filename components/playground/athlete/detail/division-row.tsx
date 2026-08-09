import type { Division } from "@/lib/playground/types";

export function DivisionRow({ division }: { division: Division }) {
  return (
    <div className="rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-4)]">
      <div className="flex items-center justify-between gap-[var(--space-3)]">
        <p className="min-w-0 flex-1 truncate font-display text-athlo-body font-semibold text-athlo-text-primary">
          {division.name}
        </p>
        <span className="shrink-0 rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-3)] py-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-text-secondary">
          {division.tag}
        </span>
      </div>
      <p className="mt-[var(--space-2)] font-body text-athlo-label text-athlo-text-secondary">{division.description}</p>
      <p className="mt-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-warning">
        {division.registeredCount} registered
      </p>
    </div>
  );
}

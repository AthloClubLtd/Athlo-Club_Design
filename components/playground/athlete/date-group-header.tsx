export function DateGroupHeader({ label }: { label: string }) {
  return (
    <p className="px-[var(--space-4)] pb-[var(--space-2)] pt-[var(--space-5)] font-body text-athlo-label font-semibold text-athlo-text-secondary first:pt-0">
      {label}
    </p>
  );
}

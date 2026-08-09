export function DetailSection({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-[var(--space-4)] ${className}`.trim()}>
      <p className="font-body text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-secondary">
        {label}
      </p>
      <div className="mt-[var(--space-3)]">{children}</div>
    </div>
  );
}

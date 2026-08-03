export function FramePlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex h-full min-h-[480px] flex-col items-center justify-center gap-[var(--space-2)] px-[var(--space-5)] text-center">
      <p className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">{title}</p>
      <p className="font-body text-athlo-body text-athlo-text-disabled">{note}</p>
    </div>
  );
}

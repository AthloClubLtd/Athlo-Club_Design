export function ClubsEmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="px-[var(--space-4)] py-[var(--space-6)] text-center">
      <p className="font-display text-athlo-body font-semibold text-athlo-text-primary">{title}</p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{body}</p>
    </div>
  );
}

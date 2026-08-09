export function DetailToast({ message }: { message: string | null }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute inset-x-0 bottom-[var(--space-4)] flex justify-center px-[var(--space-4)]"
    >
      {message && (
        <span className="rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-4)] py-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-text-primary shadow-athlo-pop">
          {message}
        </span>
      )}
    </div>
  );
}

export const inputClassName =
  "w-full min-h-[44px] rounded-athlo-md border border-athlo-line-strong bg-athlo-bg-base px-[var(--space-4)] py-[var(--space-2)] font-body text-athlo-body text-athlo-text-primary placeholder:text-athlo-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-athlo-lime";

export function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-body text-athlo-label font-semibold text-athlo-text-secondary">
        {label}
      </label>
      <div className="mt-[var(--space-2)]">{children}</div>
      {error && (
        <p className="mt-[var(--space-1)] font-body text-athlo-label font-semibold text-athlo-warning">{error}</p>
      )}
    </div>
  );
}

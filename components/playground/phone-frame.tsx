export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[360px] rounded-athlo-xl border border-athlo-line-strong bg-athlo-bg-raised p-[var(--space-3)] shadow-athlo-card ${className}`.trim()}
    >
      {/* Speaker notch — decorative device chrome, carries no information. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[var(--space-3)] h-1.5 w-16 -translate-x-1/2 rounded-athlo-pill bg-athlo-line-strong"
      />
      {/* Fixed phone-sized viewport — a hard clip boundary, not itself
          scrolling. Screen content (e.g. Discover) owns its own internal
          scroll region between a fixed header and fixed bottom nav, like
          a real app, instead of stretching the marketing page underneath
          it. */}
      <div className="h-[700px] overflow-hidden rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-inset pt-[var(--space-7)]">
        {children}
      </div>
    </div>
  );
}

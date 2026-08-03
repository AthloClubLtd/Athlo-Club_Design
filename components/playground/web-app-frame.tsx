const NAV_ITEMS = ["Overview", "Events", "Members", "Settings"];

export function WebAppFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-athlo-xl border border-athlo-line-strong bg-athlo-bg-raised shadow-athlo-card ${className}`.trim()}
    >
      {/* Browser-style chrome bar — decorative, carries no information. */}
      <div
        aria-hidden="true"
        className="flex items-center gap-[var(--space-4)] border-b border-athlo-line-subtle bg-athlo-bg-overlay px-[var(--space-4)] py-[var(--space-3)]"
      >
        <div className="flex shrink-0 gap-[var(--space-2)]">
          <span className="h-2.5 w-2.5 rounded-athlo-pill bg-athlo-line-strong" />
          <span className="h-2.5 w-2.5 rounded-athlo-pill bg-athlo-line-strong" />
          <span className="h-2.5 w-2.5 rounded-athlo-pill bg-athlo-line-strong" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-athlo-pill bg-athlo-bg-inset px-[var(--space-4)] py-[var(--space-1)] text-center font-body text-athlo-label text-athlo-text-disabled">
          app.athloclub.com
        </div>
      </div>

      <div className="flex min-h-[560px]">
        {/* Sidebar — icon rail below the `pg` breakpoint, full labelled nav
            at/above it. Decorative until the organiser screens are built. */}
        <div
          aria-hidden="true"
          className="flex w-14 shrink-0 flex-col gap-[var(--space-2)] border-r border-athlo-line-subtle bg-athlo-bg-overlay/40 p-[var(--space-3)] pg:w-[200px]"
        >
          {NAV_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-[var(--space-3)] rounded-athlo-sm px-[var(--space-2)] py-[var(--space-2)]">
              <span className="h-4 w-4 shrink-0 rounded-athlo-sm bg-athlo-line-strong" />
              <span className="hidden truncate font-body text-athlo-label text-athlo-text-secondary pg:inline">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

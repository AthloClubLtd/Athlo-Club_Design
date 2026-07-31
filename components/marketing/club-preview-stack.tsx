const CLUBS = [
  { name: "Strong Girls HQ", location: "London, UK", active: true },
  { name: "WLV Lifting Club", location: "Wolverhampton, UK", active: false },
  { name: "British Powerlifting Federation", location: "Remote", active: false },
];

export function ClubPreviewStack({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-[var(--space-2)] ${className}`.trim()}>
      {CLUBS.map((club) => (
        <div
          key={club.name}
          className={`flex items-center gap-[var(--space-3)] rounded-athlo-md border px-[var(--space-4)] py-[var(--space-3)] backdrop-blur-md ${
            club.active
              ? "border-athlo-lime/40 bg-athlo-lime/10"
              : "border-athlo-line-strong bg-athlo-bg-raised/80"
          }`}
        >
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              club.active ? "bg-athlo-lime" : "bg-athlo-text-disabled"
            }`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="truncate font-body text-athlo-body font-medium text-athlo-text-primary">
              {club.name}
            </p>
            <p className="truncate font-body text-athlo-label text-athlo-text-secondary">
              {club.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

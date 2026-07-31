import { SectionLabel } from "@/components/marketing/ui/section-label";

// TODO: replace with real partner logo image assets from user.
const PARTNERS = [
  "Crazy Strength",
  "Central Staffs CrossFit",
  "University of Wolverhampton",
  "Central Fund",
  "Royal Navy",
  "Army Sport",
  "British Powerlifting",
];

export function LogoWall({
  label = "Trusted by",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`.trim()}>
      <SectionLabel className="tracking-[var(--tracking-label)]">{label}</SectionLabel>
      <ul className="mx-auto mt-[var(--space-6)] flex max-w-[var(--container-wide)] flex-wrap items-center justify-center gap-[var(--space-4)]">
        {PARTNERS.map((name) => (
          <li
            key={name}
            className="flex h-14 min-w-[140px] items-center justify-center rounded-athlo-md border border-athlo-line-subtle px-[var(--space-5)] grayscale"
          >
            <span className="font-display text-athlo-h3 text-[15px] font-semibold text-athlo-text-secondary">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

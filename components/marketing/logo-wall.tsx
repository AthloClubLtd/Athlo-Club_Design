import { SectionLabel } from "@/components/marketing/ui/section-label";

type Partner = {
  name: string;
  src?: string;
};

const PARTNERS: Partner[] = [
  // TODO: opaque dark-navy background baked into the source file (not
  // transparent) — close in tone to --color-bg-raised but not an exact
  // match; ask for a transparent-background version.
  { name: "Crazy Strength", src: "/assets/logos/crazy-strength.png" },
  { name: "Central Staffs CrossFit", src: "/assets/logos/central-staffs-crossfit.png" },
  // TODO: opaque black background baked into the source file — ask for a
  // transparent-background version so the chip reads as one surface.
  { name: "University of Wolverhampton", src: "/assets/logos/university-of-wolverhampton.png" },
  // TODO: no logo file supplied yet.
  { name: "Central Fund" },
  // TODO: no logo file supplied yet.
  { name: "Royal Navy" },
  // TODO: source file is a full-colour opaque tile (Union Jack + red band),
  // not a logo on transparent ground — ask for a transparent-background
  // version so it doesn't sit as a mismatched coloured box in the row.
  { name: "Army Sport", src: "/assets/logos/army-sport.png" },
  // TODO: source file is a JPG with an opaque white background — ask for a
  // transparent-background version; a white box will otherwise stand out
  // against every other dark chip.
  { name: "British Powerlifting", src: "/assets/logos/british-powerlifting.jpg" },
];

function LogoChip({ name, src }: Partner) {
  return (
    <li
      className="flex aspect-[15/8] w-[135px] items-center justify-center rounded-athlo-lg border border-athlo-line-subtle bg-athlo-bg-raised p-[var(--space-5)] sm:w-[180px]"
      title={name}
    >
      {src ? (
        // Plain <img>, not next/image — these are small static logo marks
        // with no responsive-optimization payoff, same reasoning as the
        // HeroFlipbook frames.
        <img src={src} alt={name} className="max-h-12 max-w-full object-contain" />
      ) : (
        <span className="text-center font-display text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-disabled">
          {name}
        </span>
      )}
    </li>
  );
}

export function LogoWall({
  label = "Trusted by",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`border-y border-athlo-line-subtle py-[var(--space-8)] text-center ${className}`.trim()}
    >
      <SectionLabel className="tracking-[var(--tracking-label)]">{label}</SectionLabel>
      <ul className="mx-auto mt-[var(--space-6)] flex max-w-[var(--container-wide)] flex-wrap justify-center gap-[var(--space-4)]">
        {PARTNERS.map((partner) => (
          <LogoChip key={partner.name} {...partner} />
        ))}
      </ul>
    </div>
  );
}

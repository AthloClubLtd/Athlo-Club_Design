// TODO: replace each entry with the real partner logo asset
const PARTNERS = [
  "Crazy Strength",
  "Central Staffs CrossFit",
  "University of Wolverhampton",
  "Central Fund",
  "Royal Navy",
  "Army Sport",
  "British Powerlifting",
];

export function LogoWall() {
  return (
    <section className="border-y border-line-subtle">
      <div className="mx-auto max-w-container-wide px-gutter py-16">
        <p className="text-center font-display text-label font-semibold uppercase tracking-label text-ink-secondary">
          Trusted by
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {PARTNERS.map((name) => (
            <li
              key={name}
              className="flex h-10 items-center justify-center rounded-md border border-line-subtle px-4"
            >
              <span className="whitespace-nowrap font-text text-sm text-ink-disabled">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

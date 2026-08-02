import { SectionLabel } from "@/components/marketing/ui/section-label";

export function AboutBlock({
  caption,
  title,
  subtitle,
  image,
  imageSide,
  extra,
}: {
  caption: string;
  title: React.ReactNode;
  subtitle: string;
  image: React.ReactNode;
  /** Desktop only — mobile always stacks text above image regardless. */
  imageSide: "left" | "right";
  extra?: React.ReactNode;
}) {
  return (
    <section className="grid items-center gap-[var(--space-7)] md:grid-cols-2 md:gap-[var(--space-8)]">
      <div className={imageSide === "left" ? "md:order-2" : ""}>
        <SectionLabel tone="lime">{caption}</SectionLabel>
        <h2 className="mt-[var(--space-3)] font-display text-athlo-h2 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
          {title}
        </h2>
        <p className="mt-[var(--space-4)] font-body text-athlo-body-lg text-athlo-text-body">
          {subtitle}
        </p>
        {extra ? <div className="mt-[var(--space-5)]">{extra}</div> : null}
      </div>
      <div className={imageSide === "left" ? "md:order-1" : ""}>{image}</div>
    </section>
  );
}

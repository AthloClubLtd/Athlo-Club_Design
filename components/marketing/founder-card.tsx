import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { HeadshotPlaceholder } from "@/components/marketing/headshot-placeholder";

export function FounderCard({
  name,
  role,
  paragraph,
  headshotAlt,
  imageAlt,
}: {
  name: string;
  role: string;
  paragraph: string;
  headshotAlt: string;
  imageAlt: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-[var(--space-4)]">
        <HeadshotPlaceholder alt={headshotAlt} />
        <div>
          <h3 className="font-display text-athlo-h3 font-semibold text-athlo-text-primary">{name}</h3>
          {/* Role text uses --color-text-secondary, not lime — lime numerically
              clears AA here too (~16:1), but per the brand's "lime is a signal,
              not a colour" law it's reserved for CTAs/live states/large
              display type, not small metadata labels like a job title. */}
          <p className="font-body text-athlo-body text-athlo-text-secondary">{role}</p>
        </div>
      </div>
      <ImagePlaceholder alt={imageAlt} className="mt-[var(--space-5)]" />
      <p className="mt-[var(--space-4)] font-body text-athlo-body text-athlo-text-body">{paragraph}</p>
    </div>
  );
}

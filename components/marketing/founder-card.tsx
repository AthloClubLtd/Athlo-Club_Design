import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { HeadshotPlaceholder } from "@/components/marketing/headshot-placeholder";

export function FounderCard({
  name,
  role,
  paragraph,
  headshotAlt,
  imageAlt,
  headshotSrc,
  imageSrc,
}: {
  name: string;
  role: string;
  paragraph: string;
  headshotAlt: string;
  imageAlt: string;
  /** Real photo, once supplied — falls back to HeadshotPlaceholder without one. */
  headshotSrc?: string;
  /** Real photo, once supplied — falls back to ImagePlaceholder without one. */
  imageSrc?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-[var(--space-4)]">
        {headshotSrc ? (
          <img
            src={headshotSrc}
            alt={headshotAlt}
            className="h-14 w-14 shrink-0 rounded-athlo-md border border-athlo-line-subtle object-cover sm:h-16 sm:w-16"
            style={{ filter: "grayscale(1) contrast(1.08)" }}
          />
        ) : (
          <HeadshotPlaceholder alt={headshotAlt} />
        )}
        <div>
          <h3 className="font-display text-athlo-h3 font-semibold text-athlo-text-primary">{name}</h3>
          {/* Role text uses --color-text-secondary, not lime — lime numerically
              clears AA here too (~16:1), but per the brand's "lime is a signal,
              not a colour" law it's reserved for CTAs/live states/large
              display type, not small metadata labels like a job title. */}
          <p className="font-body text-athlo-body text-athlo-text-secondary">{role}</p>
        </div>
      </div>
      {imageSrc ? (
        // Real photo — wider than the 4:3 placeholder (these are 2-panel
        // collages, ~3.13:1), so it gets its own container rather than
        // reusing ImagePlaceholder's aspect ratio.
        <img
          src={imageSrc}
          alt={imageAlt}
          className="mt-[var(--space-5)] w-full rounded-athlo-xl border border-athlo-line-subtle object-cover"
          style={{ filter: "grayscale(1) contrast(1.08)" }}
        />
      ) : (
        <ImagePlaceholder alt={imageAlt} className="mt-[var(--space-5)]" />
      )}
      <p className="mt-[var(--space-4)] font-body text-athlo-body text-athlo-text-body">{paragraph}</p>
    </div>
  );
}

"use client";

import { usePhotoReveal } from "@/components/marketing/use-photo-reveal";

export function ImagePlaceholder({
  alt,
  label = "Image // TODO",
  className = "",
  src,
}: {
  /** Describes what the real image should show once supplied — doubles as
   * the accessible name for this placeholder (role="img") and as the
   * // TODO alt text to carry over onto the real <img> later. */
  alt: string;
  /** Visible label inside the box. Defaults to a generic marker; pass a
   * topic-specific one (e.g. "Discovery — Image // TODO") where useful. */
  label?: string;
  className?: string;
  /** Real photo, once supplied — renders it (with the shared B&W→colour
   * treatment) instead of the placeholder box. */
  src?: string;
}) {
  const { ref, revealed } = usePhotoReveal<HTMLImageElement>();

  if (src) {
    return (
      <div
        className={`aspect-[4/3] overflow-hidden rounded-athlo-xl border border-athlo-line-subtle bg-athlo-bg-raised ${className}`.trim()}
      >
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={`site-photo h-full w-full object-cover ${revealed ? "is-revealed" : ""}`.trim()}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex aspect-[4/3] items-center justify-center rounded-athlo-xl border border-athlo-line-subtle bg-athlo-bg-raised ${className}`.trim()}
    >
      <span className="font-body text-athlo-label text-athlo-text-disabled">{label}</span>
    </div>
  );
}

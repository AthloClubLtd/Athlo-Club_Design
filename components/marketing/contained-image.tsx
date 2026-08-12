import Image from "next/image";

/** Ratio-locked, object-contain image box — the box's own aspect ratio
 * always equals the image's, so there's nothing to crop or letterbox at
 * any breakpoint (unlike ImagePlaceholder's real-photo path, which is
 * object-cover + a fixed aspect-[4/3] and would crop a differently-shaped
 * image). Used for product screenshots and other assets that must never
 * be cropped, as opposed to ImagePlaceholder's community photography. */
export function ContainedImage({
  src,
  alt,
  ratioClassName,
  className = "",
}: {
  src: string;
  alt: string;
  /** Literal `aspect-[W/H]` class matching the source file's real pixel
   * dimensions — must be a literal string in the JSX, not built from a
   * template: Tailwind's JIT scanner only generates CSS for class names
   * that appear as static text in the source, so an interpolated
   * `aspect-[${w}/${h}]` would silently produce no CSS at all. */
  ratioClassName: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-athlo-xl border border-athlo-line-subtle bg-athlo-bg-raised ${className}`.trim()}
    >
      <div className={`relative w-full ${ratioClassName}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-contain" />
      </div>
    </div>
  );
}

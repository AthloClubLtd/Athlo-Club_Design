export function HeadshotPlaceholder({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-athlo-md border border-dashed border-athlo-line-subtle bg-athlo-bg-inset sm:h-16 sm:w-16 ${className}`.trim()}
    >
      <span className="text-center font-body text-[8px] font-semibold uppercase leading-none text-athlo-text-disabled">
        Headshot
      </span>
    </div>
  );
}

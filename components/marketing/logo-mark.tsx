// TODO: placeholder — swap for the real Athlo Club logo/wordmark asset once
// a file upload actually succeeds. This is deliberately just real brand
// typography (Space Grotesk, --color-lime, tokens throughout), not a
// hand-traced recreation of the illustrated wordmark (torn/hollow "A",
// ring-style "O") — attempting to copy custom artwork from a visual
// reference alone risked shipping something that reads as "the logo" while
// actually being wrong.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-athlo-h3 font-bold uppercase tracking-[var(--tracking-tight)] ${className}`.trim()}
    >
      <span className="text-athlo-lime">Athlo</span>{" "}
      <span className="text-athlo-text-primary">Club</span>
    </span>
  );
}

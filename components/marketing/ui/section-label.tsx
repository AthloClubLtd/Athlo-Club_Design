export function SectionLabel({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "muted" | "lime";
  className?: string;
}) {
  return (
    <p
      className={`font-display text-athlo-label font-semibold uppercase ${
        tone === "lime" ? "text-athlo-lime" : "text-athlo-text-secondary"
      } ${className}`.trim()}
    >
      {children}
    </p>
  );
}

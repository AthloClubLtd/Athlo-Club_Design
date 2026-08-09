export function TractionStat({
  value,
  label,
  lime = false,
}: {
  value: string;
  label: string;
  lime?: boolean;
}) {
  return (
    <div className="text-center">
      <p
        className={`font-display text-athlo-numeral font-bold ${
          lime ? "text-athlo-lime" : "text-athlo-text-primary"
        }`}
      >
        {value}
      </p>
      <p className="mt-[var(--space-1)] font-body text-athlo-label text-athlo-text-secondary">{label}</p>
    </div>
  );
}

import { Ticket } from "lucide-react";

export function StickyActionBar({
  priceLabel,
  priceSubLabel,
  ctaLabel,
  ctaActiveLabel,
  ctaActive,
  onCta,
}: {
  priceLabel: string;
  priceSubLabel: string;
  ctaLabel: string;
  ctaActiveLabel: string;
  ctaActive: boolean;
  onCta: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-[var(--space-4)] border-t border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-4)] py-[var(--space-3)]">
      <div>
        <p className="font-display text-athlo-body-lg font-bold text-athlo-text-primary">{priceLabel}</p>
        <p className="font-body text-athlo-label text-athlo-text-secondary">{priceSubLabel}</p>
      </div>
      <button
        type="button"
        onClick={onCta}
        className={`flex min-h-[44px] shrink-0 items-center gap-[var(--space-2)] rounded-athlo-md px-[var(--space-5)] font-body font-semibold transition-all ${
          ctaActive
            ? "border border-athlo-line-strong bg-athlo-bg-overlay text-athlo-text-primary"
            : "bg-athlo-lime text-athlo-text-on-lime hover:-translate-y-px hover:shadow-athlo-lime"
        }`}
      >
        <Ticket size={16} aria-hidden="true" />
        {ctaActive ? ctaActiveLabel : ctaLabel}
      </button>
    </div>
  );
}

import { Fragment } from "react";

export function SectionShelf<T>({
  title,
  subtitle,
  items,
  getKey,
  renderItem,
}: {
  title: string;
  subtitle?: string;
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-[var(--space-6)]">
      <div className="flex items-baseline justify-between px-[var(--space-4)]">
        <h2 className="font-display text-athlo-body-lg font-semibold text-athlo-text-primary">{title}</h2>
        {subtitle && <span className="font-body text-athlo-label text-athlo-text-secondary">{subtitle}</span>}
      </div>
      <div className="mt-[var(--space-3)] flex gap-[var(--space-3)] overflow-x-auto px-[var(--space-4)] pb-[var(--space-1)]">
        {items.map((item) => (
          <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
        ))}
      </div>
    </div>
  );
}

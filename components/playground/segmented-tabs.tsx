"use client";

import { useRef } from "react";

export type TabItem<T extends string> = { key: T; label: string };

/** Underlined-tab pattern (roving tabindex, arrow-key nav) shared by
 * Discover's Events/Volunteering tabs and Organiser's Overview/Events
 * tabs — one implementation instead of two near-identical ones. */
export function SegmentedTabs<T extends string>({
  tabs,
  active,
  onChange,
  ariaLabel,
  idPrefix,
}: {
  tabs: TabItem<T>[];
  active: T;
  onChange: (key: T) => void;
  ariaLabel: string;
  idPrefix: string;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    onChange(tabs[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex gap-[var(--space-5)] border-b border-athlo-line-subtle px-[var(--space-4)]">
      {tabs.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${tab.key}`}
          aria-selected={active === tab.key}
          aria-controls={`${idPrefix}-panel-${tab.key}`}
          tabIndex={active === tab.key ? 0 : -1}
          onClick={() => onChange(tab.key)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={`min-h-[44px] border-b-2 px-[var(--space-1)] font-body font-semibold transition-colors ${
            active === tab.key
              ? "border-athlo-text-primary text-athlo-text-primary"
              : "border-transparent text-athlo-text-secondary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

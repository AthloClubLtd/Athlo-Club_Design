"use client";

import { useRef } from "react";

export type DiscoverTabKey = "events" | "volunteering";

const TABS: { key: DiscoverTabKey; label: string }[] = [
  { key: "events", label: "Events" },
  { key: "volunteering", label: "Volunteering" },
];

export function DiscoverTabs({
  active,
  onChange,
}: {
  active: DiscoverTabKey;
  onChange: (key: DiscoverTabKey) => void;
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    onChange(TABS[next].key);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Discover"
      className="flex gap-[var(--space-5)] border-b border-athlo-line-subtle px-[var(--space-4)]"
    >
      {TABS.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`discover-tab-${tab.key}`}
          aria-selected={active === tab.key}
          aria-controls={`discover-panel-${tab.key}`}
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

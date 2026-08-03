"use client";

import { useRef } from "react";

export type PlaygroundPanelKey = "athlete" | "organiser";

const TABS: { key: PlaygroundPanelKey; label: string }[] = [
  { key: "athlete", label: "Athlete" },
  { key: "organiser", label: "Organiser" },
];

export function PlaygroundToggle({
  active,
  onChange,
}: {
  active: PlaygroundPanelKey;
  onChange: (key: PlaygroundPanelKey) => void;
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
    <div role="tablist" aria-label="Playground view" className="inline-flex rounded-athlo-pill bg-athlo-bg-overlay p-1">
      {TABS.map((tab, i) => (
        <button
          key={tab.key}
          ref={(el) => {
            tabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`playground-tab-${tab.key}`}
          aria-selected={active === tab.key}
          aria-controls={`playground-panel-${tab.key}`}
          tabIndex={active === tab.key ? 0 : -1}
          onClick={() => onChange(tab.key)}
          onKeyDown={(e) => onKeyDown(e, i)}
          className={`min-h-[44px] min-w-[44px] rounded-athlo-pill px-[var(--space-6)] py-[var(--space-3)] font-body font-semibold transition-colors ${
            active === tab.key ? "bg-athlo-lime text-athlo-text-on-lime" : "text-athlo-text-secondary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

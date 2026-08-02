"use client";

import { useRef, useState } from "react";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { Button } from "@/components/marketing/ui/button";
import { ProductScreenshotPlaceholder } from "@/components/marketing/product-screenshot-placeholder";

type CardContent = {
  title: string;
  label: string;
  subtitle: string;
  alt: string;
};

const ORGANISER_CARDS: CardContent[] = [
  {
    title: "Unified events & scoring system",
    label: "Unified events & scoring",
    subtitle:
      "Templates for weightlifting, powerlifting, fitness racing and Hyrox — or build your own scoring logic.",
    alt: "TODO: screenshot of the Athlo Club organiser dashboard showing unified event and scoring templates",
  },
  {
    title: "End-to-end event management",
    label: "Event management",
    subtitle:
      "Ticketing, registration, athlete management, live leaderboards and results — the whole competition in one place.",
    alt: "TODO: screenshot of the Athlo Club event management screen showing ticketing, registration and live leaderboards",
  },
  {
    title: "Targeted athlete reach",
    label: "Athlete reach",
    subtitle: "Reach athletes matched by sport, skill level and location — not just whoever finds your Instagram.",
    alt: "TODO: screenshot of Athlo Club's athlete reach tools showing targeting by sport, skill level and location",
  },
];

const ATHLETE_CARDS: CardContent[] = [
  {
    title: "Discovery",
    label: "Discovery",
    subtitle: "Find clubs and comps near you, in your sport.",
    alt: "TODO: screenshot of the Athlo Club discover page showing nearby clubs and competitions by sport",
  },
  {
    title: "Build your profile",
    label: "Athlete profile",
    subtitle:
      "One athlete profile across every strength sport — verified lifts, scores and rankings that follow you everywhere.",
    alt: "TODO: screenshot of an athlete's Athlo Club profile showing verified lifts, scores and rankings",
  },
  {
    title: "Track your progress",
    label: "Progress",
    subtitle: "Every competition, result and PB in one place.",
    alt: "TODO: screenshot of an athlete's progress view showing competition history, results and personal bests",
  },
];

const TABS = [
  { key: "organisers" as const, label: "For organisers", cards: ORGANISER_CARDS },
  { key: "athletes" as const, label: "For athletes", cards: ATHLETE_CARDS },
];

export function HowItWorks() {
  const [active, setActive] = useState<"organisers" | "athletes">("organisers");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    setActive(TABS[next].key);
    tabRefs.current[next]?.focus();
  };

  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section>
      <SectionLabel tone="lime" className="text-center">
        How it works
      </SectionLabel>
      <h2 className="mt-[var(--space-3)] text-center font-display text-athlo-h2 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
        One platform. Both sides of the sport.
      </h2>

      <div className="mt-[var(--space-7)] flex justify-center">
        <div role="tablist" aria-label="Audience" className="inline-flex rounded-athlo-pill bg-athlo-bg-overlay p-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`howitworks-tab-${tab.key}`}
              aria-selected={active === tab.key}
              aria-controls={`howitworks-panel-${tab.key}`}
              tabIndex={active === tab.key ? 0 : -1}
              onClick={() => setActive(tab.key)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-[44px] rounded-athlo-pill px-[var(--space-6)] py-[var(--space-3)] font-body font-semibold transition-colors ${
                active === tab.key ? "bg-athlo-lime text-athlo-text-on-lime" : "text-athlo-text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`howitworks-panel-${activeTab.key}`}
        aria-labelledby={`howitworks-tab-${activeTab.key}`}
        className="mt-[var(--space-8)] grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3"
      >
        {activeTab.cards.map((card) => (
          <div key={card.title}>
            <ProductScreenshotPlaceholder alt={card.alt} label={card.label} />
            <h3 className="mt-[var(--space-5)] font-display text-athlo-h3 font-semibold text-athlo-text-primary">
              {card.title}
            </h3>
            <p className="mt-[var(--space-2)] font-body text-athlo-body text-athlo-text-body">{card.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-[var(--space-7)] text-center">
        <Button href="/playground" variant="ghost">
          Check out the demo →
        </Button>
      </div>
    </section>
  );
}

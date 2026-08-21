"use client";

import { useRef, useState } from "react";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { Button } from "@/components/marketing/ui/button";
import { ProductScreenshotPlaceholder } from "@/components/marketing/product-screenshot-placeholder";
import { ContainedImage } from "@/components/marketing/contained-image";

type CardContent = {
  title: string;
  label: string;
  subtitle: string;
  alt: string;
  /** Real screenshot, when one exists — cards without it keep rendering
   * ProductScreenshotPlaceholder unchanged. All six current cards' images
   * share the same 1092x2475 ratio, hence the shared literal
   * ratioClassName below. */
  imageSrc?: string;
};

const ORGANISER_CARDS: CardContent[] = [
  {
    title: "Fill your events without the ad spend.",
    label: "Fill your events",
    subtitle:
      "Athletes already searching for their next competition find you here — no SEO spend, no separate events page to maintain. We bring the athletes to you.",
    alt: "Athlo Club map view showing nearby events and clubs pinned by location for targeted athlete discovery.",
    imageSrc: "/home/organiser-3.png",
  },
  {
    title: "Get your weekend back.",
    label: "Get your weekend back",
    subtitle:
      "5+ apps replaced by one, so you spend less time on admin and more time running your event.",
    alt: "Athlo Club create-event screen showing scoring templates for weightlifting, powerlifting and fitness racing.",
    imageSrc: "/home/organiser-1.png",
  },
  {
    title: "Sell more tickets per event.",
    label: "Sell more tickets",
    subtitle:
      "Registration, tickets, payment and scoring — run every event and competition, across every strength sport, on one platform.",
    alt: "Athlo Club club profile screen showing upcoming events with registration counts and a live competition.",
    imageSrc: "/home/organiser-2.png",
  },
];

const ATHLETE_CARDS: CardContent[] = [
  {
    title: "Find the right competition for you",
    label: "Discover",
    subtitle: "Matched to your sport, level, weight class and location — not just whoever's nearest.",
    alt: "Athlo Club app screen showing nearby strength events, competitions and clubs, filterable by sport and level.",
    imageSrc: "/home/athlete-1.jpg",
  },
  {
    title: "Get rewarded for showing up",
    label: "Rewards",
    subtitle: "Enter events, try new sports and join clubs to unlock discounts and kit.",
    alt: "Athlo Club My Clubs screen showing a club the athlete created, and a list of followed clubs with member counts and new-activity notifications.",
    imageSrc: "/home/athlete-2.jpg",
  },
  {
    title: "Build your athlete record",
    label: "Your record",
    subtitle: "Every result, PR and ranking across every strength sport, in one profile.",
    alt: "Athlo Club progress screen showing a strength profile percentage, earned challenges and badges.",
    imageSrc: "/home/athlete-3.jpg",
  },
];

const TABS = [
  { key: "organisers" as const, label: "For organisers", cards: ORGANISER_CARDS },
  { key: "athletes" as const, label: "For athletes", cards: ATHLETE_CARDS },
];

export function HowItWorks() {
  const [active, setActive] = useState<"organisers" | "athletes">("athletes");
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
        className="mt-[var(--space-8)] grid grid-cols-1 gap-[var(--space-9)] md:grid-cols-2 md:gap-[var(--space-8)] lg:grid-cols-3"
      >
        {activeTab.cards.map((card) => (
          <div key={card.title} className="text-center">
            {card.imageSrc ? (
              // max-w caps it on wide desktop columns so a 2475px-tall
              // screenshot doesn't dominate the row; below that it scales
              // down with the grid column on its own.
              <ContainedImage
                src={card.imageSrc}
                alt={card.alt}
                ratioClassName="aspect-[1092/2475]"
                className="mx-auto max-w-[300px]"
              />
            ) : (
              <ProductScreenshotPlaceholder alt={card.alt} label={card.label} />
            )}
            <h3 className="mt-[var(--space-6)] font-display text-athlo-h2 font-bold text-athlo-accent-soft">
              {card.title}
            </h3>
            <p className="mt-[var(--space-4)] font-body text-athlo-body text-athlo-text-body">{card.subtitle}</p>
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

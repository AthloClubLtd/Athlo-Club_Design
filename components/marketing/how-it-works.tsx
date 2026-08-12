"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { Button } from "@/components/marketing/ui/button";
import { ProductScreenshotPlaceholder } from "@/components/marketing/product-screenshot-placeholder";

type CardContent = {
  title: string;
  label: string;
  subtitle: string;
  alt: string;
  /** Real screenshot, when one exists — cards without it keep rendering
   * ProductScreenshotPlaceholder unchanged (the organiser side has none
   * yet). width/height are the file's real intrinsic pixels, not a
   * design choice — next/image uses them to reserve the exact aspect
   * ratio, so nothing ever crops or letterboxes against a mismatched box. */
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
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
    title: "Discover events, competitions & clubs near you",
    label: "Discovery",
    subtitle: "Find clubs, competitions and events near you, in your sport.",
    alt: "Athlo Club app screen showing nearby strength events, competitions and clubs, filterable by sport and level.",
    imageSrc: "/home/athlete-1.jpg",
    imageWidth: 1092,
    imageHeight: 2475,
  },
  {
    title: "Follow clubs & build your community",
    label: "Community",
    subtitle: "Follow the clubs you train with and stay in the loop on what they're running next.",
    alt: "Athlo Club athlete profile screen showing followers, following count, and a verified weightlifting personal-best card.",
    imageSrc: "/home/athlete-2.jpg",
    imageWidth: 1092,
    imageHeight: 2475,
  },
  {
    title: "Track your progress and unlock offers",
    label: "Progress",
    subtitle: "Build your strength profile, earn badges and unlock new challenges, clubs and offers.",
    alt: "Athlo Club progress screen showing a strength profile percentage, earned challenges and badges.",
    imageSrc: "/home/athlete-3.jpg",
    imageWidth: 1092,
    imageHeight: 2475,
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
            {card.imageSrc && card.imageWidth && card.imageHeight ? (
              // Portrait wrapper sized to the file's own ratio (not forced
              // into the placeholder's landscape aspect-[4/3]) — object-contain
              // inside a box that already matches the image's ratio never
              // needs to crop or letterbox. max-w caps it on wide desktop
              // columns so a 2475px-tall screenshot doesn't dominate the row;
              // below that it scales down with the grid column on its own.
              <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-athlo-xl border border-athlo-line-subtle bg-athlo-bg-raised">
                {/* aspect-[1092/2475] is a literal class, not templated from
                    card.imageWidth/imageHeight — Tailwind's JIT scanner only
                    picks up class names that appear as literal text in the
                    source, so a runtime-interpolated aspect-[] would silently
                    generate no CSS. All three athlete images share this exact
                    ratio today; a future image with a different ratio needs
                    its own literal aspect-[] class alongside this one. */}
                <div className="relative aspect-[1092/2475] w-full">
                  <Image
                    src={card.imageSrc}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 90vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <ProductScreenshotPlaceholder alt={card.alt} label={card.label} />
            )}
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

"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { PhoneFrame } from "@/components/playground/phone-frame";
import { WebAppFrame } from "@/components/playground/web-app-frame";
import { FramePlaceholder } from "@/components/playground/frame-placeholder";
import { PlaygroundToggle, type PlaygroundPanelKey } from "@/components/playground/playground-toggle";
import { useMediaQuery } from "@/components/playground/use-media-query";

function PlaygroundPanel({
  id,
  label,
  isDesktop,
  isActive,
  children,
}: {
  id: PlaygroundPanelKey;
  label: string;
  isDesktop: boolean;
  isActive: boolean;
  children: React.ReactNode;
}) {
  // Below `pg`, only the toggle-selected panel renders at all — it isn't
  // just visually hidden, it's removed from the DOM (and so the a11y
  // tree), so keyboard/AT users can't tab into an off-screen panel.
  if (!isDesktop && !isActive) return null;

  return (
    <section
      id={`playground-panel-${id}`}
      // The tabpanel/tablist relationship only exists in toggle mode — at
      // desktop both panels show at once with no tabs controlling them, so
      // the role and its aria-labelledby link would be meaningless (and
      // aria-labelledby would point at a toggle that isn't even rendered).
      role={isDesktop ? undefined : "tabpanel"}
      aria-labelledby={isDesktop ? undefined : `playground-tab-${id}`}
      aria-label={isDesktop ? label : undefined}
    >
      <SectionLabel className={isDesktop ? "" : "text-center"}>{label}</SectionLabel>
      <div className="mt-[var(--space-4)]">{children}</div>
    </section>
  );
}

export function PlaygroundShell() {
  const isDesktop = useMediaQuery("(min-width: 980px)");
  const [active, setActive] = useState<PlaygroundPanelKey>("athlete");

  return (
    <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--space-9)]">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel tone="lime">Interactive demo · sample data</SectionLabel>
        <h1 className="mt-[var(--space-3)] font-display text-athlo-h1 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
          See Athlo Club from both sides.
        </h1>
        <p className="mt-[var(--space-4)] font-body text-athlo-body-lg text-athlo-text-body">
          A live look at the product, dropped straight in as a sample athlete —
          no sign-up. Everything here is seeded demo data; nothing you do is saved.
        </p>
      </div>

      {!isDesktop && (
        <div className="mt-[var(--space-8)] flex justify-center">
          <PlaygroundToggle active={active} onChange={setActive} />
        </div>
      )}

      <div
        className={`mt-[var(--space-7)] grid gap-[var(--space-8)] ${
          isDesktop ? "grid-cols-[360px_1fr] items-start" : "grid-cols-1"
        }`}
      >
        <PlaygroundPanel id="athlete" label="Athlete" isDesktop={isDesktop} isActive={active === "athlete"}>
          <PhoneFrame>
            <FramePlaceholder title="Athlete view" note="Built in the next step." />
          </PhoneFrame>
        </PlaygroundPanel>

        <PlaygroundPanel id="organiser" label="Organiser" isDesktop={isDesktop} isActive={active === "organiser"}>
          <WebAppFrame>
            <FramePlaceholder title="Organiser view" note="Built in the next step." />
          </WebAppFrame>
        </PlaygroundPanel>
      </div>
    </div>
  );
}

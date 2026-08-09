"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/marketing/ui/section-label";
import { PhoneFrame } from "@/components/playground/phone-frame";
import { PlaygroundToggle, type PlaygroundPanelKey } from "@/components/playground/playground-toggle";
import { TractionStrip } from "@/components/playground/traction-strip";
import { EventsProvider } from "@/lib/playground/events-store";
import { AthletePhoneScreen } from "@/components/playground/athlete/athlete-phone-screen";
import { OrganiserPhoneScreen } from "@/components/playground/organiser/organiser-phone-screen";

export function PlaygroundShell() {
  const [active, setActive] = useState<PlaygroundPanelKey>("athlete");

  return (
    // Shared by both views — the Organiser "create event" flow writes into
    // the same store the Athlete Discover screen reads from, so a new
    // event appears there immediately, with zero extra wiring.
    <EventsProvider>
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--space-9)]">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel tone="lime">Interactive demo · sample data</SectionLabel>
          <h1 className="mt-[var(--space-3)] font-display text-athlo-h1 font-bold tracking-[var(--tracking-heading)] text-athlo-text-primary">
            See Athlo Club from both sides.
          </h1>
          <p className="mt-[var(--space-4)] font-body text-athlo-body-lg text-athlo-text-body">
            A live look at the product, dropped straight in as a sample athlete or organiser —
            no sign-up. Everything here is seeded demo data; nothing you do is saved.
          </p>
        </div>

        <TractionStrip />

        <div className="mt-[var(--space-8)] flex flex-col items-center gap-[var(--space-2)]">
          <span id="playground-switcher-label" className="font-body text-athlo-label font-semibold text-athlo-text-secondary">
            Viewing as
          </span>
          <PlaygroundToggle active={active} onChange={setActive} />
          {/* Announces the switch for screen-reader users the same way the
              visible crossfade signals it for sighted ones. */}
          <p aria-live="polite" className="sr-only">
            Now viewing as {active === "athlete" ? "Athlete" : "Organiser"}
          </p>
        </div>

        <div className="mt-[var(--space-7)] flex justify-center">
          <PhoneFrame>
            {/* Both views stay mounted (display:none toggling) — same
                "keep mounted" pattern as Discover<->Detail — so the
                Organiser's in-progress create-event form and the Athlete's
                filters/scroll position both survive a round trip. */}
            <div
              role="tabpanel"
              id="playground-panel-athlete"
              aria-labelledby="playground-tab-athlete"
              className="h-full animate-view-crossfade"
              style={{ display: active === "athlete" ? "block" : "none" }}
            >
              <AthletePhoneScreen />
            </div>
            <div
              role="tabpanel"
              id="playground-panel-organiser"
              aria-labelledby="playground-tab-organiser"
              className="h-full animate-view-crossfade"
              style={{ display: active === "organiser" ? "block" : "none" }}
            >
              <OrganiserPhoneScreen />
            </div>
          </PhoneFrame>
        </div>
      </div>
    </EventsProvider>
  );
}

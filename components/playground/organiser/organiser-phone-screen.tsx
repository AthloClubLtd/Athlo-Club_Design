"use client";

import { useRef, useState } from "react";
import { AthloClubWordmark } from "@/components/marketing/ui/athlo-club-wordmark";
import { SegmentedTabs, type TabItem } from "@/components/playground/segmented-tabs";
import { DetailToast } from "@/components/playground/athlete/detail/detail-toast";
import { CreateEventForm } from "@/components/playground/organiser/create-event-form";
import { OrganiserEventsList } from "@/components/playground/organiser/organiser-events-list";
import { OrganiserOverview } from "@/components/playground/organiser/organiser-overview";
import { useEventsStore } from "@/lib/playground/events-store";
import { DEMO_ORGANISER_CLUB_ID } from "@/lib/playground/organiser-constants";

type OrganiserTab = "overview" | "events";

const TABS: TabItem<OrganiserTab>[] = [
  { key: "overview", label: "Overview" },
  { key: "events", label: "Events" },
];

export function OrganiserPhoneScreen() {
  const { events, getClub } = useEventsStore();
  const [tab, setTab] = useState<OrganiserTab>("events");
  const [screen, setScreen] = useState<"list" | "create">("list");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const club = getClub(DEMO_ORGANISER_CLUB_ID);
  const clubEvents = events.filter((event) => event.clubId === DEMO_ORGANISER_CLUB_ID);

  if (!club) return null;

  const handlePublished = () => {
    setScreen("list");
    setTab("events");
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast("Event published — live for athletes");
    toastTimeoutRef.current = setTimeout(() => setToast(null), 2500);
  };

  if (screen === "create") {
    return (
      <div className="h-full">
        <CreateEventForm onCancel={() => setScreen("list")} onPublished={handlePublished} />
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex items-center justify-between gap-[var(--space-3)] px-[var(--space-4)]">
        <AthloClubWordmark imgClassName="h-5 w-auto" textClassName="text-athlo-body" />
        <span className="rounded-athlo-pill bg-athlo-bg-overlay px-[var(--space-3)] py-[var(--space-1)] font-body text-athlo-label font-semibold uppercase tracking-[var(--tracking-label)] text-athlo-text-secondary">
          Organiser
        </span>
      </div>

      <div className="mt-[var(--space-4)]">
        <SegmentedTabs tabs={TABS} active={tab} onChange={setTab} ariaLabel="Organiser" idPrefix="organiser" />
      </div>

      <div
        role="tabpanel"
        id="organiser-panel-overview"
        aria-labelledby="organiser-tab-overview"
        className="min-h-0 flex-1"
        style={{ display: tab === "overview" ? "block" : "none" }}
      >
        <OrganiserOverview club={club} events={clubEvents} />
      </div>

      <div
        role="tabpanel"
        id="organiser-panel-events"
        aria-labelledby="organiser-tab-events"
        className="min-h-0 flex-1"
        style={{ display: tab === "events" ? "block" : "none" }}
      >
        <OrganiserEventsList events={clubEvents} onCreate={() => setScreen("create")} />
      </div>

      <DetailToast message={toast} />
    </div>
  );
}

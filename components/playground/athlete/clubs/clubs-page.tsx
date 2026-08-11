"use client";

import { useRef, useState } from "react";
import { TopBar } from "@/components/playground/athlete/top-bar";
import { SegmentedTabs, type TabItem } from "@/components/playground/segmented-tabs";
import { BottomNav, type NavKey } from "@/components/playground/athlete/bottom-nav";
import { DetailToast } from "@/components/playground/athlete/detail/detail-toast";
import { MyClubsTab } from "@/components/playground/athlete/clubs/my-clubs-tab";
import { AllClubsTab } from "@/components/playground/athlete/clubs/all-clubs-tab";

type ClubsTabKey = "my" | "all";
const CLUBS_TABS: TabItem<ClubsTabKey>[] = [
  { key: "my", label: "My Clubs" },
  { key: "all", label: "All Clubs" },
];

export function ClubsPage({
  onSelectEvent,
  onNavigate,
}: {
  onSelectEvent: (eventId: string) => void;
  onNavigate: (key: NavKey) => void;
}) {
  const [activeTab, setActiveTab] = useState<ClubsTabKey>("my");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="relative flex h-full flex-col">
      {/* No pt- here — PhoneFrame's own screen wrapper already reserves
          the Dynamic Island safe-area clearance for every screen. */}
      <div className="flex flex-col gap-[var(--space-4)] pb-[var(--space-4)]">
        <TopBar centerLabel="Clubs" />
        <SegmentedTabs tabs={CLUBS_TABS} active={activeTab} onChange={setActiveTab} ariaLabel="Clubs" idPrefix="clubs" />
      </div>

      <div className="no-scrollbar min-h-0 flex-1 overflow-x-hidden overflow-y-auto pt-[var(--space-4)]">
        {/* Both tabs stay mounted (display:none toggling) — same pattern
            as Discover's own tabs and Discover<->Detail — so All Clubs'
            search query and My Clubs' scroll position both survive a
            switch back and forth. */}
        <div
          role="tabpanel"
          id="clubs-panel-my"
          aria-labelledby="clubs-tab-my"
          style={{ display: activeTab === "my" ? "block" : "none" }}
        >
          <MyClubsTab
            onCreateClub={() => showToast("Creating clubs — coming soon")}
            onSelectEvent={onSelectEvent}
            onSelectClub={() => showToast("Club pages — coming soon")}
          />
        </div>
        <div
          role="tabpanel"
          id="clubs-panel-all"
          aria-labelledby="clubs-tab-all"
          style={{ display: activeTab === "all" ? "block" : "none" }}
        >
          <AllClubsTab onCreateClub={() => showToast("Creating clubs — coming soon")} />
        </div>
      </div>

      <BottomNav active="clubs" onNavigate={onNavigate} />
      <DetailToast message={toast} />
    </div>
  );
}

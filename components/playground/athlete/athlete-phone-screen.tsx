"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/components/playground/use-media-query";
import { DiscoverCurationSplash } from "@/components/playground/athlete/discover-curation-splash";
import { DiscoverPage } from "@/components/playground/athlete/discover-page";
import { ClubsPage } from "@/components/playground/athlete/clubs/clubs-page";
import { EventDetailScreen } from "@/components/playground/athlete/detail/event-detail-screen";
import type { NavKey } from "@/components/playground/athlete/bottom-nav";

const SPLASH_SEEN_KEY = "playground-athlete-splash-seen";

export function AthletePhoneScreen() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [phase, setPhase] = useState<"splash" | "app">("splash");
  const [screen, setScreen] = useState<"discover" | "clubs" | "detail">("discover");
  // Which list screen opened the current detail view — Back returns here,
  // so opening an event from the Clubs carousel comes back to Clubs, not
  // straight to Discover regardless of where the tap actually came from.
  const [listScreen, setListScreen] = useState<"discover" | "clubs">("discover");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const appRef = useRef<HTMLDivElement>(null);

  // Runs before paint, so a same-session remount never flashes the splash
  // for a frame before snapping straight into the app. Read-only — the
  // "seen" flag is written in handleSplashComplete below, not here.
  // Writing it on mount (rather than on actual completion) is
  // idempotent-unsafe: React 18 Strict Mode double-invokes effects once in
  // development, and a write-on-mount means the second simulated mount
  // reads the flag the first one just wrote, skipping the splash on every
  // dev-mode first load. Only marking it "seen" once the splash genuinely
  // finishes avoids that entirely, since a read-only check can't disagree
  // with itself no matter how many times it re-runs.
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_SEEN_KEY)) {
        setPhase("app");
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — fall back to
      // showing the splash every mount rather than crashing.
    }
  }, []);

  // Focus moves forward once the app mounts — not a trap, just a sensible
  // landing point after the splash hands off. Only fires on that one
  // splash->app transition, not on every internal Discover<->Detail nav.
  useEffect(() => {
    if (phase === "app") appRef.current?.focus();
  }, [phase]);

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch {
      // Private browsing etc. — nothing to persist; the splash will just
      // replay next mount, which is an acceptable fallback.
    }
    setPhase("app");
  };

  const openEvent = (eventId: string) => {
    if (screen === "discover" || screen === "clubs") setListScreen(screen);
    setSelectedEventId(eventId);
    setScreen("detail");
  };
  const backToList = () => setScreen(listScreen);

  // Home/Me have no screen to go to yet — a no-op tap, same as the
  // header's decorative Calendar button elsewhere in the demo.
  const handleNavigate = (key: NavKey) => {
    if (key === "discover" || key === "clubs") {
      setListScreen(key);
      setScreen(key);
    }
  };

  if (phase === "splash") {
    return <DiscoverCurationSplash onComplete={handleSplashComplete} />;
  }

  return (
    <div
      ref={appRef}
      tabIndex={-1}
      className={`relative h-full outline-none ${reducedMotion ? "" : "animate-discover-enter"}`}
    >
      {/* Discover and Clubs both stay mounted even while Detail is showing
          (display:none, not unmounted) — their filters/search/scroll
          position are all local useState, so unmounting on every detail
          visit or every Discover<->Clubs switch would reset them. */}
      <div className="h-full" style={{ display: screen === "discover" ? "block" : "none" }}>
        <DiscoverPage onSelectEvent={openEvent} onNavigate={handleNavigate} />
      </div>
      <div className="h-full" style={{ display: screen === "clubs" ? "block" : "none" }}>
        <ClubsPage onSelectEvent={openEvent} onNavigate={handleNavigate} />
      </div>

      {screen === "detail" && selectedEventId && (
        <div className="absolute inset-0">
          <EventDetailScreen eventId={selectedEventId} onBack={backToList} />
        </div>
      )}
    </div>
  );
}

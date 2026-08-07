"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/components/playground/use-media-query";
import { DiscoverCurationSplash } from "@/components/playground/athlete/discover-curation-splash";
import { DiscoverPage } from "@/components/playground/athlete/discover-page";

const SPLASH_SEEN_KEY = "playground-athlete-splash-seen";

export function AthletePhoneScreen() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [phase, setPhase] = useState<"splash" | "discover">("splash");
  const discoverRef = useRef<HTMLDivElement>(null);

  // Runs before paint, so a same-session remount never flashes the splash
  // for a frame before snapping to Discover. Read-only — the "seen" flag
  // is written in handleSplashComplete below, not here. Writing it on
  // mount (rather than on actual completion) is idempotent-unsafe: React
  // 18 Strict Mode double-invokes effects once in development, and a
  // write-on-mount means the second simulated mount reads the flag the
  // first one just wrote, skipping the splash on every dev-mode first
  // load. Only marking it "seen" once the splash genuinely finishes
  // avoids that entirely, since a read-only check can't disagree with
  // itself no matter how many times it re-runs.
  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_SEEN_KEY)) {
        setPhase("discover");
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing) — fall back to
      // showing the splash every mount rather than crashing.
    }
  }, []);

  // Focus moves forward into Discover once it mounts — not a trap, just a
  // sensible landing point after the splash hands off.
  useEffect(() => {
    if (phase === "discover") discoverRef.current?.focus();
  }, [phase]);

  const handleSplashComplete = () => {
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch {
      // Private browsing etc. — nothing to persist; the splash will just
      // replay next mount, which is an acceptable fallback.
    }
    setPhase("discover");
  };

  if (phase === "splash") {
    return <DiscoverCurationSplash onComplete={handleSplashComplete} />;
  }

  return (
    <div
      ref={discoverRef}
      tabIndex={-1}
      className={`h-full outline-none ${reducedMotion ? "" : "animate-discover-enter"}`}
    >
      <DiscoverPage />
    </div>
  );
}

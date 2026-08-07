"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/components/playground/use-media-query";
import { AthloClubWordmark } from "@/components/marketing/ui/athlo-club-wordmark";

const LINES = [
  "Curating events for you",
  "Finding clubs in your area",
  "Lining up competitions near you",
  "Powerlifting · Hyrox · Weightlifting · Strongman",
  "Let's find your next challenge",
];
const LINE_DURATION_MS = 500;
// Derived from the line count, not a second hardcoded number — the two
// can't drift out of sync with each other.
const TOTAL_DURATION_MS = LINES.length * LINE_DURATION_MS;
const SEGMENT_COUNT = 3;
const EXIT_DURATION_MS = 200;

export function DiscoverCurationSplash({ onComplete }: { onComplete: () => void }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      // Hold the static wordmark + first line for the same felt duration —
      // motion is what's cut, not the pause itself.
      const t = setTimeout(() => setExiting(true), TOTAL_DURATION_MS);
      return () => clearTimeout(t);
    }

    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      setLineIndex(Math.min(LINES.length - 1, Math.floor(elapsed / LINE_DURATION_MS)));
      setProgress(Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100));
      if (elapsed >= TOTAL_DURATION_MS) {
        setExiting(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  useEffect(() => {
    if (!exiting) return;
    const t = setTimeout(onComplete, reducedMotion ? 0 : EXIT_DURATION_MS);
    return () => clearTimeout(t);
  }, [exiting, reducedMotion, onComplete]);

  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center gap-[var(--space-6)] overflow-hidden px-[var(--space-6)] text-center transition-[opacity,transform] duration-200 ${
        exiting ? "opacity-0" + (reducedMotion ? "" : " scale-95") : "scale-100 opacity-100"
      }`}
    >
      {/* Faint decorative motif — purely atmospheric, carries no information. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 60"
        className={`pointer-events-none absolute left-1/2 top-1/2 h-auto w-48 -translate-x-1/2 -translate-y-1/2 text-athlo-line-strong opacity-10 ${
          reducedMotion ? "" : "animate-splash-bg-pulse"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="20" y1="30" x2="180" y2="30" />
        <rect x="8" y="14" width="12" height="32" rx="3" />
        <rect x="180" y="14" width="12" height="32" rx="3" />
        <rect x="26" y="19" width="8" height="22" rx="2" />
        <rect x="166" y="19" width="8" height="22" rx="2" />
      </svg>

      <AthloClubWordmark imgClassName="h-8 w-auto" textClassName="text-athlo-h3" className="relative" />

      <div aria-live="polite" aria-atomic="true" className="relative min-h-[1.5em]">
        <p
          key={lineIndex}
          className={`font-body text-athlo-body text-athlo-text-secondary ${
            reducedMotion ? "" : "animate-splash-line-in"
          }`}
        >
          {LINES[lineIndex]}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Loading Athlo Club"
        aria-valuenow={reducedMotion ? undefined : Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative flex items-center gap-[var(--space-2)]"
      >
        {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
          const lit = !reducedMotion && progress >= ((i + 1) / SEGMENT_COUNT) * 100;
          return (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-athlo-pill transition-colors duration-300 ${
                lit ? "bg-athlo-lime" : "bg-athlo-line-strong"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

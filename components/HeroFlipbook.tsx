"use client";

import { useEffect, useRef, useState } from "react";

// Single adjustable constant — frames advance at this rate (8-15fps reads as
// fast-cut footage rather than a slideshow).
const FPS = 12;

// TODO: replace with real photography (see CLAUDE.md §7 — coaching moment,
// a lifter mid-clean-and-jerk, a deadlift setup, a Hyrox-style class).
const FRAMES = ["/hero/frame-1.svg", "/hero/frame-2.svg", "/hero/frame-3.svg", "/hero/frame-4.svg"];

export type OverlayCard = {
  name: string;
  location: string;
  active?: boolean;
};

export function HeroFlipbook({ overlayCards }: { overlayCards: OverlayCard[] }) {
  const [loaded, setLoaded] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const rafRef = useRef<number | undefined>(undefined);
  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Preload every frame up front so the loop never swaps to an unloaded image.
  useEffect(() => {
    let cancelled = false;
    let remaining = FRAMES.length;

    FRAMES.forEach((src) => {
      const img = new window.Image();
      const onSettled = () => {
        remaining -= 1;
        if (remaining === 0 && !cancelled) setLoaded(true);
      };
      img.onload = onSettled;
      img.onerror = onSettled;
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded || reducedMotion) return;

    const frameDuration = 1000 / FPS;

    const tick = (time: number) => {
      if (lastTimeRef.current === undefined) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accumulatorRef.current += delta;

      while (accumulatorRef.current >= frameDuration) {
        accumulatorRef.current -= frameDuration;
        setFrameIndex((index) => (index + 1) % FRAMES.length);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = undefined;
    };
  }, [loaded, reducedMotion]);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line-strong bg-surface-raised lg:aspect-[3/4]">
      {FRAMES.map((src, index) => {
        const visible = reducedMotion ? index === 0 : index === frameIndex;
        return (
          // eslint-disable-next-line @next/next/no-img-element -- manual preload + opacity-stacked frame swapping doesn't fit next/image's lazy-loading model
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={!visible}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-100 [filter:grayscale(1)_contrast(1.08)]"
            style={{ opacity: visible ? 1 : 0 }}
          />
        );
      })}

      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col gap-2 sm:inset-x-6 sm:bottom-6">
        {overlayCards.map((card) => (
          <div
            key={card.name}
            className={`flex items-center gap-3 rounded-lg border bg-surface-raised/85 p-3 backdrop-blur-sm ${
              card.active ? "border-lime" : "border-line-strong"
            }`}
          >
            {/* TODO: replace with the club's real logo/photo */}
            <div className="h-10 w-10 flex-shrink-0 rounded-md border border-line-subtle bg-surface-overlay" />
            <div className="min-w-0">
              <p className="truncate font-display text-sm font-semibold tracking-tight text-ink-primary">
                {card.name}
              </p>
              <p className="truncate font-text text-xs text-ink-secondary">{card.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

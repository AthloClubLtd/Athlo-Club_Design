"use client";

import { useEffect, useRef, useState } from "react";

// Single adjustable constant. Below the brief's original 8-15fps "fast-cut
// film" range at the user's explicit request.
const FPS = 4;

// Real community photography, resized/recompressed for web (see
// public/assets/hero/ — originals were 1-2MB phone-camera JPEGs at up to
// 1590px tall; downsized to a 1200px ceiling at q78, ~100-160KB each) so
// preloading all 7 before playback starts doesn't stall the hero.
const DEFAULT_FRAMES = [
  "/assets/hero/frame-1.jpg",
  "/assets/hero/frame-2.jpg",
  "/assets/hero/frame-3.jpg",
  "/assets/hero/frame-4.jpg",
  "/assets/hero/frame-5.jpg",
  "/assets/hero/frame-6.jpg",
  "/assets/hero/frame-7.jpg",
];

export function HeroFlipbook({
  frames = DEFAULT_FRAMES,
  scrollDriven = false,
  className = "",
}: {
  frames?: string[];
  /** Frame advances with scroll position instead of the RAF timer. */
  scrollDriven?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const accumulatorRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Preload every frame before playback starts — no flicker/pop-in.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      frames.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [frames]);

  // requestAnimationFrame + time accumulator, not setInterval, so fps holds
  // steady regardless of tab throttling/jank.
  useEffect(() => {
    if (!loaded || reducedMotion || scrollDriven) return;

    const frameDuration = 1000 / FPS;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accumulatorRef.current += delta;

      while (accumulatorRef.current >= frameDuration) {
        accumulatorRef.current -= frameDuration;
        setFrameIndex((i) => (i + 1) % frames.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      accumulatorRef.current = 0;
    };
  }, [loaded, reducedMotion, scrollDriven, frames.length]);

  // Scroll-driven variant: frame tracks how far the container has moved
  // through the viewport, instead of the timer above.
  useEffect(() => {
    if (!loaded || reducedMotion || !scrollDriven) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
      setFrameIndex(Math.min(frames.length - 1, Math.floor(progress * frames.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, reducedMotion, scrollDriven, frames.length]);

  const displayIndex = reducedMotion ? 0 : frameIndex;

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden rounded-athlo-lg bg-athlo-bg-raised ${className}`.trim()}
      role="img"
      aria-label="Athlo Club community in motion"
    >
      {frames.map((src, i) => (
        // Hard opacity cut (no CSS transition) — fast-cut film, not a fading slideshow.
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          // First frame is the LCP candidate — the hero renders above the fold.
          fetchPriority={i === 0 ? "high" : undefined}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: loaded && i === displayIndex ? 1 : 0,
            filter: "grayscale(1) contrast(1.08)",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Single adjustable constant per the brief's 8-15fps "fast-cut film" range.
const FPS = 12;

const DEFAULT_FRAME_COUNT = 6;

// TODO: replace with real hero photography frame URLs once supplied.
// Generated inline so the preload/RAF/loop mechanics below are exercised
// end-to-end with working <img> sources rather than empty boxes.
function placeholderFrame(index: number, total: number): string {
  const angle = (360 / total) * index;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
    <rect width="640" height="800" fill="#141416" />
    <g transform="rotate(${angle} 320 400)">
      <rect x="-120" y="380" width="880" height="40" fill="#2E2E33" />
    </g>
    <text x="320" y="412" font-family="monospace" font-size="26" fill="#55564F" text-anchor="middle">FRAME ${
      index + 1
    }/${total}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEFAULT_FRAMES = Array.from({ length: DEFAULT_FRAME_COUNT }, (_, i) =>
  placeholderFrame(i, DEFAULT_FRAME_COUNT),
);

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

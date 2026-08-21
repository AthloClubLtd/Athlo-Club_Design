"use client";

import { useEffect, useRef, useState } from "react";

// Dwell time for image frames only — videos advance the sequence themselves
// via their own `ended` event, so they play at their real length instead of
// the image cadence. Below the brief's original 8-15fps "fast-cut film"
// range at the user's explicit request.
const FPS = 2;

type MediaItem =
  | { type: "image"; src: string }
  // mp4 (H.264) first for universal browser support; webm (VP9) as a
  // fallback source for browsers/WebViews built without the licensed H.264
  // decoder (relevant once this is Capacitor-wrapped).
  | { type: "video"; sources: { src: string; type: string }[] };

// Real community photography, resized/recompressed for web (see
// public/assets/hero/ — originals were 1-2MB phone-camera JPEGs at up to
// 1590px tall; downsized to a 1200px ceiling at q78, ~100-160KB each) so
// preloading everything before playback starts doesn't stall the hero.
// The two reels were re-encoded from 1080x1920 originals to 720-wide,
// audio stripped (-an) — muted autoplay is required by browsers anyway, and
// the brief asked for the audio gone regardless.
// Order: the booking-event reel leads (shows the product before the
// community stills); the second reel closes the loop after every still,
// right before it cycles back to the booking reel.
const DEFAULT_MEDIA: MediaItem[] = [
  {
    type: "video",
    sources: [
      { src: "/assets/hero/video-booking.mp4", type: "video/mp4" },
      { src: "/assets/hero/video-booking.webm", type: "video/webm" },
    ],
  },
  { type: "image", src: "/assets/hero/frame-1.jpg" },
  { type: "image", src: "/assets/hero/frame-2.jpg" },
  { type: "image", src: "/assets/hero/frame-3.jpg" },
  { type: "image", src: "/assets/hero/frame-4.jpg" },
  { type: "image", src: "/assets/hero/frame-5.jpg" },
  { type: "image", src: "/assets/hero/frame-6.jpg" },
  { type: "image", src: "/assets/hero/frame-7.jpg" },
  {
    type: "video",
    sources: [
      { src: "/assets/hero/video-2.mp4", type: "video/mp4" },
      { src: "/assets/hero/video-2.webm", type: "video/webm" },
    ],
  },
];

export function HeroFlipbook({
  media = DEFAULT_MEDIA,
  scrollDriven = false,
  className = "",
}: {
  media?: MediaItem[];
  /** Frame advances with scroll position instead of the RAF timer. Videos
   * are skipped in this mode (jumped over onto the next image) since a
   * scroll-position-driven video scrub isn't implemented. */
  scrollDriven?: boolean;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touchRevealed, setTouchRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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

  // Touch devices have no hover state, so the B&W→colour reveal (see
  // .site-photo in globals.css) instead triggers once the hero scrolls
  // into view. Pointer devices skip this and rely on the CSS :hover rule.
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTouchRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Preload every item before playback starts — no flicker/pop-in. Images
  // preload via Image(), videos via a detached <video> waiting for its
  // first frame of data.
  useEffect(() => {
    let cancelled = false;
    Promise.all(
      media.map(
        (item) =>
          new Promise<void>((resolve) => {
            if (item.type === "image") {
              const img = new window.Image();
              img.onload = () => resolve();
              img.onerror = () => resolve();
              img.src = item.src;
            } else {
              const video = document.createElement("video");
              video.onloadeddata = () => resolve();
              video.onerror = () => resolve();
              video.preload = "auto";
              video.src = item.sources[0].src;
              video.load();
            }
          }),
      ),
    ).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [media]);

  // requestAnimationFrame + time accumulator, not setInterval, so fps holds
  // steady regardless of tab throttling/jank. Self-pauses while the active
  // item is a video — that item advances the sequence itself (see the
  // `ended` listener below) instead of on the fixed image cadence.
  useEffect(() => {
    if (!loaded || reducedMotion || scrollDriven) return;

    const frameDuration = 1000 / FPS;

    const tick = (time: number) => {
      if (media[frameIndex]?.type === "video") {
        lastTimeRef.current = time;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      accumulatorRef.current += delta;

      while (accumulatorRef.current >= frameDuration) {
        accumulatorRef.current -= frameDuration;
        setFrameIndex((i) => (i + 1) % media.length);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      accumulatorRef.current = 0;
    };
  }, [loaded, reducedMotion, scrollDriven, frameIndex, media]);

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
      setFrameIndex(Math.min(media.length - 1, Math.floor(progress * media.length)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, reducedMotion, scrollDriven, media.length]);

  // Play only the active video; pause and rewind every other one so it's
  // ready to restart cleanly next time the loop reaches it.
  useEffect(() => {
    if (!loaded) return;
    media.forEach((item, i) => {
      const el = videoRefs.current[i];
      if (!el || item.type !== "video") return;
      if (i === frameIndex && !reducedMotion) {
        el.currentTime = 0;
        void el.play().catch(() => {});
      } else {
        el.pause();
      }
    });
  }, [frameIndex, loaded, reducedMotion, media]);

  // A video item advances the sequence itself once its clip ends, rather
  // than waiting on the fixed image timer.
  useEffect(() => {
    const activeItem = media[frameIndex];
    if (!loaded || reducedMotion || scrollDriven || activeItem?.type !== "video") return;
    const el = videoRefs.current[frameIndex];
    if (!el) return;
    const onEnded = () => setFrameIndex((i) => (i + 1) % media.length);
    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [frameIndex, loaded, reducedMotion, scrollDriven, media]);

  // prefers-reduced-motion shows a single static frame — the first image in
  // the sequence, since a video has no still frame to fall back to.
  const staticIndex = media.findIndex((item) => item.type === "image");
  const displayIndex = reducedMotion ? (staticIndex === -1 ? 0 : staticIndex) : frameIndex;

  return (
    <div
      ref={containerRef}
      className={`photo-hover-area relative h-full w-full overflow-hidden rounded-athlo-lg bg-athlo-bg-raised ${className}`.trim()}
      role="img"
      aria-label="Athlo Club community in motion"
    >
      {media.map((item, i) => {
        const isActive = loaded && i === displayIndex;
        // .flipbook-frame crossfades the opacity swap below — see globals.css.
        const sharedClassName = `site-photo flipbook-frame pointer-events-none absolute inset-0 h-full w-full object-cover ${
          touchRevealed ? "is-revealed" : ""
        }`.trim();
        const sharedStyle = { opacity: isActive ? 1 : 0 };

        if (item.type === "video") {
          return (
            <video
              key={item.sources[0].src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className={sharedClassName}
              style={sharedStyle}
            >
              {item.sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
          );
        }

        return (
          <img
            key={item.src}
            src={item.src}
            alt=""
            aria-hidden="true"
            // First frame is the LCP candidate — the hero renders above the fold.
            fetchPriority={i === 0 ? "high" : undefined}
            className={sharedClassName}
            style={sharedStyle}
          />
        );
      })}
    </div>
  );
}

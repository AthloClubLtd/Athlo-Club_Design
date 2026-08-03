"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Touch devices have no hover state, so the B&W→colour reveal (see the
 * .site-photo rules in globals.css) instead happens once per image, the
 * first time it scrolls into view. Pointer devices skip this entirely —
 * matchMedia bails out before the observer is ever created — and rely
 * purely on the CSS :hover rule.
 */
export function usePhotoReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, revealed };
}

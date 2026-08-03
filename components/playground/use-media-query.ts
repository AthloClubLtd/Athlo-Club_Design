"use client";

import { useEffect, useState } from "react";

/** Defaults to false (matches SSR, which has no window) so the client's
 * first render matches the server's before the effect below corrects it —
 * same pattern as the reduced-motion check in hero-flipbook.tsx. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

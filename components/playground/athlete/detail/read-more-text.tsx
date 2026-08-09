"use client";

import { useState } from "react";

export function ReadMoreText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <p className={`font-body text-athlo-body text-athlo-text-body ${expanded ? "" : "line-clamp-3"}`.trim()}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-[var(--space-2)] font-body text-athlo-label font-semibold text-athlo-lime"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

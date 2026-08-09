"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

const ITEMS = ["Share", "Copy link", "Report"];

export function MoreMenu({ onSelect }: { onSelect: (item: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More options"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-center gap-[var(--space-2)] rounded-athlo-md border border-athlo-line-strong bg-athlo-bg-overlay px-[var(--space-4)] font-body font-semibold text-athlo-text-primary transition-colors hover:border-athlo-text-secondary"
      >
        <MoreHorizontal size={16} aria-hidden="true" />
        More
      </button>
      {open && (
        <div
          role="menu"
          aria-label="More options"
          // Right-anchored, not left-anchored: this trigger is the
          // rightmost of three flex-1 buttons in the action row, so its own
          // width is only ~1/3 of the row — far narrower than this menu's
          // 160px min-width. Anchoring left-0 let the menu grow rightward
          // off the trigger, past the phone screen's right edge, where it
          // was silently clipped by the screen wrapper's overflow-hidden
          // (confirmed: menu rendered ~63px past the screen boundary).
          // right-0 grows it leftward instead, into the room the Reserve
          // and Contact buttons already prove is free.
          className="absolute bottom-full right-0 z-10 mb-[var(--space-2)] w-full min-w-[160px] overflow-hidden rounded-athlo-md border border-athlo-line-strong bg-athlo-bg-overlay shadow-athlo-pop"
        >
          {ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onSelect(item);
              }}
              className="flex min-h-[44px] w-full items-center px-[var(--space-4)] text-left font-body text-athlo-body text-athlo-text-primary hover:bg-athlo-bg-raised"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

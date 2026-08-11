"use client";

import { Dumbbell, Home, Search, User, Users } from "lucide-react";

const ITEMS = [
  { key: "home", label: "Home", icon: Home, disabled: false },
  { key: "discover", label: "Discover", icon: Search, disabled: false },
  { key: "train", label: "Train", icon: Dumbbell, disabled: true },
  { key: "clubs", label: "Clubs", icon: Users, disabled: false },
  { key: "me", label: "Me", icon: User, disabled: false },
] as const;

export type NavKey = (typeof ITEMS)[number]["key"];

export function BottomNav({
  active,
  onNavigate,
}: {
  active: NavKey;
  /** Home/Me have no screen to go to yet — tapping them is a harmless
   * no-op if the caller doesn't handle those keys, same as the existing
   * decorative header buttons (Calendar) elsewhere in the demo. */
  onNavigate: (key: NavKey) => void;
}) {
  return (
    <nav
      aria-label="Athlete"
      className="flex items-stretch justify-evenly gap-[var(--space-1)] border-t border-athlo-line-subtle bg-athlo-bg-raised px-[var(--space-3)]"
    >
      {ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            disabled={item.disabled}
            onClick={() => onNavigate(item.key)}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.disabled ? `${item.label} — coming soon` : item.label}
            className={`flex min-h-[44px] min-w-[44px] flex-1 flex-col items-center justify-center gap-[var(--space-1)] px-[var(--space-1)] py-[var(--space-3)] font-body text-athlo-label transition-colors ${
              item.disabled
                ? "cursor-not-allowed text-athlo-text-disabled"
                : isActive
                  ? "text-athlo-text-primary"
                  : "text-athlo-text-secondary hover:text-athlo-text-primary"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            <span className="leading-none">{item.label}</span>
            {item.disabled && <span className="leading-none text-athlo-text-disabled">Soon</span>}
          </button>
        );
      })}
    </nav>
  );
}

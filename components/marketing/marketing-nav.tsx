"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/discover", label: "Discover events" },
  { href: "/playground", label: "Playground" },
  { href: "/investors", label: "Investor enquiries" },
];

// Not the primary CTA — the hero owns that (brand law 2: one lime action per
// screen). This is the Secondary button treatment (bordered, no lime fill),
// which is as prominent as this can be without a second primary action.
function ClubLoginLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/login"
      className={`flex items-center gap-[var(--space-2)] rounded-athlo-md border border-athlo-line-strong px-[var(--space-4)] py-[var(--space-2)] font-body font-semibold text-athlo-text-primary transition-colors hover:border-athlo-text-secondary ${className}`.trim()}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M8 8a3 3 0 100-6 3 3 0 000 6zM2.5 14a5.5 5.5 0 0111 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Club login
    </Link>
  );
}

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-athlo-line-subtle bg-athlo-bg-base/70 backdrop-blur-[14px]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--container-wide)] items-center justify-between px-[var(--gutter)]">
        <Link href="/" className="flex items-center">
          <img src="/assets/athlo-club-logo.svg" alt="Athlo Club" className="h-6 w-auto" />
        </Link>

        <div className="hidden items-center gap-[var(--space-7)] md:flex">
          <nav className="flex items-center gap-[var(--space-7)]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-athlo-body font-medium text-athlo-text-secondary transition-colors hover:text-athlo-text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ClubLoginLink />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="marketing-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-athlo-sm text-athlo-text-primary md:hidden"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="marketing-mobile-menu"
          className="border-t border-athlo-line-subtle bg-athlo-bg-base px-[var(--gutter)] py-[var(--space-4)] md:hidden"
        >
          <ul className="flex flex-col gap-[var(--space-4)]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block font-body text-athlo-body-lg font-medium text-athlo-text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <ClubLoginLink className="w-fit" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

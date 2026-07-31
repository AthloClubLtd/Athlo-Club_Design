"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// TODO: replace with the real logo/monogram asset
const LOGO_LABEL = "ATHLO CLUB";

// TODO: replace with the real investor-enquiries Typeform URL
const INVESTOR_TYPEFORM_URL = "https://your-typeform-url.typeform.com/to/investors-placeholder";

const NAV_LINKS = [
  { label: "Discover events", href: "/discover", external: false },
  { label: "Playground", href: "/playground", external: false },
  { label: "Investor enquiries", href: INVESTOR_TYPEFORM_URL, external: true },
] as const;

const SCROLL_THRESHOLD = 40;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={containerRef}
      className={`fixed inset-x-0 top-0 z-50 h-17 transition-[background-color,backdrop-filter,border-color] duration-300 motion-reduce:transition-none ${
        scrolled
          ? "border-b border-line-subtle bg-surface-base/82 backdrop-blur-nav"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-container-wide items-center justify-between px-gutter">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-lime">
          {LOGO_LABEL}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-text text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="font-text text-sm font-medium text-ink-secondary transition-colors hover:text-ink-primary"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-ink-primary md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-[1.5px] w-full bg-current transition-transform duration-200 motion-reduce:transition-none ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-[1.5px] w-full bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-[1.5px] w-full bg-current transition-transform duration-200 motion-reduce:transition-none ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full origin-top border-b border-line-subtle bg-surface-raised shadow-pop transition-[opacity,transform] duration-200 motion-reduce:transition-none md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-gutter py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 font-text text-base font-medium text-ink-secondary transition-colors hover:text-ink-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 font-text text-base font-medium text-ink-secondary transition-colors hover:text-ink-primary"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

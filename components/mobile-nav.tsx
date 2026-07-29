"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AudienceToggle from "@/components/audience-toggle";

const links = [
  { href: "/discover", label: "Discover" },
  { href: "/for-organisers", label: "For Organisers" },
  { href: "/for-athletes", label: "For Athletes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const isSignedIn = status === "authenticated";

  return (
    <div className="md:hidden">
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white"
      >
        <span className="sr-only">Menu</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M2 4.5H16M2 9H16M2 13.5H16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 z-40 border-b border-white/10 bg-navy-800 px-6 pb-6 pt-2 shadow-xl">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-grey-100 hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <AudienceToggle />
            {isSignedIn ? (
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="rounded-full bg-lime px-4 py-2 text-center text-sm font-bold text-navy"
              >
                Go to dashboard
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-white/15 px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-lime px-4 py-2 text-center text-sm font-bold text-navy"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

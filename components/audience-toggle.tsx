"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Persistent pair of pills that let a visitor declare which side of the
 * marketplace they're on. Deep-links into the matching landing page and
 * highlights whichever one matches the current route.
 */
export default function AudienceToggle({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const isAthlete = pathname?.startsWith("/for-athletes");
  const isOrganiser = pathname?.startsWith("/for-organisers");

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-ink p-1 text-xs font-semibold ${className}`}
    >
      <Link
        href="/for-athletes"
        className={`rounded-full px-3 py-1.5 transition-colors ${
          isAthlete ? "bg-lime text-navy" : "text-grey-300 hover:text-white"
        }`}
      >
        I&rsquo;m an athlete
      </Link>
      <Link
        href="/for-organisers"
        className={`rounded-full px-3 py-1.5 transition-colors ${
          isOrganiser ? "bg-lime text-navy" : "text-grey-300 hover:text-white"
        }`}
      >
        I&rsquo;m an organiser
      </Link>
    </div>
  );
}

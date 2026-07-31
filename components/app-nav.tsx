"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/profile", label: "Profile" },
  { href: "/app/clubs", label: "Clubs" },
  { href: "/app/settings", label: "Settings" },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-white/5 bg-ink">
      <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-6">
        {links.map((link) => {
          const active =
            link.href === "/app" ? pathname === "/app" : pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap border-b-2 px-4 py-4 text-sm font-semibold transition-colors ${
                active
                  ? "border-lime text-white"
                  : "border-transparent text-grey-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

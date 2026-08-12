import Link from "next/link";
import MobileNav from "@/components/mobile-nav";
import NavAuthActions from "@/components/nav-auth-actions";

const links = [{ href: "/discover", label: "Discover" }];

export default function Nav() {
  return (
    <header className="relative z-50 border-b border-white/5 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <img src="/assets/athlo-club-logo.svg" alt="Athlo Club" className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-grey-300 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <NavAuthActions />
        </div>

        <MobileNav />
      </div>
    </header>
  );
}

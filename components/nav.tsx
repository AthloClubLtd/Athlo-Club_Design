import Link from "next/link";
import { getCurrentSession } from "@/lib/session";
import AudienceToggle from "@/components/audience-toggle";
import MobileNav from "@/components/mobile-nav";

const links = [
  { href: "/discover", label: "Discover" },
  { href: "/for-organisers", label: "For Organisers" },
  { href: "/for-athletes", label: "For Athletes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default async function Nav() {
  const session = await getCurrentSession();

  return (
    <header className="relative z-50 border-b border-white/5 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-lime text-navy">
            A
          </span>
          Athlo Club
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
          <AudienceToggle />
          {session ? (
            <Link
              href="/app"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-lime text-sm font-bold text-navy"
              title={session.name ?? "Your account"}
            >
              {(session.name ?? "A").slice(0, 1).toUpperCase()}
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-white hover:text-lime">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-lime-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        <MobileNav isSignedIn={Boolean(session)} />
      </div>
    </header>
  );
}

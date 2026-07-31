import Link from "next/link";

const columns: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { href: "/discover", label: "Discover" },
      { href: "/for-organisers", label: "For Organisers" },
      { href: "/for-athletes", label: "For Athletes" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/investors", label: "Investors" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center">
              <img src="/assets/athlo-club-logo.svg" alt="Athlo Club" className="h-6 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-grey-400">
              The platform for strength sports — discover, compete, and run
              events across weightlifting, powerlifting, CrossFit and fitness
              racing.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-grey-400 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-wide text-grey-300">
            Weightlifting &middot; Powerlifting &middot; CrossFit &middot; Fitness Racing
          </p>
          <p className="text-xs text-grey-400">
            &copy; {new Date().getFullYear()} Athlo Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

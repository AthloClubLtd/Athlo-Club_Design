import Link from "next/link";

const PRODUCT_LINKS = [
  { label: "Discover events", href: "/discover" },
  { label: "Playground", href: "/playground" },
  { label: "Join as a club", href: "/join" },
  { label: "Investor enquiries", href: "/investors" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-subtle">
      <div className="mx-auto max-w-container-wide px-gutter py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link
              href="/"
              className="font-display text-lg font-bold tracking-tight text-lime"
            >
              ATHLO CLUB
            </Link>
            <p className="mt-4 font-text text-sm text-ink-secondary">
              The platform for the strength sport community.
            </p>
          </div>

          <div className="flex flex-wrap gap-12">
            <div>
              <p className="font-display text-label font-semibold uppercase tracking-label text-ink-secondary">
                Product
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-text text-sm text-ink-body transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-label font-semibold uppercase tracking-label text-ink-secondary">
                Legal
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-text text-sm text-ink-body transition-colors hover:text-ink-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TODO: social links (Instagram/LinkedIn/etc.) — URLs not yet supplied */}
        </div>

        <div className="mt-12 border-t border-line-subtle pt-6">
          <p className="font-text text-xs text-ink-disabled">
            &copy; {year} Athlo Club Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}

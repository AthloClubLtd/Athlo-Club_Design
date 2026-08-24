import Link from "next/link";
import { AthloClubWordmark } from "@/components/marketing/ui/athlo-club-wordmark";

const navLinks = [
  { href: "/discover", label: "Discover events" },
  { href: "https://form.typeform.com/to/G77nDjXy", label: "Investor enquiries" },
  { href: "/athlete-login", label: "Athlete login" },
];

const PRIVACY_TERMS_URL =
  "https://docs.google.com/document/d/1fRDzu2UD_xLP2-WESJNsW8TMHP8-R7XhqCUvdTpF_pI/edit?usp=sharing";

const legalLinks = [
  { href: PRIVACY_TERMS_URL, label: "Privacy" },
  { href: PRIVACY_TERMS_URL, label: "Terms" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/athlo-club/",
    label: "Athlo Club on LinkedIn",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.5V23H.24V8.25zM8.25 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.98c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.69 1.82-2.69 3.7V23h-4.5V8.25z",
  },
  {
    href: "https://www.instagram.com/athloclubuk/",
    label: "Athlo Club on Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.35 3.86 3.87 2.31 7.15 2.16 8.42 2.1 8.8 2.16 12 2.16zm0-1.85c-3.26 0-3.67.01-4.95.07C2.36.42.4 2.36.22 7.05.16 8.33.15 8.74.15 12s.01 3.67.07 4.95c.18 4.69 2.12 6.65 6.83 6.83 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.7-.18 6.65-2.12 6.83-6.83.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.18-4.69-2.12-6.65-6.83-6.83C15.67.31 15.26.3 12 .3zM12 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.4-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z",
  },
];

/** External destinations (Typeform, Google Docs) open in a new tab; internal
 * routes use next/link — same distinction as marketing-nav.tsx's NavLink. */
function FooterLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function MarketingFooter() {
  return (
    <footer className="border-t border-athlo-line-subtle">
      <div className="mx-auto max-w-[var(--container-wide)] px-[var(--gutter)] py-[var(--space-9)]">
        <div className="flex flex-col gap-[var(--space-7)] sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* Wordmark reads "ATHLO" only here too, matching the header —
                body copy elsewhere on the site still says "Athlo Club". */}
            <AthloClubWordmark href="/" showClub={false} />
            <p className="mt-[var(--space-3)] font-body text-athlo-body text-athlo-text-secondary">
              The home of strength sport.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-[var(--space-3)] sm:flex-row sm:gap-[var(--space-6)]">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink
                    href={l.href}
                    className="font-body text-athlo-body text-athlo-text-secondary transition-colors hover:text-athlo-text-primary"
                  >
                    {l.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[var(--space-4)]">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-athlo-pill border border-athlo-line-strong text-athlo-text-secondary transition-colors hover:border-athlo-text-secondary hover:text-athlo-text-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-3)] border-t border-athlo-line-subtle pt-[var(--space-6)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-[var(--space-5)]">
            {legalLinks.map((l) => (
              <FooterLink
                key={l.label}
                href={l.href}
                className="font-body text-athlo-label text-athlo-text-disabled transition-colors hover:text-athlo-text-secondary"
              >
                {l.label}
              </FooterLink>
            ))}
            <a
              href="mailto:swathi@athloclub.com"
              className="font-body text-athlo-label text-athlo-text-disabled transition-colors hover:text-athlo-text-secondary"
            >
              swathi@athloclub.com
            </a>
          </div>
          <p className="font-body text-athlo-label text-athlo-text-disabled">
            &copy; {new Date().getFullYear()} Athlo Club
          </p>
        </div>
      </div>
    </footer>
  );
}

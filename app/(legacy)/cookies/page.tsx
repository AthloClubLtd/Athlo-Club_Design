import type { Metadata } from "next";
import LegalLayout from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Cookie Policy — Athlo Club",
  description: "How Athlo Club uses cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" effectiveDate="1 January 2026">
      <p className="text-sm text-grey-400">
        This is a structured placeholder cookie policy for the Athlo Club
        scaffold. It should be reviewed by qualified legal counsel before the
        platform launches to real users.
      </p>

      <section>
        <h2 className="text-xl font-bold text-white">1. What cookies are</h2>
        <p className="mt-3">
          Cookies are small text files stored on your device that let a
          website remember information about your visit, such as your
          session or preferences.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">2. Cookies we use</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong className="text-white">Strictly necessary:</strong> used
            to keep you signed in and to secure your session (for example,
            Auth.js session cookies).
          </li>
          <li>
            <strong className="text-white">Functional:</strong> remember
            preferences such as filters used on the Discover page.
          </li>
          <li>
            <strong className="text-white">Analytics:</strong> help us
            understand how the platform is used so we can improve it.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">3. Payment processing</h2>
        <p className="mt-3">
          Our payment processor, Stripe, may set its own cookies when you
          make a purchase, governed by Stripe&rsquo;s own privacy and cookie
          policies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">4. Managing cookies</h2>
        <p className="mt-3">
          You can control or delete cookies through your browser settings.
          Blocking strictly necessary cookies may prevent you from signing
          in or completing a purchase.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">5. Contact</h2>
        <p className="mt-3">
          Questions about this policy can be sent to{" "}
          <a href="mailto:privacy@athloclub.com" className="text-lime underline">
            privacy@athloclub.com
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}

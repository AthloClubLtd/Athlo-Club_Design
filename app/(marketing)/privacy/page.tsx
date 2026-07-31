import type { Metadata } from "next";
import LegalLayout from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — Athlo Club",
  description: "How Athlo Club collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" effectiveDate="1 January 2026">
      <p className="text-sm text-grey-400">
        This is a structured placeholder policy for the Athlo Club scaffold.
        It should be reviewed by qualified legal counsel before the platform
        handles real user data in production.
      </p>

      <section>
        <h2 className="text-xl font-bold text-white">1. Who we are</h2>
        <p className="mt-3">
          Athlo Club (&ldquo;Athlo&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          operates a platform connecting athletes, clubs and organisers
          across weightlifting, powerlifting, CrossFit and fitness racing.
          This policy explains what personal data we collect, why, and what
          rights you have over it.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">2. Data we collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Account data: name, email address, handle, and password or OAuth identifiers.</li>
          <li>Profile data: bio, location, sports, personal records, and competition history.</li>
          <li>Club and event data: memberships, roles, and affiliation requests.</li>
          <li>Transaction data: ticket and entry purchases, processed by our payment provider (Stripe).</li>
          <li>Usage data: pages viewed, device and browser information, collected for analytics and security.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">3. How we use your data</h2>
        <p className="mt-3">
          We use personal data to operate your account, process event and
          competition registrations, facilitate payments between athletes and
          organisers, maintain your competition history, communicate with you
          about your account and events, and improve the platform.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">4. Sharing your data</h2>
        <p className="mt-3">
          We share data with the club or organiser of an event you register
          for (to the extent necessary to run that event), with Stripe to
          process payments, and with service providers who support our
          infrastructure. We do not sell personal data to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">5. Data retention</h2>
        <p className="mt-3">
          We retain account and competition history data for as long as your
          account is active, and for a reasonable period afterwards to
          satisfy legal, tax and record-keeping obligations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">6. Your rights</h2>
        <p className="mt-3">
          Depending on your jurisdiction, you may have the right to access,
          correct, export or delete your personal data. You can manage most
          of this directly from your account settings, or by contacting us.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">7. Contact</h2>
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

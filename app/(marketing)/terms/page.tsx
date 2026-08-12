import type { Metadata } from "next";
import LegalLayout from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms of Service — Athlo Club",
  description: "The terms governing use of the Athlo Club platform.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" effectiveDate="1 January 2026">
      <p className="text-sm text-grey-400">
        This is a structured placeholder terms of service for the Athlo Club
        scaffold. It should be reviewed by qualified legal counsel before the
        platform launches to real users.
      </p>

      <section>
        <h2 className="text-xl font-bold text-white">1. Acceptance of terms</h2>
        <p className="mt-3">
          By creating an account or using Athlo Club, you agree to these
          Terms of Service. If you are using Athlo on behalf of a club or
          organisation, you confirm you have authority to bind that
          organisation to these terms.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">2. Accounts</h2>
        <p className="mt-3">
          You must provide accurate information when creating an account and
          keep your credentials secure. You are responsible for activity
          that occurs under your account.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">3. Organisers and clubs</h2>
        <p className="mt-3">
          Clubs and organisers using Athlo to sell event tickets or
          competition entries must onboard a connected payment account via
          our payment processor. Athlo deducts an application fee from each
          transaction (4% per event ticket; 4% + £1.50 per competition entry).
          Federation-type clubs may approve affiliation requests from other
          clubs; this creates no agency or employment relationship between
          Athlo and any club.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">4. Athletes</h2>
        <p className="mt-3">
          Athlete accounts are free. An optional premium subscription
          (currently £9.99/month) provides additional features described on
          our Pricing page. Athlo is not a party to, and does not guarantee
          the safety of, any physical event listed on the platform —
          responsibility for event safety and conduct rests with the
          organising club.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">5. Payments and refunds</h2>
        <p className="mt-3">
          Payments are processed by Stripe. Refund policies for tickets and
          competition entries are set by the organising club, subject to
          applicable consumer protection law.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">6. Prohibited conduct</h2>
        <p className="mt-3">
          You may not use Athlo to list fraudulent events, misrepresent
          affiliation or sanctioning status, or interfere with the
          platform&rsquo;s operation or security.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">7. Termination</h2>
        <p className="mt-3">
          We may suspend or terminate accounts that violate these terms. You
          may close your account at any time from account settings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">8. Limitation of liability</h2>
        <p className="mt-3">
          Athlo Club is provided &ldquo;as is&rdquo;. To the maximum extent
          permitted by law, Athlo is not liable for indirect or
          consequential losses arising from your use of the platform or
          attendance at any listed event.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white">9. Contact</h2>
        <p className="mt-3">
          Questions about these terms can be sent to{" "}
          <a href="mailto:legal@athloclub.com" className="text-lime underline">
            legal@athloclub.com
          </a>
          .
        </p>
      </section>
    </LegalLayout>
  );
}

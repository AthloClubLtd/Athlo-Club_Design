const JOIN_TYPEFORM_URL = "https://form.typeform.com/to/oX65OdeW?utm_content=xxxxx";

export function LimeCTABand() {
  return (
    <section className="bg-athlo-lime px-[var(--gutter)] py-[var(--space-9)] text-center">
      <h2 className="font-display text-athlo-h2 font-bold uppercase tracking-[var(--tracking-heading)] text-athlo-text-on-lime sm:text-athlo-h1">
        Build your strength community
      </h2>
      {/* Sub-line uses --color-text-on-lime at full strength, same as the
          headline — a muted/grey tone here would fail AA against the lime
          band (see commit message for the measured ratio). */}
      <p className="mx-auto mt-[var(--space-4)] max-w-xl font-body text-athlo-body-lg text-athlo-text-on-lime">
        Whether you&apos;re a brand, a social club just for fun, or a gym — set up your
        community in minutes.
      </p>
      <div className="mt-[var(--space-7)]">
        <a
          href={JOIN_TYPEFORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center rounded-athlo-md bg-athlo-bg-base px-[var(--space-6)] py-[var(--space-3)] font-body font-semibold text-athlo-lime transition-transform hover:-translate-y-px"
        >
          Join the waitlist
        </a>
      </div>
    </section>
  );
}

export default function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-20 sm:pt-28">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-grey-400">Effective date: {effectiveDate}</p>
      <div className="prose-legal mt-10 space-y-8 text-grey-300">{children}</div>
    </div>
  );
}

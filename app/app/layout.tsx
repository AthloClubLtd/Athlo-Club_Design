import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import AppNav from "@/components/app-nav";

export default async function AppSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  return (
    <div>
      <AppNav />
      <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
    </div>
  );
}

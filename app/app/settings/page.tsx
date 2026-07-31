import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { signOut } from "@/auth";
import PremiumUpgradeButton from "@/components/premium-upgrade-button";

export default async function SettingsPage() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");

  const athlete = await prisma.athlete.findUnique({ where: { id: session.athleteId } });
  if (!athlete) redirect("/login");

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-lime">Settings</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Account</h1>

      <div className="mt-8 rounded-2xl border border-white/10 bg-navy-800 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-grey-400">Email</p>
        <p className="mt-2 text-white">{athlete.email}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-grey-400">Role</p>
        <p className="mt-2 text-white">{athlete.role}</p>
      </div>

      <div className="mt-8 rounded-2xl border border-lime/40 bg-navy-800 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-lime">Premium</p>
        <p className="mt-2 text-2xl font-extrabold tracking-tight">
          {athlete.premiumStatus === "ACTIVE" ? "You're a premium member" : "Manage premium"}
        </p>
        <p className="mt-2 text-grey-400">
          Current status: <span className="font-semibold text-white">{athlete.premiumStatus}</span>
        </p>
        {athlete.premiumStatus !== "ACTIVE" && (
          <div className="mt-6">
            <PremiumUpgradeButton />
          </div>
        )}
      </div>

      <form action={signOutAction} className="mt-8">
        <button
          type="submit"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}

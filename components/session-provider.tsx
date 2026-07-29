"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Client-side session context, used so the shared Nav (rendered from the
 * root layout on every route, including statically generated marketing
 * pages) can show signed-in state without forcing those pages to become
 * dynamic. `useSession()` fetches `/api/auth/session` client-side after
 * hydration instead of reading cookies during server rendering.
 */
export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

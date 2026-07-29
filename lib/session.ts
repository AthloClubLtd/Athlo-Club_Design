import { auth } from "@/auth";

/**
 * Session helper used by shared layout components (Nav, etc) and server
 * actions across `/app`. Wraps Auth.js's `auth()` so call sites don't need
 * to import from the root `auth.ts` directly.
 */
export type CurrentSession = {
  athleteId: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "ATHLETE" | "ADMIN";
} | null;

export async function getCurrentSession(): Promise<CurrentSession> {
  const session = await auth();
  if (!session?.user) return null;
  return {
    athleteId: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    role: session.user.role,
  };
}

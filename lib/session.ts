/**
 * Session helper used by shared layout components (Nav, etc).
 *
 * Step 1 stub: always returns null (signed-out). Step 5 replaces the
 * implementation with a call into Auth.js's `auth()` so the same
 * `getCurrentSession()` call site starts returning real sessions without
 * any changes needed in the components that consume it.
 */
export type CurrentSession = {
  athleteId: string;
  name: string | null;
  email: string | null;
  image: string | null;
} | null;

export async function getCurrentSession(): Promise<CurrentSession> {
  return null;
}

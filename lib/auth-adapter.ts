import type { Adapter, AdapterUser } from "next-auth/adapters";
import { prisma } from "@/lib/prisma";

/**
 * Custom Auth.js adapter for Athlo Club.
 *
 * The off-the-shelf `@auth/prisma-adapter` assumes a `User` model with a
 * `userId` foreign key on `Account`/`Session`. Our schema (Step 4) instead
 * treats `Athlete` as the user-equivalent model, with `Account`/`Session`
 * pointing at it via `athleteId` — Athlete already carries every field an
 * Auth.js session needs (id, email, name, avatarUrl) plus the athlete-
 * specific fields (handle, sports, role, premiumStatus). Rather than
 * force our domain model to match the adapter's default shape, this file
 * implements the small `Adapter` interface directly against `athleteId`.
 *
 * Note: `Athlete` has no `emailVerified` column (it isn't part of the
 * authoritative Step 4 schema), so this adapter always reports it as
 * `null` and ignores writes to it. That's an acceptable simplification for
 * this scaffold — it only affects Auth.js's internal "is this email
 * already verified" check used for OAuth/email account-linking safety, not
 * whether sign-in works.
 */

function toAdapterUser(athlete: {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}): AdapterUser {
  return {
    id: athlete.id,
    email: athlete.email,
    name: athlete.name,
    image: athlete.avatarUrl,
    emailVerified: null,
  };
}

function handleFromEmail(email: string): string {
  const base = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base}-${suffix}`;
}

export function AthloPrismaAdapter(): Adapter {
  return {
    async createUser(user) {
      const athlete = await prisma.athlete.create({
        data: {
          email: user.email!,
          name: user.name ?? user.email!.split("@")[0],
          avatarUrl: user.image ?? null,
          handle: handleFromEmail(user.email!),
        },
      });
      return toAdapterUser(athlete);
    },

    async getUser(id) {
      const athlete = await prisma.athlete.findUnique({ where: { id } });
      return athlete ? toAdapterUser(athlete) : null;
    },

    async getUserByEmail(email) {
      const athlete = await prisma.athlete.findUnique({ where: { email } });
      return athlete ? toAdapterUser(athlete) : null;
    },

    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { athlete: true },
      });
      return account ? toAdapterUser(account.athlete) : null;
    },

    async updateUser(user) {
      const athlete = await prisma.athlete.update({
        where: { id: user.id },
        data: {
          ...(user.email ? { email: user.email } : {}),
          ...(user.name ? { name: user.name } : {}),
          ...(user.image !== undefined ? { avatarUrl: user.image } : {}),
        },
      });
      return toAdapterUser(athlete);
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          athleteId: account.userId,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state as string | undefined,
        },
      });
    },

    async createSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.create({
        data: { sessionToken, athleteId: userId, expires },
      });
      return { sessionToken: session.sessionToken, userId: session.athleteId, expires: session.expires };
    },

    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: { sessionToken },
        include: { athlete: true },
      });
      if (!session) return null;
      return {
        session: {
          sessionToken: session.sessionToken,
          userId: session.athleteId,
          expires: session.expires,
        },
        user: toAdapterUser(session.athlete),
      };
    },

    async updateSession({ sessionToken, expires }) {
      const session = await prisma.session.update({
        where: { sessionToken },
        data: { ...(expires ? { expires } : {}) },
      });
      return { sessionToken: session.sessionToken, userId: session.athleteId, expires: session.expires };
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({ where: { sessionToken } }).catch(() => null);
    },

    async createVerificationToken(verificationToken) {
      const token = await prisma.verificationToken.create({ data: verificationToken });
      return { identifier: token.identifier, token: token.token, expires: token.expires };
    },

    async useVerificationToken({ identifier, token }) {
      try {
        const verificationToken = await prisma.verificationToken.delete({
          where: { identifier_token: { identifier, token } },
        });
        return verificationToken;
      } catch {
        return null;
      }
    },
  };
}

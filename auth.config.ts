import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe Auth.js config, shared between `middleware.ts` (which runs on
 * the Edge runtime) and the full `auth.ts` config (which runs on Node and
 * adds the Prisma adapter + providers). Keep this file free of anything
 * that pulls in Node-only APIs — no Prisma client, no `nodemailer` — since
 * both have dependencies the Edge runtime can't execute.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  providers: [],
} satisfies NextAuthConfig;

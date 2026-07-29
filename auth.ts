import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import { authConfig } from "./auth.config";
import { AthloPrismaAdapter } from "@/lib/auth-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: AthloPrismaAdapter(),
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Only registered when EMAIL_SERVER is configured — Nodemailer's
    // provider factory validates its `server` option eagerly, so passing
    // an empty string throws at startup rather than only when someone
    // actually tries to sign in with it.
    ...(process.env.EMAIL_SERVER
      ? [
          Nodemailer({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM ?? "Athlo Club <no-reply@athloclub.com>",
          }),
        ]
      : []),
  ],
  callbacks: {
    async session({ session, user }) {
      const athlete = await prisma.athlete.findUnique({
        where: { id: user.id },
        select: { id: true, role: true },
      });
      if (session.user) {
        session.user.id = user.id;
        session.user.role = athlete?.role ?? "ATHLETE";
      }
      return session;
    },
  },
});

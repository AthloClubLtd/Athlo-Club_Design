import type { AthleteRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: AthleteRole;
    } & DefaultSession["user"];
  }
}

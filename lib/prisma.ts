import { PrismaClient } from "@prisma/client";

// Standard Next.js dev hot-reload safe singleton: without this, every hot
// reload in dev would create a brand new PrismaClient (and a brand new pool
// of database connections) since Next.js doesn't clear the module cache for
// the same reason a normal Node process wouldn't.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

import { z } from "zod";

export const envSchema = z.object({
  dbUrl: z.string(),
  dbAuthToken: z.string().optional(),
  authSecret: z.string(),
  jwtSecret: z.string(),
});

export const env = envSchema.parse({
  dbUrl: process.env.TURSO_DATABASE_URL || "",
  dbAuthToken: process.env.TURSO_AUTH_TOKEN,
  authSecret: process.env.BETTER_AUTH_SECRET || "",
  jwtSecret: process.env.JWT_SECRET || "",
});

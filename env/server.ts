import { z } from "zod";

export const envSchema = z.object({
  dbUrl: z.string(),
  emailUser: z.string(),
  emailPass: z.string(),
  authToken: z.string(),
});

export const env = envSchema.parse({
  dbUrl: process.env.DATABASE_URL || "",
  emailUser: process.env.MAIL_EMAIL || "",
  emailPass: process.env.MAIL_PASS || "",
  authToken: process.env.AUTH_TOKEN || "",
});

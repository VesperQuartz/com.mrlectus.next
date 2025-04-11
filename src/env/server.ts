import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  MAIL_EMAIL: z.string().optional(),
  MAIL_PASS: z.string().optional(),
});

export const env = envSchema.parse(process.env);

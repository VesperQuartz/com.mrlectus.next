import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  MAIL_EMAIL: z.string().optional(),
  MAIL_PASS: z.string().optional(),
  OLLAMA_MODEL: z.string().default("llama3"),
  OLLAMA_HOST: z.string().optional(),
});

export const env = envSchema.parse(process.env);

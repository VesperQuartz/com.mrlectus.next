import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
});

// Next.js only inlines individual `process.env.NEXT_PUBLIC_*` member accesses in
// client bundles — passing the whole `process.env` object yields `{}` in the
// browser. Read the values explicitly so they survive bundling.
export const env = envSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
});

import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const dbEnvSchema = z.object({
  TURSO_DATABASE_URL: z.string({
    required_error: "TURSO_DATABASE_URL is required",
    invalid_type_error: "TURSO_DATABASE_URL must be a string",
  }),
  TURSO_AUTH_TOKEN: z.string({
    required_error: "TURSO_AUTH_TOKEN is required",
    message: "TURSO_AUTH_TOKEN must be a string",
    invalid_type_error: "TURSO_AUTH_TOKEN must be a string",
  }),
});

const dbEnv = dbEnvSchema.parse(process.env);

export default defineConfig({
  out: "./drizzle",
  schema: "./repo/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: dbEnv.TURSO_DATABASE_URL,
    authToken: dbEnv.TURSO_AUTH_TOKEN,
  },
});

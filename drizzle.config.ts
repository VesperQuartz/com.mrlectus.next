import { env } from "@/env/server";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./src/app/repo/schema",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.AUTH_TOKEN,
  },
});

import "dotenv/config";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { env } from "@/env/server";
import { authRelations } from "@/repo/schema/auth.schema";

neonConfig.webSocketConstructor = ws;

const sql = new Pool({
  connectionString: String(env.DATABASE_URL),
});

export const db = drizzle({
  connection: {
    connectionString: String(env.DATABASE_URL),
  },
  client: sql,
  logger: true,
  relations: {
    ...authRelations,
  },
});

export type Db = typeof db;

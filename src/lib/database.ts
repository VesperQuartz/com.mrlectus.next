import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "@/env/server";
import * as authschema from "@/repo/schema/auth.schema";
import * as schema from "@/repo/schema/schema";

const client = createClient({
  url: env.dbUrl,
  authToken: env.authToken,
});

export const db = drizzle({
  client,
  logger: true,
  schema: { ...authschema, ...schema },
});

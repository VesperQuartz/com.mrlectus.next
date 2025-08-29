import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env/client";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: env.baseUrl,
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()],
});

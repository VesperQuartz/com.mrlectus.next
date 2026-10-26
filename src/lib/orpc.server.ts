import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";
import router from "./orpc/router";

globalThis.$client = createRouterClient(router, {
  context: async () => ({
    headers: await headers(), // provide headers if initial context required
  }),
});

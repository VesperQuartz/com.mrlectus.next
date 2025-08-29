import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/env/client";

export const client = hc<AppType>(env.baseUrl, {
  init: {
    credentials: "include",
  },
});

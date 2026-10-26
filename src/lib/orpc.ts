import { createORPCClient, StandardUrl } from "@orpc/client";
import type { RouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import router from "@/lib/orpc/router";
import {
  BatchLinkPlugin,
  RequestCompressionLinkPlugin,
  ResponseCompressionLinkPlugin,
} from "@orpc/client/plugins";
import { OpenAPILink } from "@orpc/openapi/fetch";
import { SmartCoercionLinkPlugin } from "@orpc/json-schema";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
interface ClientContext {
  cache?: RequestCache;
}
console.log("SSR is", import.meta.env.SSR);

// if (import.meta.env.SSR) {
//   await import("./orpc.server");
// }

declare global {
  var $client: RouterClient<typeof router> | undefined;
}

const link = new OpenAPILink<ClientContext>(router, {
  plugins: [
    new RequestCompressionLinkPlugin(),
    new ResponseCompressionLinkPlugin(),
    new SmartCoercionLinkPlugin(router, {
      converters: [new ZodToJsonSchemaConverter()],
    }),

    new BatchLinkPlugin({
      groups: [
        {
          condition: ({ context }) => context?.cache === "force-cache",
          context: {
            cache: "force-cache",
          },
        },
        {
          condition: () => true,
          context: {},
        },
      ],
    }),
  ],
  fetch: (url, init, { context }) =>
    globalThis.fetch(url, {
      ...init,
      cache: context?.cache,
    }),
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("RPCLink is not allowed on the server side.");
    }
    return `${window.location.origin}/api/rpc` as StandardUrl;
  },
  headers: async () => {
    if (typeof window !== "undefined") {
      return {};
    }

    const { headers } = await import("next/headers");
    return await headers();
  },
  origin: () => {
    if (typeof window === "undefined") {
      throw new Error("This link is not allowed on the server side.");
    }
    return window.location.origin;
  },
});

/**
 * Fallback to client-side client if server-side client is not available.
 */
export const client: RouterClient<typeof router> = globalThis.$client ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(client, {
  experimental_defaults: {},
});

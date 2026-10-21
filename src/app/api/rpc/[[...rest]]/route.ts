import {
  BatchHandlerPlugin,
  CORSPlugin,
  GetMethodCsrfProtectionHandlerPlugin,
  RequestCompressionHandlerPlugin,
  ResponseCompressionHandlerPlugin,
} from "@orpc/server/plugins";
import { headers } from "next/headers";
import router from "@/lib/orpc/router";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { onError } from "@orpc/server";
import { OpenAPIGenerator } from "@orpc/openapi";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { OpenAPIReferenceHandlerPlugin } from "@orpc/openapi/plugins";
import { SmartCoercionHandlerPlugin } from "@orpc/json-schema";

const generator = new OpenAPIGenerator({
  converters: [new ZodToJsonSchemaConverter()],
});

const handler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
  plugins: [
    new CORSPlugin({
      origin: (origin) => origin,
      exposeHeaders: ["Content-Disposition", "Standard-Server"],
      allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    }),
    new SmartCoercionHandlerPlugin({
      converters: [new ZodToJsonSchemaConverter()],
    }),
    new RequestCompressionHandlerPlugin(),
    new BatchHandlerPlugin(),
    new ResponseCompressionHandlerPlugin(),
    new GetMethodCsrfProtectionHandlerPlugin(),
    new OpenAPIReferenceHandlerPlugin({
      spec: () =>
        generator.generate(router, {
          base: {
            info: {
              title: "ORPC Playground",
              version: "1.0.0",
            },
            servers: [{ url: "" }],
          },
        }),
    }),
  ],
});

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context: {
      headers: await headers(),
    }, // Provide initial context if needed
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;

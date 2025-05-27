import { zValidator } from "@hono/zod-validator";
import { requestId } from "hono/request-id";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { Hono } from "hono";
import { csrf } from "hono/csrf";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { handle } from "hono/vercel";
import { z } from "zod";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.use(logger());
app.use(secureHeaders());
app.use(poweredBy());
app.use(csrf({ origin: ["localhost:3000", "127.0.0.1:3000"] }));
app.use(prettyJSON()); // With options: prettyJSON({ space: 4 })
app.use("*", requestId());

app.use("/tests/*", (c, next) => {
  const env = z.object({
    JWT_SECRET: z.string(),
  });
  const key = env.parse(process.env);
  const jwtMiddleware = jwt({
    secret: key.JWT_SECRET,
  });
  return jwtMiddleware(c, next);
});

app.get("/tests", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.post(
  "/tests",
  zValidator(
    "json",
    z.object({
      name: z.string(),
    }),
  ),
  (c) => {
    const { name } = c.req.valid("json");
    return c.json({
      message: `Hello ${name}!`,
    });
  },
);

export const GET = handle(app);
export const POST = handle(app);

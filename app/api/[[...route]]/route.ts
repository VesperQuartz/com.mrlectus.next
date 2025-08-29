import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";
import { prettyJSON } from "hono/pretty-json";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { handle } from "hono/vercel";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { todo } from "@/routes/api/todo";
import { factory } from "@/routes/factory";

export const runtime = "nodejs";

const app = factory.createApp().basePath("/api");

app.use(logger());
app.use(secureHeaders());
app.use(poweredBy());
app.use(prettyJSON()); // With options: prettyJSON({ space: 4 })
app.use("*", requestId());

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log("Sesssion", session);

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.get("healthcheck", async (ctx) => {
  return ctx.json({ status: "ok" });
});

const routes = app.route("/", todo);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export type AppType = typeof routes;

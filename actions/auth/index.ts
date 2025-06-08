"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { to } from "await-to-ts";
import { redirect } from "next/navigation";

export const signUp = async (_prev: unknown, form: FormData) => {
  const { email, password } = Object.fromEntries(form.entries());
  const [error] = await to(
    auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: String(email),
        password: String(password),
        callbackURL: "/",
        rememberMe: true,
      },
    }),
  );
  if (error) {
    return error.message;
  }
  return redirect("/");
};

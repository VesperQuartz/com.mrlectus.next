"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { to } from "await-to-ts";

export const signUp = async (_prev: unknown, form: FormData) => {
  const { username, email, password } = Object.fromEntries(form.entries());
  const [error, data] = await to(
    auth.api.signUpEmail({
      headers: await headers(),
      body: {
        email: String(email),
        password: String(password),
        name: String(username),
        callbackURL: "/",
      },
    }),
  );
  if (error) {
    return error.message;
  }
  return data;
};

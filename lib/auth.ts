import { betterAuth } from "better-auth";
import { db } from "./database";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  rateLimit: {
    window: 10,
    max: 100,
    enabled: true,
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      console.log({ user, url, token });
    },
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
});

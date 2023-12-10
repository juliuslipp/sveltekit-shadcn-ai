import GoogleProvider from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { SvelteKitAuth, type SvelteKitAuthConfig } from "@auth/sveltekit";
import { redirect } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { building } from "$app/environment";
import * as env from "$env/static/private";
import { db } from "$server/db";
import { sqliteTable } from "$server/db/schema";
import { sendSvelteEmail } from "$server/email";

import MagicLoginEmail from "./emails/magic-link-email.svelte";
import { siteConfig } from "./lib/config/site";
import { CONSTANTS } from "./lib/constants";

process.env.AUTH_URL = env.NEXT_PUBLIC_VERCEL_URL ?? env.AUTH_URL;

const authConfig: SvelteKitAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {
      id: "email",
      type: "email",
      async sendVerificationRequest({ url, identifier, expires }) {
        await sendSvelteEmail({
          from: `svelte-app-starter <${env.EMAILS_FROM}>`,
          to: [identifier],
          subject: "Magic Sign in Link - svelte-app-starter",
          svelteEmail: {
            email: MagicLoginEmail,
            props: {
              magicLink: url,
              expires,
            },
          },
        });
      },
    },
  ],
  adapter: DrizzleAdapter(db, sqliteTable),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        name: user.name,
      },
    }),
  },
  trustHost: true,
  pages: {
    signOut: "/auth/sign-out",
    signIn: "/auth/sign-in",
    error: "/auth/auth-error",
    verifyRequest: "/auth/verify-req",
  },
};

async function authHandle({ event, resolve }) {
  if (building) {
    return resolve(event);
  }

  const session = event.locals.session;
  const { pathname, searchParams } = event.url;
  if (CONSTANTS.authedRoutes.find((path) => pathname.startsWith(path))) {
    if (!session) {
      const redirectUrl = searchParams.get("next") || siteConfig.afterLogin;
      const params = new URLSearchParams({ next: redirectUrl });
      throw redirect(303, `/auth/sign-in?${params.toString()}`);
    }
  } else if (
    CONSTANTS.notAuthedRoutes.find((path) => pathname.startsWith(path))
  ) {
    if (session) {
      throw redirect(303, searchParams.get("next") || siteConfig.afterLogin);
    }
  }

  event.locals.session = session;
  return resolve(event);
}

export const handle = sequence(SvelteKitAuth(authConfig), authHandle);

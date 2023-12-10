import type { DefaultSession, Session } from "@auth/core/types";
import { redirect } from "@sveltejs/kit";

interface ObjectWithSession {
  data: {
    session?: Session;
  };
}

export const getOrRedirect = (session: Session | undefined) => {
  if (!session?.user) {
    throw redirect(303, "/auth/sign-in");
  }

  return session;
};

export const getUser = (
  { data: { session } }: ObjectWithSession = { data: {} }
): DefaultSession["user"] | undefined => session?.user;

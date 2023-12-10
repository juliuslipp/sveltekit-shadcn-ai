import { Config } from "@sveltejs/adapter-vercel";

export const prerender = false;
export async function load(event) {
  const session = event.locals.session;
  return {
    session,
  };
}

import { redirect } from "@sveltejs/kit";
import { siteConfig } from "$lib/config/site";

export async function load(event) {
  const session = event.locals.session;
  if (session) {
    const searchParams = new URL(event.request.url).searchParams;
    const redirectUrl = searchParams.get("next") || siteConfig.afterLogin;
    throw redirect(303, redirectUrl);
  }

  return {};
}

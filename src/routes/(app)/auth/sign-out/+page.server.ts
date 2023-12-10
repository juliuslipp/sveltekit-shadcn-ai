import { redirect } from "@sveltejs/kit";

export async function load(event) {
  const session = event.locals.session;
  if (!session) {
    throw redirect(303, "/");
  }
}

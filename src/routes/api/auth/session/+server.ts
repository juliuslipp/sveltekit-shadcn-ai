import { json } from "@sveltejs/kit";

export async function GET(event) {
  const session = event.locals.session;
  return json({
    session: session ?? null,
  });
}

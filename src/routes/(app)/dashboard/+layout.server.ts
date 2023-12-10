import type { Session } from "@auth/core/types";
import { getOrRedirect } from "$lib/auth";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  const session = getOrRedirect(event.locals.session as Session);
  return {
    session,
  };
};

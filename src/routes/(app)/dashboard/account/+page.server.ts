import { fail, type Actions } from "@sveltejs/kit";
import { accountFormSchema } from "$lib/schemas/account-schema";
import { userDb } from "$server/db/user-db";
import { superValidate } from "sveltekit-superforms/server";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.session?.user ?? { name: "" };
  return {
    form: (await user?.name)
      ? superValidate(user, accountFormSchema)
      : superValidate(accountFormSchema),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, accountFormSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await userDb.updateUser(form.data, {
      user: event.locals.session?.user,
    });

    return {
      form,
    };
  },
};

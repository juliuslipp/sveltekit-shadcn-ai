import { fail, type Actions } from "@sveltejs/kit";
import { siteConfig } from "$lib/config/site";
import { contactUsSchema } from "$lib/schemas/contact-schema";
import { sendEmail } from "$server/email";
import { superValidate } from "sveltekit-superforms/server";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  const user = event.locals.session?.user;
  const userName = user?.name?.split(" ");

  if (user) {
    return {
      form: await superValidate(
        {
          ...user,
          firstName: userName ? userName[0] : undefined,
          lastName: userName ? userName[1] : undefined,
          message: `Dear ${siteConfig.name} team...`,
        },
        contactUsSchema
      ),
    };
  }

  return {
    form: await superValidate(contactUsSchema),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, contactUsSchema);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await sendEmail({
      to: [siteConfig.email],
      subject: "Contact Us Form Submission",
      text: `
Name: ${form.data.name}
Email: ${form.data.email}
Message: ${form.data.message}
`,
    });

    return {
      form,
    };
  },
};

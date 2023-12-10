import { RESEND_API_KEY } from "$env/static/private";
import { Resend } from "resend";
import type { ComponentProps, ComponentType, SvelteComponent } from "svelte";
import { render } from "svelte-email";

const client = new Resend(RESEND_API_KEY);

export type SendEmailParams = {
  to: string[];
  subject: string;
  from?: string;
} & (
  | {
      text: string;
    }
  | {
      html: string;
    }
);
export const sendEmail = async ({
  to,
  subject,
  from,
  ...params
}: SendEmailParams) => {
  const mailOptions = {
    from: from ?? process.env.EMAIL_SERVER_FROM!,
    to,
    subject,
    ...params,
  };

  try {
    await client.emails.create(mailOptions);
    console.log(
      `Email sent:\n ${JSON.stringify({
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
      })}`
    );
  } catch (error) {
    console.error(
      `Error occurred while sending email: ${JSON.stringify(
        mailOptions
      )} \n Error: ${String(error)}`
    );
    throw error;
  }
};

type SendSvelteEmailParams<Component extends SvelteComponent> = Omit<
  SendEmailParams,
  "text" | "html"
> & {
  svelteEmail: {
    props: ComponentProps<Component>;
    email: ComponentType<Component>;
  };
};
export const sendSvelteEmail = async <Component extends SvelteComponent>({
  to,
  subject,
  from,
  svelteEmail: { email, props },
}: SendSvelteEmailParams<Component>) => {
  const html = render({
    template: email,
    props,
  });
  const mailOptions = {
    from: from ?? process.env.EMAIL_SERVER_FROM,
    to: to,
    subject: subject,
    html,
  };

  await sendEmail(mailOptions);
};

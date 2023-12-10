import { redirect } from "@sveltejs/kit";
import { chatDb } from "$server/db/chat-db";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, locals }) => {
  const id = url.searchParams.get("id");
  const session = await locals.getSession();
  if (!session?.user) {
    throw redirect(302, `/auth/sign-in?next=/chat?${id}`);
  }

  let chat = id
    ? await chatDb.getLatestChat({ user: session.user })
    : await chatDb.getChat(id, { user: session.user });

  if (!chat) {
    await chatDb.createChat(
      { userId: session.user.id },
      { user: session.user }
    );

    chat = await chatDb.getLatestChat({ user: session.user });
  }

  const chatsWithoutMessages = await chatDb.getChatsWithoutMessages({
    user: session.user,
  });

  return { chat, chats: chatsWithoutMessages };
};

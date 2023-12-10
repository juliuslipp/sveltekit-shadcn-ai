import type { User } from "@auth/core/types";
import { Chat, type InsertChat } from "$lib/types/db";
import { and, eq, not, sql } from "drizzle-orm";

import { db } from "./index";
import { chats } from "./schema";

interface ChatDbParams {
  user: User;
}
export const chatDb = {
  async getLatestChat({ user }: ChatDbParams) {
    const res = await db
      .select()
      .from(chats)
      .where(and(eq(chats.userId, user.id), not(chats.deleted)))
      .orderBy(sql`${chats.createdAt} DESC`)
      .limit(1);
    if (res.length > 0) {
      return res[0];
    }
    return undefined;
  },

  getChat: async (id: string, { user }: ChatDbParams) => {
    const res = await db
      .selectDistinct()
      .from(chats)
      .where(
        and(eq(chats.userId, user.id), eq(chats.id, id), not(chats.deleted))
      );
    return res.length ? res[0] : undefined;
  },

  createChat: async (
    chat: Omit<InsertChat, "userId">,
    { user }: ChatDbParams
  ) =>
    await db.insert(chats).values({
      ...chat,
      userId: user.id,
    }),

  updateChat: async (
    id: string,
    chat: Omit<InsertChat, "userId" | "id">,
    { user }: ChatDbParams
  ) =>
    await db
      .update(chats)
      .set(chat)
      .where(
        and(eq(chats.id, id), eq(chats.userId, user.id), not(chats.deleted))
      ),

  deleteChat: async (id: string, { user }: ChatDbParams) =>
    await db
      .update(chats)
      .set({ deleted: true })
      .where(and(eq(chats.id, id), eq(chats.userId, user.id))),

  getChatsWithoutMessages: async ({
    user,
  }: ChatDbParams): Promise<Omit<Chat, "messages">[]> =>
    await db
      .select({
        id: chats.id,
        userId: chats.userId,
        createdAt: chats.createdAt,
        updatedAt: chats.updatedAt,
      })
      .from(chats)
      .where(and(eq(chats.userId, user.id), not(chats.deleted)))
      .orderBy(sql`${chats.createdAt} DESC`)
      .limit(1),
};

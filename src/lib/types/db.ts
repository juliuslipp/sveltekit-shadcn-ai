import { type chats } from "$server/db/schema";
import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";

export type Chat = InferSelectModel<typeof chats>;
export type InsertChat = InferInsertModel<typeof chats>;

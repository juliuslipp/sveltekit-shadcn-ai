import type { AdapterAccount } from "@auth/core/adapters";
import type { Message } from "ai";
import {
  blob,
  index,
  integer,
  primaryKey,
  sqliteTableCreator,
  text,
  unique,
} from "drizzle-orm/sqlite-core";

import { generateId } from "../../lib/utils";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const sqliteTable = sqliteTableCreator(
  (name) => `svelte-app-starter_${name}`
);

//////////////////////////////////////////////
// next-auth
//////////////////////////////////////////////

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

//////////////////////////////////////////////
// App
//////////////////////////////////////////////

export const chats = sqliteTable("chat", {
  id: text("id").notNull().primaryKey().$defaultFn(generateId),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name", { length: 256 }).default("Untitled"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .defaultNow(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .defaultNow(),
  deleted: integer("deleted", { mode: "boolean" }).default(false),

  messages: blob("messages", { mode: "json" })
    .$type<Message[]>()
    .$defaultFn(() => []),
});

import type { DefaultSession, User } from "@auth/core/types";
import { users } from "$server/db/schema";
import { InferSelectModel } from "drizzle-orm";

declare module "@auth/core/types" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "@auth/drizzle-adapter" {
  interface AdapterUser extends User, InferSelectModel<typeof users> {}
}

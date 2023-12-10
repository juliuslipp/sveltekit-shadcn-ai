import type { AdapterUser } from "@auth/core/adapters";
import type { User } from "@auth/core/types";
import { eq } from "drizzle-orm";

import { db } from "./index";
import { users } from "./schema";

interface UserDbParams {
  user: User;
}
export const userDb = {
  updateUser: async (
    data: Omit<Partial<AdapterUser>, "id">,
    { user }: UserDbParams
  ) => await db.update(users).set(data).where(eq(users.id, user.id)),
};

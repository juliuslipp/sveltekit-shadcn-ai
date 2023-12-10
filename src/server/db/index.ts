import { createClient } from "@libsql/client";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "$env/static/private";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schema";

const db = drizzle(
  createClient({
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN ?? undefined,
  }),
  {
    logger: process.env.NODE_ENV !== "production",
  }
);

export { db, schema };

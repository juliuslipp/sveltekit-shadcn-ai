import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config();

const config = {
  schema: "src/server/db/schema.ts",
  out: "drizzle",
  driver: "turso",
  tablesFilter: ["svelte-app-starter_*"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;

export default config;

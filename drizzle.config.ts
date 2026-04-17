import { defineConfig } from "drizzle-kit";
import { join } from "node:path";

const dbPath = process.env.DATABASE_PATH ?? "data/dev.db";
const resolved = dbPath.startsWith("/") ? dbPath : join(process.cwd(), dbPath);

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${resolved}`,
  },
});

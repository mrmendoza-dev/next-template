import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import * as schema from "./schema";

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>;

let sqlite: Database.Database | null = null;
let db: DrizzleDb | null = null;

export const getDatabasePath = (): string =>
  process.env.DATABASE_PATH ?? "data/dev.db";

/** Opens SQLite (default file path from env) and returns the Drizzle client. */
export const initDb = (path = getDatabasePath()): DrizzleDb => {
  if (db) {
    return db;
  }
  const openPath = path === ":memory:" ? path : resolve(path);
  if (path !== ":memory:") {
    mkdirSync(dirname(openPath), { recursive: true });
  }
  sqlite = new Database(openPath);
  sqlite.pragma("foreign_keys = ON");
  db = drizzle(sqlite, { schema });
  return db;
};

export const getDb = (): DrizzleDb => {
  if (!db) {
    return initDb();
  }
  return db;
};

/** Applies SQL migrations in `drizzle/` (safe to call on every server start). */
export const runMigrations = (): void => {
  const database = getDb();
  const folder = join(process.cwd(), "drizzle");
  migrate(database, { migrationsFolder: folder });
};

/** Releases the DB handle (mainly for tests). */
export const closeDb = (): void => {
  sqlite?.close();
  sqlite = null;
  db = null;
};

#!/usr/bin/env bun
/**
 * Apply SQL migrations in `drizzle/` using Bun’s built-in SQLite (`bun:sqlite`).
 * Run via `bun run db:migrate` — not imported from Next.js so CI/`next build` stay free of native DB addons.
 */
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { mkdirSync } from "fs";
import { dirname, join, resolve } from "path";
import * as schema from "../src/lib/db/schema";

const raw = process.env.DATABASE_PATH ?? "data/dev.db";
const openPath = raw === ":memory:" ? raw : resolve(raw);
if (raw !== ":memory:") {
	mkdirSync(dirname(openPath), { recursive: true });
}

const sqlite = new Database(openPath);
sqlite.run("PRAGMA foreign_keys = ON");
const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: join(process.cwd(), "drizzle") });
sqlite.close();
console.log("Migrations applied.");

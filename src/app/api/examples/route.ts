import { getDb } from "@/lib/db";
import { examples } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const GET = () => {
  const db = getDb();
  const rows = db.select().from(examples).all();
  return NextResponse.json(rows);
};

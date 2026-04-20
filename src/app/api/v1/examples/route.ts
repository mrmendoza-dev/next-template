import { NextResponse } from "next/server";

/**
 * Demo Route Handler — no SQLite / native drivers here (minimal Node surface).
 * Wire your own data layer (hosted DB, edge-friendly client, or Bun workers) when needed.
 */
export const GET = () => NextResponse.json([]);

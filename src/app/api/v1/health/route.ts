import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const GET = () => NextResponse.json({ status: "ok" as const });

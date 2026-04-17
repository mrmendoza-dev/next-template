import { NextResponse } from "next/server";

export const runtime = "nodejs";

export const GET = () =>
  NextResponse.json({
    name: "next-template-api",
    status: "ok",
  });

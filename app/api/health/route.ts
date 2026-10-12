import { NextResponse } from "next/server";
export const runtime = "nodejs";
export function GET() { return NextResponse.json({ status: "ok", app: "BoucherieFlow", mode: "browser-persisted-demo", version: "1.0.0" }); }

import { NextRequest, NextResponse } from "next/server";
import { getBookings, updateStatus } from "@/lib/store";

// Simple auth check
function isAuthorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const pass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  return token === pass;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bookings = getBookings();
  return NextResponse.json({ bookings });
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json();
  if (!id || !status) {
    return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
  }
  updateStatus(id, status);
  return NextResponse.json({ success: true });
}

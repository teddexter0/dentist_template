import { NextRequest, NextResponse } from "next/server";
import { getBookings } from "@/lib/store";
import { sendNewsletterEmail } from "@/lib/email";

function isAuthorized(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const pass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  return token === pass;
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, bodyHtml } = await req.json();
  if (!subject || !bodyHtml) {
    return NextResponse.json({ error: "Missing subject or body" }, { status: 400 });
  }

  const bookings = getBookings();

  // Unique patients with email addresses
  const seen = new Set<string>();
  const recipients = bookings.filter((b) => {
    if (!b.email || seen.has(b.email.toLowerCase())) return false;
    seen.add(b.email.toLowerCase());
    return true;
  });

  let sent = 0;
  let failed = 0;

  for (const booking of recipients) {
    try {
      await sendNewsletterEmail({
        toEmail: booking.email,
        patientName: booking.name.split(" ")[0],
        subject,
        bodyHtml,
      });
      sent++;
      // Small delay to stay within rate limits
      await new Promise((r) => setTimeout(r, 100));
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ success: true, sent, failed, total: recipients.length });
}

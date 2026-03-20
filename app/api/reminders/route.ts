/**
 * Checkup reminder endpoint.
 * Call this via a cron job (e.g. Vercel cron or GitHub Actions) to send
 * reminders to patients who haven't visited in 6+ months.
 *
 * Protect with CRON_SECRET: call with header x-cron-secret or ?secret=...
 */
import { NextRequest, NextResponse } from "next/server";
import { getBookings } from "@/lib/store";
import { sendCheckupReminder } from "@/lib/email";

export async function POST(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const provided =
    req.headers.get("x-cron-secret") ||
    new URL(req.url).searchParams.get("secret");

  if (secret && provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = getBookings();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // Most-recent booking per patient email
  const latestByEmail = new Map<string, (typeof bookings)[0]>();
  for (const b of bookings) {
    if (!b.email) continue;
    const key = b.email.toLowerCase();
    const existing = latestByEmail.get(key);
    if (!existing || new Date(b.timestamp) > new Date(existing.timestamp)) {
      latestByEmail.set(key, b);
    }
  }

  let sent = 0;
  let skipped = 0;

  for (const [, booking] of latestByEmail) {
    const visitDate = new Date(booking.timestamp);
    if (visitDate > sixMonthsAgo) {
      skipped++;
      continue;
    }
    const monthsAgo = Math.round(
      (Date.now() - visitDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    try {
      await sendCheckupReminder({
        toEmail: booking.email,
        patientName: booking.name.split(" ")[0],
        monthsAgo,
      });
      sent++;
      await new Promise((r) => setTimeout(r, 150));
    } catch (e) {
      console.error("Reminder failed for", booking.email, e);
    }
  }

  return NextResponse.json({ success: true, sent, skipped });
}

// Also allow GET for easy cron URL pinging
export async function GET(req: NextRequest) {
  return POST(req);
}

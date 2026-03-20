/**
 * Resend email helper — free tier: 3,000 emails/month, 100/day
 * Set RESEND_API_KEY in .env.local
 */

import { clinicConfig } from "@/config/clinic";

async function sendRaw({ to, subject, html }: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email send");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: clinicConfig.emailFrom,
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Resend email error:", err);
  }
}

// ── Appointment Confirmation → Patient ────────────────────────────────────────
export async function sendAppointmentConfirmation(params: {
  toEmail: string;
  patientName: string;
  service: string;
  date: string;
  time: string;
  branch: string;
}) {
  const { toEmail, patientName, service, date, time, branch } = params;
  await sendRaw({
    to: toEmail,
    subject: `✅ Appointment Request Received — ${clinicConfig.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAFAF8;border-radius:16px;overflow:hidden;">
        <div style="background:#1B4F72;padding:32px 24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:24px;">😁 ${clinicConfig.name}</h1>
          <p style="color:#A8D5BA;margin:8px 0 0;font-size:14px;">${clinicConfig.tagline}</p>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#1B4F72;margin:0 0 16px;">Hi ${patientName},</h2>
          <p style="color:#444;line-height:1.6;">Your appointment request has been received. We'll confirm it within <strong>2 hours</strong>.</p>
          <div style="background:#ffffff;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #1B4F72;">
            <p style="margin:0 0 8px;color:#666;font-size:13px;">APPOINTMENT DETAILS</p>
            <p style="margin:4px 0;color:#1A1A1A;"><strong>Service:</strong> ${service}</p>
            <p style="margin:4px 0;color:#1A1A1A;"><strong>Date:</strong> ${date}</p>
            <p style="margin:4px 0;color:#1A1A1A;"><strong>Preferred Time:</strong> ${time || "Flexible"}</p>
            <p style="margin:4px 0;color:#1A1A1A;"><strong>Branch:</strong> ${branch}</p>
          </div>
          <p style="color:#444;line-height:1.6;">Questions? Call or WhatsApp us:</p>
          <a href="tel:${clinicConfig.phone}" style="display:inline-block;background:#1B4F72;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;margin:4px 8px 4px 0;">${clinicConfig.phone}</a>
          <a href="https://wa.me/${clinicConfig.whatsapp}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;">WhatsApp</a>
        </div>
        <div style="background:#f0f0f0;padding:16px 24px;text-align:center;">
          <p style="color:#999;font-size:12px;margin:0;">© ${new Date().getFullYear()} ${clinicConfig.name} · ${clinicConfig.address}</p>
        </div>
      </div>`,
  });
}

// ── New Booking Alert → Clinic ─────────────────────────────────────────────────
export async function sendClinicNotification(params: {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  service: string;
  date: string;
  time: string;
  branch: string;
  message: string;
}) {
  const { patientName, patientPhone, patientEmail, service, date, time, branch, message } = params;
  await sendRaw({
    to: process.env.ADMIN_EMAIL || clinicConfig.email,
    subject: `📅 New Booking — ${patientName} · ${service}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#1B4F72;">New Appointment Request</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${[
            ["Name", patientName],
            ["Phone", patientPhone],
            ["Email", patientEmail || "—"],
            ["Service", service],
            ["Date", date],
            ["Time", time || "Flexible"],
            ["Branch", branch],
            ["Notes", message || "—"],
          ]
            .map(
              ([k, v]) =>
                `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:600;width:120px;">${k}</td><td style="padding:8px 12px;">${v}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:16px;">
          <a href="tel:${patientPhone}" style="background:#1B4F72;color:#fff;padding:10px 20px;border-radius:50px;text-decoration:none;">Call Patient</a>
        </p>
      </div>`,
  });
}

// ── Newsletter → Patient ───────────────────────────────────────────────────────
export async function sendNewsletterEmail(params: {
  toEmail: string;
  patientName: string;
  subject: string;
  bodyHtml: string;
}) {
  const { toEmail, patientName, subject, bodyHtml } = params;
  await sendRaw({
    to: toEmail,
    subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAFAF8;border-radius:16px;overflow:hidden;">
        <div style="background:#1B4F72;padding:32px 24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🦷 ${clinicConfig.name}</h1>
          <p style="color:#A8D5BA;margin:6px 0 0;font-size:13px;">Your Dental Health Newsletter</p>
        </div>
        <div style="padding:32px 24px;">
          <p style="color:#444;">Hi ${patientName},</p>
          ${bodyHtml}
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="font-size:13px;color:#888;">Ready to book your next appointment?</p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://brightsmiles.co.ke"}/book"
             style="display:inline-block;background:#1B4F72;color:#fff;padding:12px 28px;border-radius:50px;text-decoration:none;font-weight:600;">
            Book Appointment
          </a>
        </div>
        <div style="background:#f0f0f0;padding:16px 24px;text-align:center;">
          <p style="color:#bbb;font-size:11px;margin:0;">© ${new Date().getFullYear()} ${clinicConfig.name} · ${clinicConfig.address}<br/>You're receiving this because you visited our clinic.</p>
        </div>
      </div>`,
  });
}

// ── Checkup Reminder → Patient ─────────────────────────────────────────────────
export async function sendCheckupReminder(params: {
  toEmail: string;
  patientName: string;
  monthsAgo: number;
}) {
  const { toEmail, patientName, monthsAgo } = params;
  await sendRaw({
    to: toEmail,
    subject: `⏰ Time for your dental check-up, ${patientName}!`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAFAF8;border-radius:16px;overflow:hidden;">
        <div style="background:#1B4F72;padding:32px 24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;">🦷 ${clinicConfig.name}</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#1B4F72;">Hi ${patientName}!</h2>
          <p style="color:#444;line-height:1.7;">It's been about <strong>${monthsAgo} months</strong> since your last visit. Dentists recommend a check-up every 6 months to keep your smile healthy and catch issues early.</p>
          <div style="background:#E8F4F0;border-radius:12px;padding:16px 20px;margin:20px 0;">
            <p style="margin:0;color:#1B4F72;font-size:14px;">💡 <strong>Did you know?</strong> Regular check-ups can save up to 70% in dental costs by preventing bigger problems.</p>
          </div>
          <p style="color:#444;">We'd love to see you again — same-day appointments often available.</p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://brightsmiles.co.ke"}/book"
             style="display:inline-block;background:#1B4F72;color:#fff;padding:14px 32px;border-radius:50px;text-decoration:none;font-weight:600;margin-top:8px;">
            Book My Check-up
          </a>
          <p style="margin-top:16px;font-size:13px;color:#888;">Or call us: <a href="tel:${clinicConfig.phone}" style="color:#1B4F72;">${clinicConfig.phone}</a></p>
        </div>
        <div style="background:#f0f0f0;padding:16px 24px;text-align:center;">
          <p style="color:#bbb;font-size:11px;margin:0;">© ${new Date().getFullYear()} ${clinicConfig.name} · ${clinicConfig.address}</p>
        </div>
      </div>`,
  });
}

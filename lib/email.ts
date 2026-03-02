/**
 * Brevo (formerly Sendinblue) email helper
 * Set BREVO_API_KEY in your .env.local
 */
export async function sendEmail(
  to: string,
  templateId: number,
  params: Record<string, string>
) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("BREVO_API_KEY not set — skipping email send");
    return;
  }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: [{ email: to }],
      templateId,
      params,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Brevo email error:", err);
  }
}

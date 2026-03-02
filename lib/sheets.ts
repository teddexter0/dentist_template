/**
 * Google Sheets helper
 * Setup: Extensions → Apps Script in your Google Sheet, paste the webhook code,
 * deploy as web app, copy URL to SHEETS_WEBHOOK_URL env var.
 */
export async function appendToSheet(data: Record<string, string | number>) {
  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("SHEETS_WEBHOOK_URL not set — skipping sheet append");
    return;
  }
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

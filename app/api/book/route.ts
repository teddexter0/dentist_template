import { NextRequest, NextResponse } from "next/server";
import { appendToSheet } from "@/lib/sheets";
import { sendEmail } from "@/lib/email";
import { clinicConfig } from "@/config/clinic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, date, message } = body;

    if (!name || !phone || !service || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Google Sheet
    await appendToSheet({
      name,
      phone,
      email: email || "",
      service,
      preferredDate: date,
      message: message || "",
      timestamp: new Date().toISOString(),
      status: "Pending",
    });

    // Send confirmation email to patient
    if (email) {
      await sendEmail(email, clinicConfig.brevo.appointmentConfirmationId, {
        PATIENT_NAME: name,
        SERVICE: service,
        DATE: date,
        CLINIC_NAME: clinicConfig.name,
        CLINIC_PHONE: clinicConfig.phone,
      });
    }

    // Send notification to clinic owner
    await sendEmail(
      clinicConfig.email,
      clinicConfig.brevo.clinicNotificationId,
      {
        PATIENT_NAME: name,
        PATIENT_PHONE: phone,
        PATIENT_EMAIL: email || "N/A",
        SERVICE: service,
        DATE: date,
        MESSAGE: message || "N/A",
      }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { error: "Failed to submit booking" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { addBooking } from "@/lib/store";
import { appendToSheet } from "@/lib/sheets";
import { sendAppointmentConfirmation, sendClinicNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, date, time, branch, message } = body;

    if (!name || !phone || !service || !date || !branch) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = addBooking({
      name, phone, email: email || "", service, branch,
      preferredDate: date, preferredTime: time || "",
      message: message || "", timestamp: new Date().toISOString(), status: "Pending",
    });

    // Sync to Google Sheets (non-blocking, optional)
    appendToSheet({
      name, phone, email: email || "", service, branch,
      preferredDate: date, preferredTime: time || "",
      message: message || "", timestamp: booking.timestamp, status: "Pending",
    }).catch((e: unknown) => console.error("Sheets sync error:", e));

    // Confirmation email to patient
    if (email) {
      sendAppointmentConfirmation({
        toEmail: email, patientName: name, service, date, time: time || "", branch,
      }).catch((e: unknown) => console.error("Patient email error:", e));
    }

    // Notification to clinic owner
    sendClinicNotification({
      patientName: name, patientPhone: phone, patientEmail: email || "",
      service, date, time: time || "", branch, message: message || "",
    }).catch((e: unknown) => console.error("Clinic email error:", e));

    return NextResponse.json({ success: true, id: booking.id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
  }
}

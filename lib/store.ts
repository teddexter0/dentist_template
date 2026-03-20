/**
 * File-based booking store using /tmp (works in local dev + Vercel).
 * For production, swap appendToSheet / getBookings for a real DB or Google Sheets.
 */
import fs from "fs";
import path from "path";

const STORE_PATH = path.join("/tmp", "clinic_bookings.json");

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  branch: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  timestamp: string;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
}

function loadBookings(): Booking[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8")) as Booking[];
    }
  } catch {
    // file corrupt — start fresh
  }
  return demoBookings();
}

function saveBookings(bookings: Booking[]) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(bookings, null, 2));
  } catch (e) {
    console.error("Store write error:", e);
  }
}

export function getBookings(): Booking[] {
  return loadBookings();
}

export function addBooking(data: Omit<Booking, "id">): Booking {
  const bookings = loadBookings();
  // Avoid writing demo data to disk — only write real entries
  const real = bookings.filter((b) => !b.id.startsWith("demo-"));
  const booking: Booking = { id: Date.now().toString(), ...data };
  real.unshift(booking);
  saveBookings(real);
  return booking;
}

export function updateStatus(id: string, status: Booking["status"]) {
  const bookings = loadBookings();
  const i = bookings.findIndex((b) => b.id === id);
  if (i !== -1) {
    bookings[i].status = status;
    saveBookings(bookings);
  }
}

// ── Demo data shown until real bookings come in ────────────────────────────────
function demoBookings(): Booking[] {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const addDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d;
  };
  const subDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - n);
    return d;
  };
  return [
    {
      id: "demo-1",
      name: "Sarah Mwangi",
      phone: "+254712345678",
      email: "sarah@example.com",
      service: "Cleaning & Check-up",
      branch: "Eldoret Main Branch",
      preferredDate: fmt(subDays(180)),
      preferredTime: "10:00 AM",
      message: "First visit",
      timestamp: subDays(182).toISOString(),
      status: "Completed",
    },
    {
      id: "demo-2",
      name: "John Kipchoge",
      phone: "+254723456789",
      email: "john@example.com",
      service: "Teeth Whitening",
      branch: "Eldoret Main Branch",
      preferredDate: fmt(addDays(2)),
      preferredTime: "2:00 PM",
      message: "",
      timestamp: subDays(1).toISOString(),
      status: "Confirmed",
    },
    {
      id: "demo-3",
      name: "Mary Achieng",
      phone: "+254734567890",
      email: "",
      service: "Kids Dentistry",
      branch: "Kitale Branch",
      preferredDate: fmt(addDays(3)),
      preferredTime: "9:00 AM",
      message: "Child is 7 years old",
      timestamp: subDays(0).toISOString(),
      status: "Pending",
    },
    {
      id: "demo-4",
      name: "Peter Otieno",
      phone: "+254745678901",
      email: "peter@example.com",
      service: "Braces & Orthodontics",
      branch: "Eldoret Main Branch",
      preferredDate: fmt(addDays(7)),
      preferredTime: "11:00 AM",
      message: "Consultation first",
      timestamp: subDays(2).toISOString(),
      status: "Pending",
    },
    {
      id: "demo-5",
      name: "Grace Wanjiku",
      phone: "+254756789012",
      email: "grace@example.com",
      service: "Root Canal",
      branch: "Kitale Branch",
      preferredDate: fmt(subDays(200)),
      preferredTime: "3:00 PM",
      message: "",
      timestamp: subDays(200).toISOString(),
      status: "Completed",
    },
  ];
}

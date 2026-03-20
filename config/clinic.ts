import type { Season } from "@/lib/season";

export interface Branch {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  mapsLink: string;
  /** Google Maps embed src — leave empty to show a directions link instead */
  mapsEmbedSrc: string;
  hours: { weekdays: string; saturday: string; sunday: string };
}

export const clinicConfig = {
  name: "Bright Smiles Dental",
  tagline: "Your Confident Smile Starts Here",
  heroVideo: "", // replace with hosted video URL; leave empty for gradient
  phone: "+254 700 000 000",
  email: "info@brightsmiles.co.ke",
  whatsapp: "+254711963907",
  address: "Ground Floor, ABC Plaza, Uganda Road, Eldoret",
  mapsLink: "https://maps.google.com/?q=Bright+Smiles+Dental+Eldoret",
  googleAnalyticsId: "",

  // ── BRANCHES ────────────────────────────────────────────────
  branches: [
    {
      name: "Eldoret Main Branch",
      address: "Ground Floor, ABC Plaza, Uganda Road, Eldoret",
      phone: "+254 711 963907",
      whatsapp: "+254711963907",
      mapsLink: "https://maps.google.com/?q=Bright+Smiles+Dental+Eldoret",
      mapsEmbedSrc: "", // paste Google Maps embed src here after client confirms
      hours: { weekdays: "8:00 AM – 6:00 PM", saturday: "9:00 AM – 2:00 PM", sunday: "Closed" },
    },
    {
      name: "Kitale Branch",
      address: "Kitale Town Centre, Trans Nzoia County",
      phone: "+254 700 000 001",
      whatsapp: "+254700000001",
      mapsLink: "https://maps.google.com/?q=Bright+Smiles+Dental+Kitale",
      mapsEmbedSrc: "", // paste Google Maps embed src here after client confirms
      hours: { weekdays: "8:00 AM – 5:00 PM", saturday: "9:00 AM – 1:00 PM", sunday: "Closed" },
    },
  ] as Branch[],

  hours: { weekdays: "8:00 AM – 6:00 PM", saturday: "9:00 AM – 2:00 PM", sunday: "Closed" },

  colors: { primary: "#1B4F72", accent: "#A8D5BA", bg: "#FAFAF8", text: "#1A1A1A" },

  /**
   * Seasonal windows — all shift yearly (Islamic dates ~11 days earlier/year).
   * Update each January. Current values are 2026 approximations.
   *
   * Ramadan  2026: Feb 18 – Mar 19  |  2027: Feb 07 – Mar 08
   * Eid Fitr 2026: Mar 20 – Mar 22  |  2027: Mar 09 – Mar 11
   * Eid Adha 2026: May 27 – May 30  |  2027: May 16 – May 19
   * Diwali   2026: Oct 20 – Oct 22  |  2027: Nov 08 – Nov 10  (Hindu calendar)
   */
  seasonWindows: {
    ramadan:  { startMonth: 2,  startDay: 18, endMonth: 3,  endDay: 19 },
    eidFitr:  { startMonth: 3,  startDay: 20, endMonth: 3,  endDay: 22 },
    eidAdha:  { startMonth: 5,  startDay: 27, endMonth: 5,  endDay: 30 },
    diwali:   { startMonth: 10, startDay: 20, endMonth: 10, endDay: 22 },
  },

  /** Override auto-detection: "default" means auto. */
  season: "default" as Season,

  /**
   * Google Maps review link — replace with actual place ID after client confirms location.
   * Get it from: https://business.google.com → your listing → "Get more reviews"
   */
  googleReviewUrl: "https://g.page/r/REPLACE_WITH_PLACE_ID/review",

  services: [
    {
      name: "Cleaning & Check-up",
      icon: "🦷",
      description: "Professional teeth cleaning and full oral health assessment.",
      price: "From KES 1,500",
    },
    {
      name: "Teeth Whitening",
      icon: "✨",
      description: "Brighten your smile with safe, effective whitening treatments.",
      price: "From KES 5,000",
    },
    {
      name: "Braces & Orthodontics",
      icon: "😁",
      description: "Straighten your teeth with modern orthodontic braces.",
      price: "From KES 50,000",
    },
    {
      name: "Dental Implants",
      icon: "🔬",
      description: "Permanent, natural-looking tooth replacement solutions.",
      price: "From KES 80,000",
    },
    {
      name: "Root Canal",
      icon: "🏥",
      description: "Pain-free root canal therapy to save your natural tooth.",
      price: "From KES 8,000",
    },
    {
      name: "Kids Dentistry",
      icon: "👶",
      description: "Gentle, fun dental care designed for children of all ages.",
      price: "From KES 1,000",
    },
  ],

  testimonials: [
    { name: "Sarah M.", text: "Best dental clinic in Eldoret. Professional, gentle, and very thorough.", rating: 5 },
    { name: "John K.", text: "My kids actually look forward to their appointments here. Amazing staff!", rating: 5 },
    { name: "Mary W.", text: "Got my teeth whitened and the results are incredible. Highly recommend.", rating: 5 },
  ],

  /** "From" address for Resend emails. Use verified domain in production. */
  emailFrom: "Bright Smiles Dental <onboarding@resend.dev>",
};

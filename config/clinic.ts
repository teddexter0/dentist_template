export type Season = "default" | "valentine" | "christmas" | "easter";

export const clinicConfig = {
  name: "Bright Smiles Dental",
  tagline: "Your Confident Smile Starts Here",
  phone: "+254 700 000 000",
  email: "info@brightsmiles.co.ke",
  whatsapp: "+254700000000",
  address: "Ground Floor, ABC Plaza, Eldoret",
  mapsLink: "https://maps.google.com/?q=Eldoret+Kenya",
  googleAnalyticsId: "", // e.g. "G-XXXXXXXXXX"
  hours: {
    weekdays: "8:00 AM – 6:00 PM",
    saturday: "9:00 AM – 2:00 PM",
    sunday: "Closed",
  },
  colors: {
    primary: "#1B4F72",
    accent: "#A8D5BA",
    bg: "#FAFAF8",
    text: "#1A1A1A",
  },
  services: [
    {
      name: "Cleaning",
      icon: "🦷",
      description: "Professional teeth cleaning and oral hygiene maintenance",
      price: "From KES 1,500",
    },
    {
      name: "Whitening",
      icon: "✨",
      description: "Brighten your smile with safe, effective whitening treatments",
      price: "From KES 5,000",
    },
    {
      name: "Braces",
      icon: "😁",
      description: "Straighten your teeth with modern orthodontic braces",
      price: "From KES 50,000",
    },
    {
      name: "Implants",
      icon: "🔬",
      description: "Permanent, natural-looking tooth replacement solutions",
      price: "From KES 80,000",
    },
    {
      name: "Root Canal",
      icon: "🏥",
      description: "Pain-free root canal therapy to save your natural tooth",
      price: "From KES 8,000",
    },
    {
      name: "Kids Dentistry",
      icon: "👶",
      description: "Gentle, fun dental care designed for children",
      price: "From KES 1,000",
    },
  ],
  testimonials: [
    {
      name: "Sarah M.",
      text: "Best dental clinic in Eldoret. Professional, gentle, and very thorough.",
      rating: 5,
    },
    {
      name: "John K.",
      text: "My kids actually look forward to their appointments here. Amazing staff!",
      rating: 5,
    },
    {
      name: "Mary W.",
      text: "Got my teeth whitened and the results are incredible. Highly recommend.",
      rating: 5,
    },
  ],
  // Manual season override (trumps auto-detection)
  // Options: "default" | "valentine" | "christmas" | "easter"
  season: "default" as Season,
  brevo: {
    // Add your Brevo template IDs after setting up in Brevo dashboard
    appointmentConfirmationId: 1,
    clinicNotificationId: 2,
  },
};

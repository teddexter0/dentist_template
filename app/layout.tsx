import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { clinicConfig } from "@/config/clinic";
import { detectSeason } from "@/lib/season";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SeasonalBanner from "@/components/SeasonalBanner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://brightsmiles.co.ke";

export const metadata: Metadata = {
  title: {
    default: `${clinicConfig.name} — Dental Clinic in Eldoret & Kitale`,
    template: `%s | ${clinicConfig.name}`,
  },
  description: `${clinicConfig.tagline}. Book an appointment online at our Eldoret or Kitale branch. Professional dental care — cleaning, whitening, braces, implants & more.`,
  keywords: ["dentist Eldoret", "dental clinic Eldoret", "dentist Kitale", "teeth whitening Kenya", "dental implants Eldoret", "braces Kenya", "book dentist online Kenya"],
  openGraph: {
    type: "website",
    siteName: clinicConfig.name,
    title: `${clinicConfig.name} — Dental Clinic Eldoret & Kitale`,
    description: `Book your dental appointment online. Professional care at our Eldoret and Kitale clinics.`,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const season =
    clinicConfig.season !== "default"
      ? clinicConfig.season
      : detectSeason(clinicConfig.seasonWindows);

  return (
    <html lang="en" data-season={season}>
      <head>
        {/* Schema.org structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              name: clinicConfig.name,
              description: clinicConfig.tagline,
              url: siteUrl,
              telephone: clinicConfig.phone,
              email: clinicConfig.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: clinicConfig.address,
                addressLocality: "Eldoret",
                addressRegion: "Uasin Gishu",
                addressCountry: "KE",
              },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
              ],
              hasMap: clinicConfig.mapsLink,
            }),
          }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} font-sans`}>
        <SeasonalBanner />
        {children}
        <WhatsAppFloat phone={clinicConfig.whatsapp} />
      </body>
    </html>
  );
}

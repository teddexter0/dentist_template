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

export const metadata: Metadata = {
  title: `${clinicConfig.name} — Professional Dental Care`,
  description: `${clinicConfig.tagline} | ${clinicConfig.address}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const season =
    clinicConfig.season !== "default" ? clinicConfig.season : detectSeason();

  return (
    <html lang="en" data-season={season}>
      <body className={`${playfair.variable} ${dmSans.variable} font-sans`}>
        <SeasonalBanner />
        {children}
        <WhatsAppFloat phone={clinicConfig.whatsapp} />
      </body>
    </html>
  );
}

export type Season =
  | "default"
  | "newyear"
  | "valentine"
  | "ramadan"
  | "easter"
  | "summer"
  | "halloween"
  | "thanksgiving"
  | "christmas";

export interface SeasonTheme {
  season: Season;
  label: string;
  emoji: string;
  particleColor: string;
  particleShape: "star" | "heart" | "snowflake" | "circle" | "leaf" | "crescent";
  bannerMessage: string;
}

export const SEASON_THEMES: Record<Season, SeasonTheme> = {
  newyear: {
    season: "newyear",
    label: "Happy New Year",
    emoji: "🎉",
    particleColor: "#FFD700",
    particleShape: "star",
    bannerMessage: "🎉 Happy New Year! Start the year with a healthy smile.",
  },
  valentine: {
    season: "valentine",
    label: "Valentine's Day",
    emoji: "💕",
    particleColor: "#FF6B9D",
    particleShape: "heart",
    bannerMessage: "💕 Valentine's Special — Gift your loved one a smile makeover!",
  },
  ramadan: {
    season: "ramadan",
    label: "Ramadan Kareem",
    emoji: "🌙",
    particleColor: "#C9A84C",
    particleShape: "crescent",
    bannerMessage: "🌙 Ramadan Kareem — Special check-up packages this blessed month.",
  },
  easter: {
    season: "easter",
    label: "Easter",
    emoji: "🌸",
    particleColor: "#C471ED",
    particleShape: "circle",
    bannerMessage: "🌸 Easter Offer — Fresh smile for a fresh season!",
  },
  summer: {
    season: "summer",
    label: "Summer",
    emoji: "☀️",
    particleColor: "#FFB347",
    particleShape: "circle",
    bannerMessage: "☀️ Summer Smile Season — Book your whitening today!",
  },
  halloween: {
    season: "halloween",
    label: "Halloween",
    emoji: "🎃",
    particleColor: "#FF6B00",
    particleShape: "star",
    bannerMessage: "🎃 Don't let Halloween candy haunt your teeth — book a check-up!",
  },
  thanksgiving: {
    season: "thanksgiving",
    label: "Thanksgiving",
    emoji: "🍂",
    particleColor: "#D2691E",
    particleShape: "leaf",
    bannerMessage: "🍂 Thankful for healthy smiles — book before the holidays!",
  },
  christmas: {
    season: "christmas",
    label: "Christmas",
    emoji: "🎄",
    particleColor: "#FFD700",
    particleShape: "snowflake",
    bannerMessage: "🎄 Holiday Special — Brighten your smile for Christmas!",
  },
  default: {
    season: "default",
    label: "Default",
    emoji: "😊",
    particleColor: "#A8D5BA",
    particleShape: "circle",
    bannerMessage: "",
  },
};

/**
 * Ramadan shifts ~11 days earlier each year.
 * Approximate Gregorian windows (update annually):
 * 2026: Feb 18 – Mar 19
 * 2027: Feb 07 – Mar 08
 * 2028: Jan 27 – Feb 25
 * For the prototype we detect using configurable window from clinicConfig.
 * Fallback: roughly late-Feb to mid-Mar.
 */
export function isRamadan(
  now: Date = new Date(),
  windowOverride?: { startMonth: number; startDay: number; endMonth: number; endDay: number }
): boolean {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const win = windowOverride ?? { startMonth: 2, startDay: 18, endMonth: 3, endDay: 19 };
  const afterStart =
    m > win.startMonth || (m === win.startMonth && d >= win.startDay);
  const beforeEnd =
    m < win.endMonth || (m === win.endMonth && d <= win.endDay);
  // handle same-month window
  if (win.startMonth === win.endMonth) return afterStart && beforeEnd;
  return afterStart && beforeEnd;
}

export function detectSeason(
  ramadanWindow?: { startMonth: number; startDay: number; endMonth: number; endDay: number }
): Season {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  if ((m === 12 && d >= 26) || (m === 1 && d <= 7)) return "newyear";
  if (m === 2 && d <= 14) return "valentine";
  if (isRamadan(now, ramadanWindow)) return "ramadan";
  if ((m === 3 && d >= 20) || (m === 4 && d <= 15)) return "easter";
  if (m >= 6 && m <= 8) return "summer";
  if (m === 10 && d >= 15) return "halloween";
  if (m === 11) return "thanksgiving";
  if (m === 12 && d <= 25) return "christmas";
  return "default";
}

export type Season =
  | "default"
  | "newyear"
  | "valentine"
  | "ramadan"
  | "eid_fitr"
  | "easter"
  | "eid_adha"
  | "summer"
  | "diwali"
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
  eid_fitr: {
    season: "eid_fitr",
    label: "Eid ul Fitr",
    emoji: "🌙",
    particleColor: "#FFD700",
    particleShape: "crescent",
    bannerMessage: "🌙 Eid Mubarak! Celebrate with a bright, healthy smile. Special offers inside!",
  },
  easter: {
    season: "easter",
    label: "Easter",
    emoji: "🌸",
    particleColor: "#C471ED",
    particleShape: "circle",
    bannerMessage: "🌸 Easter Offer — Fresh smile for a fresh season!",
  },
  eid_adha: {
    season: "eid_adha",
    label: "Eid ul Adha",
    emoji: "🐑",
    particleColor: "#C9A84C",
    particleShape: "crescent",
    bannerMessage: "🐑 Eid ul Adha Mubarak! Celebrate with family — and a healthy smile.",
  },
  summer: {
    season: "summer",
    label: "Summer",
    emoji: "☀️",
    particleColor: "#FFB347",
    particleShape: "circle",
    bannerMessage: "☀️ Summer Smile Season — Book your whitening today!",
  },
  diwali: {
    season: "diwali",
    label: "Diwali",
    emoji: "🪔",
    particleColor: "#FF8C00",
    particleShape: "star",
    bannerMessage: "🪔 Happy Diwali! Light up your smile this festive season.",
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
 * Ramadan + Eid shift ~11 days earlier each year.
 * Update windows annually in clinicConfig.
 *
 * 2026 approx dates:
 *   Ramadan:   Feb 18 – Mar 19
 *   Eid Fitr:  Mar 20 – Mar 22
 *   Eid Adha:  May 27 – May 30
 *   Diwali:    Oct 20 – Oct 22
 */
export interface SeasonWindow {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
}

function inWindow(now: Date, w: SeasonWindow): boolean {
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const afterStart = m > w.startMonth || (m === w.startMonth && d >= w.startDay);
  const beforeEnd  = m < w.endMonth  || (m === w.endMonth  && d <= w.endDay);
  if (w.startMonth === w.endMonth) return m === w.startMonth && d >= w.startDay && d <= w.endDay;
  return afterStart && beforeEnd;
}

export function detectSeason(windows?: {
  ramadan?:  SeasonWindow;
  eidFitr?:  SeasonWindow;
  eidAdha?:  SeasonWindow;
  diwali?:   SeasonWindow;
}): Season {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();

  if ((m === 12 && d >= 26) || (m === 1 && d <= 7)) return "newyear";
  if (m === 2 && d <= 14) return "valentine";

  // Eid ul Fitr — check BEFORE ramadan so the celebration day wins
  if (windows?.eidFitr && inWindow(now, windows.eidFitr)) return "eid_fitr";
  if (windows?.ramadan  && inWindow(now, windows.ramadan))  return "ramadan";

  if ((m === 3 && d >= 20) || (m === 4 && d <= 15)) return "easter";

  // Eid ul Adha
  if (windows?.eidAdha && inWindow(now, windows.eidAdha)) return "eid_adha";

  if (m >= 6 && m <= 8) return "summer";

  // Diwali (late Oct / early Nov, before halloween check)
  if (windows?.diwali && inWindow(now, windows.diwali)) return "diwali";

  if (m === 10 && d >= 15) return "halloween";
  if (m === 11) return "thanksgiving";
  if (m === 12 && d <= 25) return "christmas";

  return "default";
}

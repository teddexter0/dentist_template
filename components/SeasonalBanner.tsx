'use client';

import { useState } from 'react';
import { clinicConfig } from '@/config/clinic';
import { detectSeason, SEASON_THEMES, type Season } from '@/lib/season';

export default function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false);
  const season: Season =
    clinicConfig.season !== 'default' ? clinicConfig.season : detectSeason();
  const theme = SEASON_THEMES[season];

  if (!theme.bannerMessage || dismissed) return null;

  return (
    <div className="seasonal-banner">
      <span>{theme.bannerMessage}</span>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="ml-4 opacity-70 hover:opacity-100 font-bold text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

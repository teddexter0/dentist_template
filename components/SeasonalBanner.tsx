'use client';

import { useEffect, useState } from 'react';
import { clinicConfig } from '@/config/clinic';
import { detectSeason, type Season } from '@/lib/season';

const BANNERS: Record<Season, { message: string; visible: boolean }> = {
  default: { message: '', visible: false },
  valentine: {
    message: "💕 Valentine's Special — Smile for someone you love. Book your whitening today!",
    visible: true,
  },
  christmas: {
    message: '🎄 Christmas Offer — Gift yourself a healthy smile this festive season!',
    visible: true,
  },
  easter: {
    message: '🌸 Easter Special — Fresh season, fresh smile. Book your cleaning now!',
    visible: true,
  },
};

export default function SeasonalBanner() {
  const [dismissed, setDismissed] = useState(false);
  const season: Season =
    clinicConfig.season !== 'default' ? clinicConfig.season : detectSeason();
  const banner = BANNERS[season];

  if (!banner.visible || dismissed) return null;

  return (
    <div className="seasonal-banner">
      <span>{banner.message}</span>
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

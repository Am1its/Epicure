'use client';

import { isOpenNow } from '../lib/openingHours';
import { TEXT } from '../lib/text';

function opensAt(openingHours: string): string | null {
  const match = openingHours.match(/^(\d{2}:\d{2})-/);
  return match ? match[1] : null;
}

export function OpenNowBadge({ openingHours }: { openingHours?: string }) {
  if (!openingHours) return null;

  if (isOpenNow(openingHours)) {
    return (
      <span className="epicure-detail-open">
        <img src="/icons/Clock.svg" alt="" aria-hidden="true" width={16} height={16} />
        {TEXT.restaurantDetail.openNow}
      </span>
    );
  }

  const time = opensAt(openingHours);
  if (!time) return null;

  return (
    <span className="epicure-detail-open">
      <img src="/icons/Clock.svg" alt="" aria-hidden="true" width={16} height={16} />
      {TEXT.restaurantDetail.opensAt(time)}
    </span>
  );
}

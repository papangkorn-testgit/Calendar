'use client';

import { Theme } from '@/lib/types';
import { THAI_MONTHS, THAI_DAYS } from '@/lib/constants';

interface Props {
  theme: Theme;
  todayCount: number;
  today: Date;
}

export default function TodayStrip({ theme, todayCount, today }: Props) {
  const text = todayCount > 0 ? `มี ${todayCount} กิจกรรมวันนี้` : 'ไม่มีกิจกรรมวันนี้';
  const dateText = `วัน${THAI_DAYS[today.getDay()]}ที่ ${today.getDate()} ${THAI_MONTHS[today.getMonth()]} ${today.getFullYear() + 543}`;

  return (
    <div
      className="mx-3.5 mt-3 mb-1 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all duration-300"
      style={{ background: `linear-gradient(90deg, ${theme.strip}, ${theme.stripEnd})` }}
    >
      <div className="text-2xl select-none">{theme.flower}</div>
      <div>
        <div className="text-sm font-semibold" style={{ color: theme.txt }}>{text}</div>
        <div className="text-xs opacity-70 mt-0.5" style={{ color: theme.txt }}>{dateText}</div>
      </div>
    </div>
  );
}
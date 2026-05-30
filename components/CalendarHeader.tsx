'use client';

import { Theme } from '@/lib/types';
import { THAI_MONTHS } from '@/lib/constants';

interface Props {
  curYear: number;
  curMonth: number;
  theme: Theme;
  onPrev: () => void;
  onNext: () => void;
  onOpenTheme: () => void;
}

export default function CalendarHeader({
  curYear,
  curMonth,
  theme,
  onPrev,
  onNext,
  onOpenTheme,
}: Props) {
  return (
    <div
      className="px-5 pt-5 pb-4 rounded-b-[32px] relative overflow-hidden transition-all duration-300"
      style={{
        background: `linear-gradient(145deg, ${theme.h1} 0%, ${theme.h2} 50%, ${theme.h3} 100%)`,
      }}
    >
      {/* Gloss overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 75% 20%, rgba(255,255,255,0.35) 0%, transparent 60%)',
        }}
      />

      <div className="flex items-center justify-between relative z-10">
        {/* Prev */}
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-full bg-white/60 border-none cursor-pointer text-2xl flex items-center justify-center hover:bg-white/90 hover:scale-110 active:scale-95 transition-all"
          aria-label="เดือนก่อนหน้า"
        >
          ‹
        </button>

        {/* Center */}
        <div className="text-center">
          <div
            className="font-['Mitr'] text-3xl font-semibold tracking-wide"
            style={{ color: theme.txt }}
          >
            {THAI_MONTHS[curMonth]}
          </div>
          <div className="text-sm opacity-60 mt-0.5" style={{ color: theme.txt }}>
            พ.ศ. {curYear + 543}
          </div>
        </div>

        {/* Right: theme + bear */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTheme}
            className="w-10 h-10 rounded-full bg-white/60 border-none cursor-pointer text-xl flex items-center justify-center hover:bg-white/90 hover:scale-110 active:scale-95 transition-all"
            title="ตั้งค่าธีมสี"
            aria-label="เลือกธีมสี"
          >
            🎨
          </button>
          <div className="text-5xl leading-none select-none">{theme.bear}</div>
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full bg-white/60 border-none cursor-pointer text-2xl flex items-center justify-center hover:bg-white/90 hover:scale-110 active:scale-95 transition-all"
          aria-label="เดือนถัดไป"
        >
          ›
        </button>
      </div>
    </div>
  );
}
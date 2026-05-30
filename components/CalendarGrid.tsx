'use client';

import { MonthData, Theme } from '@/lib/types';
import { CAT_BG, CAT_TEXT, HOLIDAYS } from '@/lib/constants';

interface Props {
  curYear: number;
  curMonth: number;
  monthData: MonthData;
  today: Date;
  theme: Theme;
  onDayClick: (day: number) => void;
}

const WEEKDAY_LABELS = [
  { label: 'อา', type: 'sun' },
  { label: 'จ',  type: '' },
  { label: 'อ',  type: '' },
  { label: 'พ',  type: '' },
  { label: 'พฤ', type: '' },
  { label: 'ศ',  type: 'sat' },
  { label: 'ส',  type: '' },
];

export default function CalendarGrid({
  curYear,
  curMonth,
  monthData,
  today,
  theme,
  onDayClick,
}: Props) {
  const firstDay    = new Date(curYear, curMonth, 1).getDay();
  const daysInMonth = new Date(curYear, curMonth + 1, 0).getDate();

  const isToday = (d: number) =>
    curYear  === today.getFullYear() &&
    curMonth === today.getMonth() &&
    d        === today.getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <>
      {/* Weekday header */}
      <div className="grid grid-cols-7 px-3 pt-2.5 pb-1 gap-0.5">
        {WEEKDAY_LABELS.map(({ label, type }) => (
          <div
            key={label}
            className="text-center text-xs font-bold py-1"
            style={{
              color:   type === 'sun' ? theme.sunC : type === 'sat' ? theme.satC : theme.txt,
              opacity: type ? 1 : 0.6,
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 px-2 pb-2 gap-[3px]">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="min-h-[70px]" />;
          }

          const dow     = (firstDay + day - 1) % 7;
          const isSun   = dow === 0;
          const isSat   = dow === 6;
          const todayDay = isToday(day);
          const events  = monthData[day] || [];
          const hKey    = `${curMonth}-${day}`;
          const holiday = HOLIDAYS[hKey];

          const numColor = todayDay
            ? '#fff'
            : isSun ? theme.sunC
            : isSat ? theme.satC
            : theme.txt;

          return (
            <div
              key={day}
              onClick={() => onDayClick(day)}
              className="min-h-[70px] rounded-xl p-1 cursor-pointer hover:bg-white/70 active:scale-[0.97] transition-all"
            >
              {/* Day number */}
              <div
                className="text-[13px] font-semibold w-7 h-7 mx-auto mb-0.5 flex items-center justify-center rounded-full"
                style={{
                  background: todayDay ? theme.today : 'transparent',
                  color: numColor,
                }}
              >
                {day}
              </div>

              {/* Holiday badge */}
              {holiday && (
                <div className="text-[9px] rounded-[5px] px-1 py-0.5 mb-0.5 leading-relaxed truncate bg-[#fce4ec] text-[#c2185b]">
                  ⭐ {holiday}
                </div>
              )}

              {/* Events (max 2 + overflow) */}
              {events.slice(0, 2).map((ev, i) => (
                <div
                  key={i}
                  className="text-[9px] font-semibold rounded-[5px] px-1 py-0.5 mb-0.5 truncate leading-relaxed"
                  style={{ background: CAT_BG[ev.cat], color: CAT_TEXT[ev.cat] }}
                >
                  {ev.name}
                </div>
              ))}
              {events.length > 2 && (
                <div
                  className="text-[9px] font-semibold rounded-[5px] px-1 py-0.5 truncate leading-relaxed"
                  style={{ background: CAT_BG[0], color: CAT_TEXT[0] }}
                >
                  +{events.length - 2} อื่นๆ
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
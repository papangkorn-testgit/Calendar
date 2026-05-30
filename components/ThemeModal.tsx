'use client';

import { useState } from 'react';
import { Theme, ThemePref } from '@/lib/types';
import { THEMES } from '@/lib/constants';

interface Props {
  isOpen: boolean;
  activeTheme: Theme;
  onClose: () => void;
  onApply: (t: Theme, pref: ThemePref) => void;
}

export default function ThemeModal({
  isOpen,
  activeTheme,
  onClose,
  onApply,
}: Props) {
  const [cp1, setCp1] = useState('#fce4ec');
  const [cp2, setCp2] = useState('#f9d0e4');
  const [cp3, setCp3] = useState('#ede7f6');
  const [cp4, setCp4] = useState('#6d4c41');
  const [cp5, setCp5] = useState('#f48fb1');
  const [cp6, setCp6] = useState('#fdf6f0');

  if (!isOpen) return null;

  const handlePreset = (t: Theme) => {
    onApply(t, { type: 'preset', id: t.id });
  };

  const handleCustom = () => {
    const t: Theme = {
      id: 'custom', name: '🖌️ Custom', sub: 'สีของฉัน',
      bear: '🐻', flower: '🌸',
      h1: cp1, h2: cp2, h3: cp3,
      txt: cp4, today: cp5, bg: cp6,
      strip: cp1, stripEnd: cp3,
      sunC: '#e57373', satC: cp5,
      sw: [cp1, cp5, cp3],
    };
    onApply(t, { type: 'custom', data: t });
  };

  const colorPickers = [
    { val: cp1, set: setCp1, label: 'header 1' },
    { val: cp2, set: setCp2, label: 'header 2' },
    { val: cp3, set: setCp3, label: 'accent' },
    { val: cp4, set: setCp4, label: 'ข้อความ' },
    { val: cp5, set: setCp5, label: 'วันนี้' },
    { val: cp6, set: setCp6, label: 'พื้นหลัง' },
  ];

  return (
    <div
      className="fixed inset-0 bg-[rgba(60,40,30,0.4)] z-[200] flex items-end justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#fff9f6] rounded-t-[28px] p-5 pb-9 w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-slide-up relative">

        {/* Handle */}
        <div className="w-10 h-1 bg-[#e0d0c8] rounded mx-auto mb-4" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[18px] right-[18px] w-8 h-8 rounded-full bg-[#f5e6de] border-none cursor-pointer text-[15px] text-[#6d4c41] flex items-center justify-center hover:bg-[#f0d5c8]"
          aria-label="ปิด"
        >
          ✕
        </button>

        <div className="font-['Mitr'] text-lg text-[#6d4c41] mb-3.5">
          🎨 เลือกธีมสี
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-1.5">
          {THEMES.map((t) => (
            <div
              key={t.id}
              onClick={() => handlePreset(t)}
              className={`rounded-[18px] p-3.5 cursor-pointer border-[3px] transition-all hover:scale-[1.03] hover:shadow-lg relative overflow-hidden ${
                activeTheme.id === t.id
                  ? 'border-black/25'
                  : 'border-transparent'
              }`}
              style={{
                background: `linear-gradient(135deg, ${t.h1}, ${t.h3})`,
              }}
            >
              {/* Check mark */}
              {activeTheme.id === t.id && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-xs">
                  ✓
                </div>
              )}
              <div
                className="font-['Mitr'] text-sm font-medium mb-0.5"
                style={{ color: t.txt }}
              >
                {t.name}
              </div>
              <div
                className="text-[11px] opacity-70"
                style={{ color: t.txt }}
              >
                {t.sub}
              </div>
              <div className="flex gap-1.5 mt-2.5">
                {t.sw.map((s, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border-2 border-white/60"
                    style={{ background: s }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Custom color section */}
        <div className="mt-5 border-t-2 border-dashed border-[#e0cfc8] pt-4">
          <span className="text-xs font-semibold text-[#7a5c4e] block mb-3">
            🖌️ กำหนดสีเอง (Custom)
          </span>
          <div className="flex gap-3 flex-wrap mb-3.5">
            {colorPickers.map(({ val, set, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <input
                  type="color"
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  className="w-11 h-11 rounded-full border-[2.5px] border-[#f0d5c8] cursor-pointer p-0.5"
                />
                <span className="text-[10px] text-[#7a5c4e] font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleCustom}
            className="w-full py-3.5 rounded-[18px] border-none font-['Mitr'] text-[15px] text-white cursor-pointer font-medium hover:opacity-90 active:scale-[0.98] transition-all"
            style={{
              background: 'linear-gradient(135deg, #f48fb1, #ce93d8)',
            }}
          >
            ✨ ใช้สีนี้
          </button>
        </div>
      </div>
    </div>
  );
}
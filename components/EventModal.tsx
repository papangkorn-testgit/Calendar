'use client';

import { useState, useEffect, useRef } from 'react';
import { CalEvent, MonthData, Theme } from '@/lib/types';
import { THAI_MONTHS, CAT_COLORS, CAT_BG, CAT_TEXT } from '@/lib/constants';

interface Props {
  isOpen: boolean;
  selectedDay: number | null;
  curYear: number;
  curMonth: number;
  monthData: MonthData;
  theme: Theme;
  onClose: () => void;
  onAdd: (day: number, ev: CalEvent) => void;
  onDelete: (day: number, idx: number) => void;
}

const QUICK_PICKS = [
  { label: '🏥 ขึ้นเวรยุทธิ์', cat: 0 },
  { label: '🏨 ขึ้นเวร OPD',   cat: 0 },
  { label: '🚐 ออกหน่วย',      cat: 0 },
  { label: '💊 เก็บชาจหมอ',    cat: 1 },
  { label: '🎂 วันเกิดพ่อ',    cat: 3 },
  { label: '🎂 วันเกิดแม่',    cat: 3 },
];

const CAT_LABELS = [
  '💼 งาน', '🏥 นัดหมอ', '🌿 ส่วนตัว', '⭐ สำคัญ', '🎉 กิจกรรม',
];

export default function EventModal({
  isOpen,
  selectedDay,
  curYear,
  curMonth,
  monthData,
  theme,
  onClose,
  onAdd,
  onDelete,
}: Props) {
  const [inputVal, setInputVal]           = useState('');
  const [selectedQuicks, setSelectedQuicks] = useState<number[]>([]); // ← array แทน single
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setInputVal('');
      setSelectedQuicks([]); // ← reset ทุกครั้ง
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, selectedDay]);

  if (!isOpen || selectedDay === null) return null;

  const events = monthData[selectedDay] || [];

  const toggleQuick = (i: number) => {
    setSelectedQuicks(prev =>
      prev.includes(i)
        ? prev.filter(x => x !== i) // ถ้ามีแล้ว → เอาออก
        : [...prev, i]              // ถ้ายังไม่มี → เพิ่ม
    );
  };

  const hasInput  = inputVal.trim().length > 0;
  const hasQuick  = selectedQuicks.length > 0;
  const readyToSave = hasInput || hasQuick;

  const handleSave = () => {
    if (!readyToSave) return;

    // บันทึก quick picks ทุกตัวที่เลือก
    selectedQuicks.forEach(i => {
      const q = QUICK_PICKS[i];
      onAdd(selectedDay, { name: q.label, cat: q.cat });
    });

    // บันทึกที่พิมพ์เองด้วย (ถ้ามี)
    if (hasInput) {
      onAdd(selectedDay, { name: inputVal.trim(), cat: 0 });
    }

    onClose(); // กลับหน้าหลัก
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(60,40,30,0.4)] z-[100] flex items-end justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-[#fff9f6] rounded-t-[28px] p-5 pb-8 w-full max-w-[480px] max-h-[85vh] overflow-y-auto animate-slide-up relative">

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

        {/* Title */}
        <div className="font-['Mitr'] text-lg text-[#6d4c41] mb-3.5">
          📅 {selectedDay} {THAI_MONTHS[curMonth]} {curYear + 543}
        </div>

        {/* Events list */}
        <div className="mb-4">
          {events.length === 0 ? (
            <div className="text-center text-[#ccc] text-sm py-3">
              ยังไม่มีกิจกรรม 🌸
            </div>
          ) : (
            events.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2.5 rounded-[13px] mb-1.5 text-sm"
                style={{ background: CAT_BG[ev.cat] }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: CAT_COLORS[ev.cat] }}
                />
                <div className="flex-1" style={{ color: CAT_TEXT[ev.cat] }}>
                  {ev.name}
                </div>
                <div className="text-[10px] text-[#bbb] mr-1">
                  {CAT_LABELS[ev.cat]}
                </div>
                <button
                  onClick={() => onDelete(selectedDay, i)}
                  className="w-6 h-6 rounded-full bg-[#ffebee] border-none cursor-pointer text-[13px] text-[#e57373] flex items-center justify-center hover:bg-[#ffcdd2]"
                  aria-label="ลบ"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── QUICK PICK ── */}
        <div className="border-t-2 border-dashed border-[#f0d5c8] pt-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#7a5c4e]">
              ⚡ เลือกด่วน
            </span>
            {/* แสดงจำนวนที่เลือก */}
            {hasQuick && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f48fb1] text-white">
                เลือกแล้ว {selectedQuicks.length} รายการ
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {QUICK_PICKS.map((q, i) => {
              const isSelected = selectedQuicks.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleQuick(i)}
                  className="px-3 py-2.5 rounded-2xl text-[12px] font-semibold text-left transition-all duration-200 hover:scale-[1.03] hover:shadow-md active:scale-[0.97]"
                  style={{
                    background: isSelected ? CAT_TEXT[q.cat] : CAT_BG[q.cat],
                    color:      isSelected ? '#fff' : CAT_TEXT[q.cat],
                    boxShadow:  isSelected ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                    transform:  isSelected ? 'scale(1.04)' : '',
                  }}
                >
                  {isSelected ? '✓ ' : ''}{q.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── พิมพ์เพิ่มเอง ── */}
        <div className="border-t-2 border-dashed border-[#f0d5c8] pt-4">
          <span className="text-xs font-semibold text-[#7a5c4e] block mb-1.5">
            ✏️ หรือพิมพ์เพิ่มเอง
          </span>
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && readyToSave && handleSave()}
            className="w-full px-3.5 py-2.5 rounded-[14px] border-[1.5px] border-[#f0d5c8] bg-white font-['Sarabun'] text-sm text-[#4a3728] outline-none mb-3 focus:border-[#f48fb1] transition-colors"
            placeholder="พิมพ์กิจกรรมเพิ่มเติม..."
            maxLength={30}
          />

          {/* ── ปุ่มบันทึก ── */}
          <button
            onClick={handleSave}
            disabled={!readyToSave}
            className="w-full py-3.5 rounded-[18px] border-none font-['Mitr'] text-[15px] text-white font-medium tracking-wide active:scale-[0.98] transition-all duration-300"
            style={{
              background: readyToSave
                ? `linear-gradient(135deg, #d81b60, #880e4f)`
                : `linear-gradient(135deg, ${theme.today}80, ${theme.h2}80)`,
              opacity: readyToSave ? 1 : 0.5,
              cursor:  readyToSave ? 'pointer' : 'not-allowed',
            }}
          >
            {readyToSave
              ? `✓ บันทึก ${selectedQuicks.length + (hasInput ? 1 : 0)} รายการ`
              : '+ บันทึก'}
          </button>
        </div>

      </div>
    </div>
  );
}
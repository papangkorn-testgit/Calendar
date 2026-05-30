'use client';

import { useState, useEffect } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';
import TodayStrip from '@/components/TodayStrip';
import EventModal from '@/components/EventModal';
import ThemeModal from '@/components/ThemeModal';

export default function Home() {
  const {
    curYear, curMonth, monthData, activeTheme, today,
    changeMonth, applyTheme, addEvent, deleteEvent,
  } = useCalendar();

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.background = activeTheme.bg;
  }, [activeTheme]);

  const todayCount = (monthData[today.getDate()] || []).length;

  return (
    <main
      className="max-w-[480px] mx-auto min-h-screen pb-16 transition-all duration-300"
      style={{ background: activeTheme.bg }}
    >
      <CalendarHeader
        curYear={curYear}
        curMonth={curMonth}
        theme={activeTheme}
        onPrev={() => changeMonth(-1)}
        onNext={() => changeMonth(1)}
        onOpenTheme={() => setThemeModalOpen(true)}
      />

      <TodayStrip
        theme={activeTheme}
        todayCount={todayCount}
        today={today}
      />

      <CalendarGrid
        curYear={curYear}
        curMonth={curMonth}
        monthData={monthData}
        today={today}
        theme={activeTheme}
        onDayClick={(day) => {
          setSelectedDay(day);
          setEventModalOpen(true);
        }}
      />

      <EventModal
        isOpen={eventModalOpen}
        selectedDay={selectedDay}
        curYear={curYear}
        curMonth={curMonth}
        monthData={monthData}
        theme={activeTheme}
        onClose={() => setEventModalOpen(false)}
        onAdd={addEvent}
        onDelete={deleteEvent}
      />

      <ThemeModal
        isOpen={themeModalOpen}
        activeTheme={activeTheme}
        onClose={() => setThemeModalOpen(false)}
        onApply={(t, pref) => {
          applyTheme(t, pref);
          setThemeModalOpen(false);
        }}
      />
    </main>
  );
}
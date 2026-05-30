'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalEvent, MonthData, Theme, ThemePref } from '@/lib/types';
import { THEMES } from '@/lib/constants';

function evKey(y: number, m: number) { return `cute_cal_events_${y}_${m}`; }
const TH_KEY = 'cute_cal_theme';

export function useCalendar() {
  const today = new Date();

  const [curYear, setCurYear]   = useState(today.getFullYear());
  const [curMonth, setCurMonth] = useState(today.getMonth());
  const [monthData, setMonthData] = useState<MonthData>({});
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);

  // Load events from localStorage
  const loadEvents = useCallback((y: number, m: number): MonthData => {
    try {
      return JSON.parse(localStorage.getItem(evKey(y, m)) || '{}');
    } catch { return {}; }
  }, []);

  const persistEvents = useCallback((y: number, m: number, data: MonthData) => {
    localStorage.setItem(evKey(y, m), JSON.stringify(data));
  }, []);

  const loadThemePref = useCallback((): ThemePref | null => {
    try { return JSON.parse(localStorage.getItem(TH_KEY) || 'null'); }
    catch { return null; }
  }, []);

  const persistTheme = useCallback((pref: ThemePref) => {
    localStorage.setItem(TH_KEY, JSON.stringify(pref));
  }, []);

  // Init
  useEffect(() => {
    const saved = loadThemePref();
    if (saved?.type === 'preset' && saved.id) {
      const t = THEMES.find(x => x.id === saved.id);
      setActiveTheme(t ?? THEMES[0]);
    } else if (saved?.type === 'custom' && saved.data) {
      setActiveTheme(saved.data);
    }
    setMonthData(loadEvents(today.getFullYear(), today.getMonth()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeMonth = useCallback((dir: number) => {
    setCurYear(y => {
      setCurMonth(m => {
        let nm = m + dir;
        let ny = y;
        if (nm > 11) { nm = 0; ny = y + 1; }
        if (nm < 0)  { nm = 11; ny = y - 1; }
        setMonthData(loadEvents(ny, nm));
        setCurYear(ny);
        return nm;
      });
      return y;
    });
  }, [loadEvents]);

  const applyTheme = useCallback((t: Theme, pref: ThemePref) => {
    setActiveTheme(t);
    persistTheme(pref);
  }, [persistTheme]);

  const addEvent = useCallback((day: number, event: CalEvent) => {
    setMonthData(prev => {
      const updated = { ...prev, [day]: [...(prev[day] || []), event] };
      persistEvents(curYear, curMonth, updated);
      return updated;
    });
  }, [curYear, curMonth, persistEvents]);

  const deleteEvent = useCallback((day: number, idx: number) => {
    setMonthData(prev => {
      const arr = [...(prev[day] || [])];
      arr.splice(idx, 1);
      const updated = { ...prev, [day]: arr };
      persistEvents(curYear, curMonth, updated);
      return updated;
    });
  }, [curYear, curMonth, persistEvents]);

  return {
    curYear, curMonth, monthData,
    activeTheme, today,
    changeMonth, applyTheme, addEvent, deleteEvent,
    persistTheme,
  };
}
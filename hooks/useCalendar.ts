'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalEvent, MonthData, Theme, ThemePref } from '@/lib/types';
import { THEMES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

const TH_KEY = 'cute_cal_theme';

export function useCalendar() {
  const today = new Date();

  const [curYear,     setCurYear]    = useState(today.getFullYear());
  const [curMonth,    setCurMonth]   = useState(today.getMonth());
  const [monthData,   setMonthData]  = useState<MonthData>({});
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
  const [loading,     setLoading]    = useState(false);

  // ── THEME (localStorage เหมือนเดิม) ──
  const loadThemePref = useCallback((): ThemePref | null => {
    try { return JSON.parse(localStorage.getItem(TH_KEY) || 'null'); }
    catch { return null; }
  }, []);

  const persistTheme = useCallback((pref: ThemePref) => {
    localStorage.setItem(TH_KEY, JSON.stringify(pref));
  }, []);

  const applyTheme = useCallback((t: Theme, pref: ThemePref) => {
    setActiveTheme(t);
    persistTheme(pref);
  }, [persistTheme]);

  // ── LOAD EVENTS จาก Supabase ──
  const loadEvents = useCallback(async (y: number, m: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('year', y)
      .eq('month', m);

    if (error) {
      console.error('Load error:', error);
      setLoading(false);
      return;
    }

    const result: MonthData = {};
    (data || []).forEach((row: any) => {
      if (!result[row.day]) result[row.day] = [];
      result[row.day].push({ id: row.id, name: row.name, cat: row.cat });
    });

    setMonthData(result);
    setLoading(false);
  }, []);

  // ── CHANGE MONTH ──
  const changeMonth = useCallback((dir: number) => {
    let nm = curMonth + dir;
    let ny = curYear;
    if (nm > 11) { nm = 0;  ny = curYear + 1; }
    if (nm < 0)  { nm = 11; ny = curYear - 1; }
    setCurMonth(nm);
    setCurYear(ny);
    loadEvents(ny, nm);
  }, [curMonth, curYear, loadEvents]);

  // ── ADD EVENT ──
  const addEvent = useCallback(async (day: number, event: CalEvent) => {
    const { data, error } = await supabase
      .from('events')
      .insert({
        year:  curYear,
        month: curMonth,
        day,
        name:  event.name,
        cat:   event.cat,
      })
      .select()
      .single();

    if (error) { console.error('Add error:', error); return; }

    setMonthData(prev => ({
      ...prev,
      [day]: [...(prev[day] || []), { id: data.id, name: data.name, cat: data.cat }],
    }));
  }, [curYear, curMonth]);

  // ── DELETE EVENT ──
  const deleteEvent = useCallback(async (day: number, idx: number) => {
    const event = monthData[day]?.[idx];
    if (!event?.id) return;

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', event.id);

    if (error) { console.error('Delete error:', error); return; }

    setMonthData(prev => {
      const arr = [...(prev[day] || [])];
      arr.splice(idx, 1);
      return { ...prev, [day]: arr };
    });
  }, [monthData]);

  // ── INIT ──
  useEffect(() => {
    const saved = loadThemePref();
    if (saved?.type === 'preset' && saved.id) {
      const t = THEMES.find(x => x.id === saved.id);
      setActiveTheme(t ?? THEMES[0]);
    } else if (saved?.type === 'custom' && saved.data) {
      setActiveTheme(saved.data);
    }
    loadEvents(today.getFullYear(), today.getMonth());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    curYear, curMonth, monthData,
    activeTheme, today, loading,
    changeMonth, applyTheme, addEvent, deleteEvent,
  };
}
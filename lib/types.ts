export interface CalEvent {
  name: string;
  cat: number;
}

export interface MonthData {
  [day: number]: CalEvent[];
}

export interface Theme {
  id: string;
  name: string;
  sub: string;
  bear: string;
  flower: string;
  h1: string;
  h2: string;
  h3: string;
  txt: string;
  today: string;
  bg: string;
  strip: string;
  stripEnd: string;
  sunC: string;
  satC: string;
  sw: string[];
}

export interface ThemePref {
  type: 'preset' | 'custom';
  id?: string;
  data?: Theme;
}
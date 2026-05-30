import { Theme } from './types';

export const THAI_MONTHS = [
  'มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน',
  'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม',
];

export const THAI_DAYS = [
  'อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์',
];

export const CAT_COLORS = ['#f48fb1','#ce93d8','#81c784','#fff176','#ffb74d'];
export const CAT_BG     = ['#fce4ec','#ede7f6','#e8f5e9','#fffde7','#fff3e0'];
export const CAT_TEXT   = ['#c2185b','#7b1fa2','#2e7d32','#f57f17','#bf360c'];
export const CAT_LABELS = ['💼 งาน','🏥 นัดหมอ','🌿 ส่วนตัว','⭐ สำคัญ','🎉 กิจกรรม'];

export const HOLIDAYS: Record<string, string> = {
  '0-1': 'วันขึ้นปีใหม่',
  '4-1': 'วันแรงงาน',
  '4-4': 'วันฉัตรมงคล',
  '6-28': 'วันเฉลิมพระชนมพรรษา ร.10',
  '7-12': 'วันแม่แห่งชาติ',
  '11-5': 'วันรัฐธรรมนูญ',
  '11-31': 'วันสิ้นปี',
};

export const THEMES: Theme[] = [
  {
    id: 'pink', name: '🩷 Pinky Bear', sub: 'หวานๆ สีชมพู', bear: '🐻', flower: '🌸',
    h1: '#fce4ec', h2: '#f8d0e5', h3: '#ede7f6', txt: '#6d4c41', today: '#f48fb1',
    bg: '#fdf6f0', strip: '#fce4ec', stripEnd: '#ede7f6', sunC: '#e57373', satC: '#9c6caf',
    sw: ['#fce4ec', '#f48fb1', '#ede7f6'],
  },
  {
    id: 'mint', name: '🌿 Mint Choco', sub: 'เขียวมินท์สดใส', bear: '🐨', flower: '🌼',
    h1: '#d4f1e8', h2: '#b2ead8', h3: '#c8f0e4', txt: '#2e5d4b', today: '#26a98b',
    bg: '#f2fdf8', strip: '#d4f1e8', stripEnd: '#c3eed9', sunC: '#e57373', satC: '#26a98b',
    sw: ['#d4f1e8', '#26a98b', '#b2ead8'],
  },
  {
    id: 'sky', name: '💙 Sky Cotton', sub: 'ฟ้าอ่อนสบายตา', bear: '🐼', flower: '⭐',
    h1: '#daeeff', h2: '#c2e0ff', h3: '#e8f4ff', txt: '#1a3d5c', today: '#4a9fd4',
    bg: '#f0f8ff', strip: '#daeeff', stripEnd: '#cde8ff', sunC: '#e57373', satC: '#4a9fd4',
    sw: ['#daeeff', '#4a9fd4', '#c2e0ff'],
  },
  {
    id: 'lavender', name: '💜 Lavender', sub: 'ม่วงลาเวนเดอร์', bear: '🦔', flower: '🔮',
    h1: '#e8d5f5', h2: '#d8bff0', h3: '#f3e9fc', txt: '#4a2870', today: '#9b59d6',
    bg: '#f9f2ff', strip: '#e8d5f5', stripEnd: '#d8bff0', sunC: '#e57373', satC: '#9b59d6',
    sw: ['#e8d5f5', '#9b59d6', '#d8bff0'],
  },
  {
    id: 'peach', name: '🍑 Peach Milk', sub: 'พีชนมสดหอมหวาน', bear: '🐹', flower: '🌺',
    h1: '#ffe8d6', h2: '#ffd5b8', h3: '#fff0e4', txt: '#7a3c1a', today: '#ff7043',
    bg: '#fff8f5', strip: '#ffe8d6', stripEnd: '#ffd8c0', sunC: '#e57373', satC: '#ff7043',
    sw: ['#ffe8d6', '#ff7043', '#ffd5b8'],
  },
  {
    id: 'dark', name: '🌙 Midnight', sub: 'กลางคืนลึกลับ', bear: '🦉', flower: '🌟',
    h1: '#2d2050', h2: '#231940', h3: '#1a1030', txt: '#e8d5ff', today: '#9b59d6',
    bg: '#120d24', strip: '#2d2050', stripEnd: '#231940', sunC: '#ff8a80', satC: '#ce93d8',
    sw: ['#2d2050', '#9b59d6', '#e8d5ff'],
  },
];
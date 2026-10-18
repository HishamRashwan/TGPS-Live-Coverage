import { wixItems, wixImage } from './wix';

// Collection "2026" (current-year agenda). Times are Riyadh (UTC+3).
const COLLECTION = '2026';
const DAY_DATE: Record<number, string> = { 1: '2026-10-25', 2: '2026-10-26' };

export type Person = { name: string; role: string; photo?: string };
export type Session = {
  id: string;
  day: number;
  start: number; // epoch ms
  end: number;
  label: string; // "10:00 – 10:20"
  title: string;
  type: string;
  description: string;
  speakers: Person[];
  moderators: Person[];
  status: 'live' | 'upcoming' | 'past';
};

const pad = (n: number | string) => String(n).padStart(2, '0');
const person = (s: any): Person => ({
  name: String(s.title_fld ?? '').trim(),
  role: String(s.imagealttext_fld ?? '').trim(),
  photo: wixImage(s.image_fld, 160),
});

// day1 is a tags field; accept "Day 1", ["Day 1"], "25 Oct" etc.
function dayOf(v: unknown): number {
  const s = (Array.isArray(v) ? v.join(' ') : String(v ?? '')).toLowerCase();
  if (/day\s*1|\b25\b/.test(s)) return 1;
  if (/day\s*2|\b26\b/.test(s)) return 2;
  return 0;
}

export async function getAgenda(now = Date.now()): Promise<Session[]> {
  const rows = await wixItems(COLLECTION);
  const out: Session[] = [];
  for (const r of rows) {
    const day = dayOf(r.day1);
    const t = String(r.startTime ?? '').match(/(\d{1,2}):(\d{2})/);
    if (!day || !t || !r.sessionName || r.published !== true) continue;
    const start = Date.parse(`${DAY_DATE[day]}T${pad(t[1])}:${t[2]}:00+03:00`);
    const end = start + (Number(r.durationInMinutes) || 30) * 60_000;
    const fmt = (ms: number) => new Date(ms + 3 * 3600_000).toISOString().slice(11, 16);
    out.push({
      id: r._id,
      day,
      start,
      end,
      label: `${fmt(start)} – ${fmt(end)}`,
      title: String(r.sessionName).trim(),
      type: String(r.sessionType ?? '').trim(),
      description: String(r.sessionDescriptionEn ?? '').trim(),
      speakers: (r.speakers ?? []).map(person),
      moderators: (r.moderators ?? []).map(person),
      status: now >= end ? 'past' : now >= start ? 'live' : 'upcoming',
    });
  }
  return out.sort((a, b) => a.start - b.start);
}

/** Panel groups: Live Now = live + next 3, Upcoming = all upcoming, Past = finished sessions. */
export function groupAgenda(sessions: Session[]) {
  const live = sessions.filter((s) => s.status === 'live');
  const upcoming = sessions.filter((s) => s.status === 'upcoming');
  return {
    live: live.find((s) => !/break|end of day/i.test(s.type + s.title)) ?? live[0],
    now: [...live, ...upcoming.slice(0, 3)],
    upcoming,
    past: sessions.filter((s) => s.status === 'past').reverse(),
  };
}

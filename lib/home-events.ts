// Computes the homepage "upcoming events" list for a given instant, using
// store-local calendar days in America/New_York (independent of the
// visitor's or build server's timezone).
export type HomeEventInput = {
  id: string; title: string; time: string; description: string; price?: string;
  isRecurring?: boolean; dayOfWeek?: number; date?: string;
};
export type HomeEventItem = {
  id: string; title: string; date: string; time: string; description: string; price?: string; isRecurring?: boolean;
};

const TZ = 'America/New_York';

/** YYYY-MM-DD of `now` in store-local time (ET). */
export function etYMD(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

function addDays(ymd: string, n: number): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

function dow(ymd: string): number {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function upcomingHomeEvents(events: HomeEventInput[], now: Date, max = 4, horizonDays = 14): HomeEventItem[] {
  const today = etYMD(now);
  const horizon = addDays(today, horizonDays);
  const todayDow = dow(today);
  const special: HomeEventItem[] = [];
  const recurring: HomeEventItem[] = [];
  for (const ev of events) {
    const base = { id: ev.id, title: ev.title, time: ev.time, description: ev.description, price: ev.price };
    if (ev.isRecurring && typeof ev.dayOfWeek === 'number') {
      recurring.push({ ...base, date: addDays(today, (ev.dayOfWeek - todayDow + 7) % 7), isRecurring: true });
    } else if (!ev.isRecurring && ev.date && ev.date >= today && ev.date <= horizon) {
      special.push({ ...base, date: ev.date, isRecurring: false });
    }
  }
  const byDate = (a: HomeEventItem, b: HomeEventItem) => a.date.localeCompare(b.date);
  // One-off events (prereleases etc.) always get a slot first; recurring fill the rest.
  const picked = special.sort(byDate).slice(0, max);
  picked.push(...recurring.sort(byDate).slice(0, max - picked.length));
  return picked.sort(byDate);
}

// Readable names for the codes stored in the database, plus date formatting.
// Use these everywhere instead of writing names by hand, so every page matches.

export const PROJECT_TYPES = [
  { value: 'event', label: 'Event' },
  { value: 'livestream', label: 'Livestream' },
  { value: 'brand_film', label: 'Brand film' },
  { value: 'documentary', label: 'Documentary' },
];

export const PROJECT_STATUSES = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'archived', label: 'Archived' },
];

function findLabel(list, value) {
  return list.find((item) => item.value === value)?.label ?? 'Unknown';
}

// typeLabel('brand_film') -> "Brand film"
export const typeLabel = (value) => findLabel(PROJECT_TYPES, value);

// statusLabel('delivered') -> "Delivered"
export const statusLabel = (value) => findLabel(PROJECT_STATUSES, value);

// formatDate('2026-12-12') -> "12 Dec 2026"
// Date-only values are read as UTC so the day never shifts with the user's time zone.
export function formatDate(value) {
  if (!value) return '–';
  return new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// formatDateTime('2026-09-05T12:00:00Z') -> "5 Sept 2026, 13:00" (local time)
export function formatDateTime(value) {
  if (!value) return '–';
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// formatDateRange('2026-09-01', '2026-10-15') -> "1 Sept – 15 Oct 2026"
// Same day -> "12 Dec 2026"
export function formatDateRange(start, end) {
  if (!start && !end) return 'No dates yet';
  if (!start || !end || start === end) return formatDate(start || end);

  const sameYear = start.slice(0, 4) === end.slice(0, 4);
  const startText = sameYear
    ? new Date(`${start}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
    : formatDate(start);
  return `${startText} – ${formatDate(end)}`;
}

// Today's date as "YYYY-MM-DD" (UTC), so it can be compared with project dates.
export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(from, to) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// A short "how is it going" hint for projects that are not finished yet.
// Returns { text, tone } or null. tone: 'info' | 'warn' | 'late'
export function timingLabel(project, today = todayISO()) {
  const { status, start_date: start, end_date: end } = project;
  if (!['planning', 'active'].includes(status) || !start || !end) return null;

  if (today < start) {
    const days = daysBetween(today, start);
    return { text: days === 1 ? 'Starts tomorrow' : `Starts in ${plural(days, 'day')}`, tone: days <= 7 ? 'warn' : 'info' };
  }
  if (today <= end) {
    const days = daysBetween(today, end);
    if (days === 0) return { text: 'Ends today', tone: 'warn' };
    return { text: `Ends in ${plural(days, 'day')}`, tone: days <= 3 ? 'warn' : 'info' };
  }
  return { text: `Past end date by ${plural(daysBetween(end, today), 'day')}`, tone: 'late' };
}

import type { NewsItem } from '@/types/content';

/** Local calendar date YYYY-MM-DD (no time / timezone surprises for “today”). */
export function todayLocalISODate(): string {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, '0');
  const d = String(n.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Registration is allowed when not explicitly closed and the event is today or in the future
 * (uses `eventDate` when set; otherwise falls back to legacy `registrationOpen` only).
 */
export function isEventRegistrationAvailable(item: NewsItem): boolean {
  if (item.registrationOpen === false) return false;
  if (item.eventDate) {
    return item.eventDate >= todayLocalISODate();
  }
  /* No eventDate: treat as open unless explicitly closed (already handled above). */
  return true;
}

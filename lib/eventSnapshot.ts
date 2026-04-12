/** Client-safe URL for the event snapshot PDF (opens inline in a new tab when a file exists). */
export function getEventSnapshotHref(slug: string): string {
  return `/api/events/snapshot/${encodeURIComponent(slug)}`;
}

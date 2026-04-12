import { access, constants } from 'fs/promises';
import path from 'path';
import type { NewsItem } from '@/types/content';

const PDF_DIR = path.join(process.cwd(), 'data', 'pdf');

/** Reject path traversal and separators; allow spaces and typical filename characters. */
function isSafePdfBasename(name: string): boolean {
  if (!name || name !== path.basename(name)) return false;
  if (name.includes('..')) return false;
  if (/[/\\]/.test(name)) return false;
  if (!name.toLowerCase().endsWith('.pdf')) return false;
  if (/[\x00-\x1f\x7f]/.test(name)) return false;
  return true;
}

/**
 * Resolves an on-disk path under data/pdf/ for this event, if a file exists.
 * Tries `snapshotPdf` from data, then `{slug}.pdf`.
 */
export async function resolveEventSnapshotPath(item: NewsItem): Promise<string | null> {
  const candidates: string[] = [];
  if (item.snapshotPdf?.trim()) candidates.push(item.snapshotPdf.trim());
  candidates.push(`${item.slug}.pdf`);

  const seen = new Set<string>();
  for (const name of candidates) {
    if (!name || seen.has(name)) continue;
    seen.add(name);
    if (!isSafePdfBasename(name)) continue;
    const full = path.join(PDF_DIR, name);
    try {
      await access(full, constants.R_OK);
      return full;
    } catch {
      /* try next candidate */
    }
  }
  return null;
}

import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { loadNewsItemBySlug } from '@/lib/server/news';
import { resolveEventSnapshotPath } from '@/lib/server/eventSnapshot';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { slug: string } };

function snapshotHtmlResponse(status: number, title: string, message: string) {
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(title)}</title><style>body{font-family:system-ui,sans-serif;max-width:28rem;margin:3rem auto;padding:0 1.25rem;color:#334155;line-height:1.5}a{color:#2867AE}</style></head><body><h1 style="font-size:1.25rem">${esc(title)}</h1><p>${esc(message)}</p><p><a href="/events">Back to Events</a></p></body></html>`;
  return new NextResponse(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const item = await loadNewsItemBySlug(params.slug);
    if (!item) {
      return snapshotHtmlResponse(404, 'Event not found', 'There is no event for this link.');
    }
    const diskPath = await resolveEventSnapshotPath(item);
    if (!diskPath) {
      return snapshotHtmlResponse(
        404,
        'Document not available',
        'This event summary is not available at the moment. Please try again later, or return to the events page.'
      );
    }
    const buf = await readFile(diskPath);
    const filename = path.basename(diskPath);
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return snapshotHtmlResponse(500, 'Something went wrong', 'Could not load the snapshot. Please try again later.');
  }
}

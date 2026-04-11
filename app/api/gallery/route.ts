import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { GalleryContent } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readDataJson<GalleryContent>('gallery.json');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load gallery' },
      { status: 500 }
    );
  }
}

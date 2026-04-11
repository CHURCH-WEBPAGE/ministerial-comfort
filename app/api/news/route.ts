import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { NewsItem } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { items } = await readDataJson<{ items: NewsItem[] }>('news.json');
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load news' },
      { status: 500 }
    );
  }
}

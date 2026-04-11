import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { NewsItem } from '@/types/content';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { slug: string } };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { items } = await readDataJson<{ items: NewsItem[] }>('news.json');
    const item = items.find((i) => i.slug === params.slug);
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load news item' },
      { status: 500 }
    );
  }
}

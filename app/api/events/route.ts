import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { EventItem } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const events = await readDataJson<EventItem[]>('events.json');
    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load events' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { AboutContent } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readDataJson<AboutContent>('about.json');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load about content' },
      { status: 500 }
    );
  }
}

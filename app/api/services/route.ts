import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { ServicesContent } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readDataJson<ServicesContent>('services.json');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load services' },
      { status: 500 }
    );
  }
}

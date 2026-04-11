import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { EligibilityContent } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await readDataJson<EligibilityContent>('eligibility.json');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load eligibility content' },
      { status: 500 }
    );
  }
}

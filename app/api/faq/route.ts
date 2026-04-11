import { NextResponse } from 'next/server';
import { readDataJson } from '@/lib/server/readDataJson';
import type { FAQItem } from '@/types/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await readDataJson<FAQItem[]>('faq.json');
    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load FAQ' },
      { status: 500 }
    );
  }
}

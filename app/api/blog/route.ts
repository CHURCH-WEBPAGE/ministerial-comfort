import { NextResponse } from 'next/server';
import { loadBlogManifest } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const posts = await loadBlogManifest();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: 'Failed to load blog posts' },
      { status: 500 }
    );
  }
}

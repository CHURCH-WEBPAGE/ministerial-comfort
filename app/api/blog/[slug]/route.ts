import { NextResponse } from 'next/server';
import { loadBlogPostBySlug } from '@/lib/server/blog';

export const dynamic = 'force-dynamic';

type RouteParams = { params: { slug: string } };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const post = await loadBlogPostBySlug(params.slug);
    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch {
    return NextResponse.json(
      { error: 'Failed to load blog post' },
      { status: 500 }
    );
  }
}

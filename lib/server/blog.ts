import { readDataJson } from '@/lib/server/readDataJson';
import type { BlogPost, BlogPostManifest } from '@/types/content';

const MANIFEST_PATH = 'blog/posts.json';

export async function loadBlogManifest(): Promise<BlogPostManifest[]> {
  const { posts } = await readDataJson<{ posts: BlogPostManifest[] }>(MANIFEST_PATH);
  return posts;
}

export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogManifest();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return null;
  let body: string | undefined;

  try {
    const articles = await readDataJson<{ slug: string; content: string }[]>(
      'blog/articles.json'
    );
    body = articles.find((a) => a.slug === slug)?.content;
  } catch {
    /* no articles.json */
  }

  const content = body ?? meta.description;
  return { ...meta, content };
}

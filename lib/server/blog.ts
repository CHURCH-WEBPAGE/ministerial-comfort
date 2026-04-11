import { readFile } from 'fs/promises';
import path from 'path';
import { readDataJson } from '@/lib/server/readDataJson';
import type { BlogPost, BlogPostManifest } from '@/types/content';

const MANIFEST_PATH = 'blog/posts.json';
const BODIES_DIR = path.join(process.cwd(), 'data', 'blog', 'bodies');

export async function loadBlogManifest(): Promise<BlogPostManifest[]> {
  const { posts } = await readDataJson<{ posts: BlogPostManifest[] }>(MANIFEST_PATH);
  return posts;
}

export async function loadBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await loadBlogManifest();
  const meta = posts.find((p) => p.slug === slug);
  if (!meta) return null;
  let content: string;
  try {
    content = await readFile(path.join(BODIES_DIR, `${slug}.txt`), 'utf-8');
  } catch {
    content = meta.description;
  }
  return { ...meta, content };
}

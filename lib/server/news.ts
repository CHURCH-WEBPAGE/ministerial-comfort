import { readDataJson } from '@/lib/server/readDataJson';
import type { NewsItem } from '@/types/content';

export async function loadNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  const { items } = await readDataJson<{ items: NewsItem[] }>('news.json');
  return items.find((i) => i.slug === slug) ?? null;
}

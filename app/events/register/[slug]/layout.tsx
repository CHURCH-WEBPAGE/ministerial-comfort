import type { Metadata } from 'next';
import { loadNewsItemBySlug } from '@/lib/server/news';
import { SITE_NAME } from '@/lib/site';

type Props = { children: React.ReactNode; params: { slug: string } };

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await loadNewsItemBySlug(params.slug);
  if (!item) {
    return {
      title: 'Event registration',
      description: `Register for an MCR event. ${SITE_NAME}.`,
    };
  }
  const description = truncate(item.description, 160);
  const title = `Register: ${item.title}`;

  return {
    title,
    description,
    alternates: { canonical: `/events/register/${params.slug}` },
    openGraph: {
      url: `/events/register/${params.slug}`,
      title,
      description,
      images: [{ url: item.image, alt: item.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [item.image],
    },
  };
}

export default function EventRegisterLayout({ children }: Props) {
  return children;
}

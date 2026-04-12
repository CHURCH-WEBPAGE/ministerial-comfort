import type { Metadata } from 'next';
import { loadBlogPostBySlug } from '@/lib/server/blog';
import { SITE_NAME } from '@/lib/site';

type Props = { children: React.ReactNode; params: { slug: string } };

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await loadBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Blog post',
      description: `This post could not be found. ${SITE_NAME}.`,
    };
  }
  const description = truncate(post.description, 160);
  const title = post.title;
  const image = post.image;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: {
      type: 'article',
      url: `/blog/${params.slug}`,
      title,
      description,
      publishedTime: post.date,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default function BlogPostLayout({ children }: Props) {
  return children;
}

import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Blog posts and reflections from the MCR webinar series for ministers and leaders (${SITE_NAME}).`,
  alternates: { canonical: '/blog' },
  openGraph: {
    url: '/blog',
    title: `Blog | ${SITE_NAME}`,
    description: `Written summaries and stories from MCR webinars and ministry life. ${SITE_NAME}.`,
  },
  twitter: {
    title: `Blog | ${SITE_NAME}`,
    description: `Blog posts from Ministerial Comfort and Renewal (MCR).`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

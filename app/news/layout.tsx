import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'News & events',
  description: `Webinars, trainings, and news from Ministerial Comfort and Renewal for FGCN ministers (${SITE_NAME}).`,
  alternates: { canonical: '/news' },
  openGraph: {
    url: '/news',
    title: `News & events | ${SITE_NAME}`,
    description: `Upcoming and past MCR webinars, trainings, and announcements.`,
  },
  twitter: {
    title: `News & events | ${SITE_NAME}`,
    description: `MCR news, webinars, and registration for ministers.`,
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

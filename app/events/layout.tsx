import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Events',
  description: `Webinars, trainings, and upcoming sessions from Ministerial Comfort and Renewal for FGCN ministers (${SITE_NAME}).`,
  alternates: { canonical: '/events' },
  openGraph: {
    url: '/events',
    title: `Events | ${SITE_NAME}`,
    description: `MCR webinars, trainings, and event registration for ministers.`,
  },
  twitter: {
    title: `Events | ${SITE_NAME}`,
    description: `MCR events and registration for ministers.`,
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

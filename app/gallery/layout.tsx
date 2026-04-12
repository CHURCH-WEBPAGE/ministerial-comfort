import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gallery',
  description: `Photo gallery from MCR gatherings, webinars, and ministry moments (${SITE_NAME}).`,
  alternates: { canonical: '/gallery' },
  openGraph: {
    url: '/gallery',
    title: `Gallery | ${SITE_NAME}`,
    description: `Images from Ministerial Comfort and Renewal events and community life.`,
  },
  twitter: {
    title: `Gallery | ${SITE_NAME}`,
    description: `MCR gallery moments of care, worship, and community.`,
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

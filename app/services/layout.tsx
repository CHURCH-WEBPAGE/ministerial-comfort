import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Programs & services',
  description: `Explore MCR programs and services: awareness, counseling, renewal, and practical support for ministers (${SITE_NAME}).`,
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: `Programs & services | ${SITE_NAME}`,
    description: `Full list of MCR programs and services for ministers and families.`,
  },
  twitter: {
    title: `Programs & services | ${SITE_NAME}`,
    description: `MCR programs and services for ministerial care and renewal.`,
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

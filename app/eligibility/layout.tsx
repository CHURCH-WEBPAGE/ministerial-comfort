import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Eligibility',
  description: `Who can participate in MCR programs and how to apply. Eligibility criteria for ministers seeking support (${SITE_NAME}).`,
  alternates: { canonical: '/eligibility' },
  openGraph: {
    url: '/eligibility',
    title: `Eligibility | ${SITE_NAME}`,
    description: `Eligibility requirements and application guidance for MCR ministerial support.`,
  },
  twitter: {
    title: `Eligibility | ${SITE_NAME}`,
    description: `Learn who can access MCR renewal and support programs.`,
  },
};

export default function EligibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

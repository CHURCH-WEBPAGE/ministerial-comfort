import type { Metadata } from 'next';
import Header from '@/components/Header';
import NotificationBanner from '@/components/NotificationBanner';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import EligibilityBanner from '@/components/EligibilityBanner';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import DonateSection from '@/components/DonateSection';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import { DEFAULT_OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}, share preview`,
      },
    ],
  },
  twitter: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <NotificationBanner />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <EligibilityBanner />
      <FAQ />
      <Contact />
      <DonateSection />
      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

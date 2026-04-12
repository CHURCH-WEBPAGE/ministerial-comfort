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


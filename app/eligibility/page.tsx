'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import EligibilityDocument from '@/components/EligibilityDocument';
import PageLoader from '@/components/PageLoader';
import { useApiResource } from '@/hooks/useApiResource';
import type { EligibilityContent } from '@/types/content';

export default function EligibilityPage() {
  const router = useRouter();
  const { data, loading, error } = useApiResource<EligibilityContent>('/api/eligibility');

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-white">
        <Header />
        <PageLoader />
        <Footer />
        <ScrollDownArrow />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
          <p className="text-center text-gray-600 text-sm">Unable to load this page. Please try again later.</p>
        </div>
        <Footer />
        <ScrollDownArrow />
      </main>
    );
  }

  const { hero, intro, sections } = data;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative h-[200px] md:h-[250px] mb-12">
        <Image
          src={hero.imageSrc}
          alt={hero.imageAlt}
          fill
          className="object-cover"
          style={{ objectPosition: 'top center' }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center md:mx-3xl">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Go back"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-md md:max-w-lg">
                {hero.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 sm:px-6 md:pb-24 lg:px-8 lg:pb-28">
        <EligibilityDocument content={{ hero, intro, sections }} />
      </div>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

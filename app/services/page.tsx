'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import { useApiResource } from '@/hooks/useApiResource';
import type { ServicesContent } from '@/types/content';

export default function ServicesPage() {
  const router = useRouter();
  const { data: servicesContent, loading, error } =
    useApiResource<ServicesContent>('/api/services');
  const pageIntro = servicesContent?.pageIntro ?? '';
  const services = servicesContent?.items ?? [];

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="mr-3 p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Go back"
            >
              <svg 
                className="w-6 h-6 text-[#2867AE]" 
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2867AE]">
              Our Programs & Services
            </h1>
            <div className="flex-1 h-px bg-[#2867AE]/30 ml-6"></div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            {loading ? 'Loading…' : error ? 'Unable to load intro.' : pageIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-gray-500 col-span-full text-sm">Loading services…</p>
          ) : error || !services.length ? (
            <p className="text-gray-500 col-span-full text-sm">
              {error ? 'Unable to load services.' : 'No services available.'}
            </p>
          ) : (
            services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
      <ScrollDownArrow />
    </main>
  );
}


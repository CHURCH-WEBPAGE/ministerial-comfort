'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import PageLoader from '@/components/PageLoader';
import { useApiResource } from '@/hooks/useApiResource';
import type { GalleryContent } from '@/types/content';

export default function GalleryPage() {
  const router = useRouter();
  const { data: galleryContent, loading, error } =
    useApiResource<GalleryContent>('/api/gallery');
  const galleryImages = galleryContent?.page ?? [];

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mb-12 md:mb-14">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2867AE]">Gallery</h1>
            <div className="flex-1 h-px bg-[#2867AE]/30 ml-6"></div>
          </div>
        </div>

        {loading ? (
          <PageLoader fillViewport={false} />
        ) : error || !galleryImages.length ? (
          <p className="text-gray-500 text-sm">{error ? 'Unable to load gallery.' : 'No images.'}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((item, index) => (
              <div
                key={item.src + index}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading={index < 4 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

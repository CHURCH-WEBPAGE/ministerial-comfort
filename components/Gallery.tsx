'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useApiResource } from '@/hooks/useApiResource';
import type { GalleryContent } from '@/types/content';

export default function Gallery() {
  const { data: galleryContent, loading, error } =
    useApiResource<GalleryContent>('/api/gallery');

  const galleryImages = galleryContent?.homepage ?? [];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">Gallery</h2>
          <Link href="/gallery" className="text-red-600 hover:text-red-700 font-semibold text-sm md:text-base">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading gallery…</p>
        ) : error || !galleryImages.length ? (
          <p className="text-gray-500 text-sm">{error ? 'Unable to load gallery.' : 'No images yet.'}</p>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {galleryImages.map((item, index) => (
              <div
                key={item.src + index}
                className="relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

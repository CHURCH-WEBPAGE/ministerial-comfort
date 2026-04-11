'use client';

import Image from 'next/image';
import { useApiResource } from '@/hooks/useApiResource';
import type { AboutContent } from '@/types/content';

export default function About() {
  const { data: about, loading, error } = useApiResource<AboutContent>('/api/about');

  if (loading || error || !about) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">About Us</h2>
          <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto">
            {loading ? 'Loading…' : 'Unable to load this section.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">{about.body}</p>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={about.imageSrc}
              alt={about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

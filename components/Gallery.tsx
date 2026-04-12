'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageLoader from '@/components/PageLoader';
import SectionReveal from '@/components/SectionReveal';
import { useApiResource } from '@/hooks/useApiResource';
import type { GalleryContent } from '@/types/content';

export default function Gallery() {
  const { data: galleryContent, loading, error } =
    useApiResource<GalleryContent>('/api/gallery');

  const galleryImages = galleryContent?.homepage ?? [];

  return (
    <section id="gallery" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 flex flex-col justify-between gap-5 sm:mb-14 sm:flex-row sm:items-end md:mb-16">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2867AE]">Moments</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">Gallery</h2>
            <p className="text-lg text-slate-600">A glimpse of the community and care surrounding MCR.</p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex shrink-0 items-center gap-2 text-base font-semibold text-[#2867AE] transition hover:gap-3"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </SectionReveal>
        {loading ? (
          <PageLoader fillViewport={false} />
        ) : error || !galleryImages.length ? (
          <p className="text-sm text-slate-500">{error ? 'Unable to load gallery.' : 'No images yet.'}</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.src + index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5 md:h-96 md:aspect-auto lg:h-[22rem]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

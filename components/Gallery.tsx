'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { useCallback, useRef } from 'react';
import PageLoader from '@/components/PageLoader';
import SectionReveal from '@/components/SectionReveal';
import { useApiResource } from '@/hooks/useApiResource';
import type { GalleryContent, GalleryImage } from '@/types/content';

const ZOOM_DESKTOP = 1.22;
const ZOOM_REDUCED = 1.04;
/** Max pan in px at rest (springs smooth toward this from mouse). */
const PAN_RANGE = 26;

function GalleryImageTile({ item, index }: { item: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const zoom = useMotionValue(1);
  const zoomSpring = useSpring(zoom, {
    stiffness: reduceMotion ? 400 : 220,
    damping: reduceMotion ? 40 : 26,
  });
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const panXSpring = useSpring(panX, { stiffness: 280, damping: 32 });
  const panYSpring = useSpring(panY, { stiffness: 280, damping: 32 });

  const reset = useCallback(() => {
    zoom.set(1);
    panX.set(0);
    panY.set(0);
  }, [zoom, panX, panY]);

  const onEnter = useCallback(() => {
    zoom.set(reduceMotion ? ZOOM_REDUCED : ZOOM_DESKTOP);
  }, [zoom, reduceMotion]);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || reduceMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      panX.set(-nx * 2 * PAN_RANGE);
      panY.set(-ny * 2 * PAN_RANGE);
    },
    [panX, panY, reduceMotion]
  );

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      className="group relative aspect-[4/5] cursor-zoom-in overflow-visible rounded-2xl md:h-96 md:aspect-auto lg:h-[22rem]"
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileHover={
        reduceMotion
          ? { zIndex: 1 }
          : {
              scale: 1.025,
              zIndex: 10,
              boxShadow: '0 28px 55px -15px rgba(15, 23, 42, 0.35)',
            }
      }
      transition={{ type: 'spring', stiffness: 340, damping: 28 }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            x: panXSpring,
            y: panYSpring,
            scale: zoomSpring,
            transformOrigin: '50% 50%',
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            loading="lazy"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/45 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}

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
              <GalleryImageTile key={item.src + index} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

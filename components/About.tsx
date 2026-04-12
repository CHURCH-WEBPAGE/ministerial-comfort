'use client';

import Image from '@/components/ProgressiveImage';
import { Cormorant_Garamond } from 'next/font/google';
import { motion } from 'framer-motion';
import PageLoader from '@/components/PageLoader';
import SectionReveal from '@/components/SectionReveal';
import { useApiResource } from '@/hooks/useApiResource';
import type { AboutContent } from '@/types/content';

const aboutDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const { data: about, loading, error } = useApiResource<AboutContent>('/api/about');

  if (loading) {
    return (
      <section id="about" className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            About us
          </h2>
          <PageLoader fillViewport={false} />
        </div>
      </section>
    );
  }

  if (error || !about) {
    return (
      <section id="about" className="relative overflow-hidden bg-slate-50 py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            About us
          </h2>
          <p className="mx-auto max-w-2xl text-center text-sm text-slate-500">Unable to load this section.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(60vh,520px)] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(40,103,174,0.12),transparent)]"
        aria-hidden
      />

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#2867AE]">Who we are</p>
          <h2
            className={`${aboutDisplay.className} mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-[3.25rem] lg:leading-[1.08]`}
          >
            About us
          </h2>
        </SectionReveal>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.75, ease }}
          className="relative mt-14 md:mt-20 lg:mt-24"
        >
          <div className="relative mx-auto aspect-[5/4] w-full max-w-5xl overflow-hidden rounded-[1.75rem] shadow-[0_32px_64px_-24px_rgba(15,23,42,0.35)] ring-1 ring-slate-900/10 sm:aspect-[16/10] md:rounded-[2.25rem] lg:aspect-[2.35/1]">
            <Image
              src={about.imageSrc}
              alt={about.imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1152px"
              loading="lazy"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10"
              aria-hidden
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 md:rounded-[2.25rem]" />
          </div>

          <div className="relative z-10 mx-auto -mt-10 max-w-3xl px-1 sm:-mt-14 sm:px-4 md:-mt-20 lg:-mt-24 lg:max-w-[42rem]">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-8 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.18)] backdrop-blur-md sm:p-10 md:rounded-3xl md:p-12 lg:p-14">
              <div
                className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#2867AE] via-[#2867AE]/70 to-[#2867AE]/25"
                aria-hidden
              />
              <div className="pl-6 sm:pl-8">
                <p className="text-[15px] font-light leading-[1.95] tracking-[0.01em] text-slate-700 sm:text-lg sm:leading-[2] md:text-[1.125rem] md:leading-[2.05]">
                  {about.body}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

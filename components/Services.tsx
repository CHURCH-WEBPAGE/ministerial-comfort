'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import Link from 'next/link';
import PageLoader from '@/components/PageLoader';
import SectionReveal from '@/components/SectionReveal';
import { useApiResource } from '@/hooks/useApiResource';
import type { ServicesContent } from '@/types/content';

const cardStagger = 0.08;

export default function Services() {
  const { data: servicesContent, loading, error } =
    useApiResource<ServicesContent>('/api/services');

  const services = servicesContent?.items ?? [];

  return (
    <section id="services" className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mb-12 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between md:mb-16">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2867AE]">What we offer</p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              Our Programs &amp; Services
            </h2>
            {error ? (
              <p className="text-sm text-red-600">Unable to load programs and services.</p>
            ) : (
              <p className="text-lg text-slate-600 md:text-xl leading-relaxed">
                {servicesContent?.pageIntro ??
                  'MCR works through four pillars—emotional health awareness, emotionally healthy living, multi-disciplinary counseling, and rest & recovery—bringing education, practical care, and space to heal for ministers.'}
              </p>
            )}
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 text-base font-semibold text-[#2867AE] transition hover:gap-3"
          >
            View all
            <span aria-hidden>→</span>
          </Link>
        </SectionReveal>
        {loading ? (
          <PageLoader fillViewport={false} />
        ) : error || !services.length ? (
          <p className="text-sm text-slate-500">{error ? 'Unable to load services.' : 'No services listed.'}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
            {services.slice(0, 4).map((service, index) => (
              <motion.div
                key={service.title + index}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * cardStagger, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard title={service.title} image={service.image} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import ServiceCard from './ServiceCard';
import Link from 'next/link';
import { useApiResource } from '@/hooks/useApiResource';
import type { ServicesContent } from '@/types/content';

export default function Services() {
  const { data: servicesContent, loading, error } =
    useApiResource<ServicesContent>('/api/services');

  const services = servicesContent?.items ?? [];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">Our Programs & Services</h2>
          <Link href="/services" className="text-red-600 hover:text-red-700 font-semibold text-base">
            View all
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading services…</p>
        ) : error || !services.length ? (
          <p className="text-gray-500 text-sm">{error ? 'Unable to load services.' : 'No services listed.'}</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.slice(0, 4).map((service, index) => (
              <ServiceCard key={service.title + index} title={service.title} image={service.image} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

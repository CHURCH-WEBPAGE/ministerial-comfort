'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import { useApiResource } from '@/hooks/useApiResource';
import type { NewsItem } from '@/types/content';

export default function NewsPage() {
  const { data, loading, error } = useApiResource<{ items: NewsItem[] }>('/api/news');
  const newsItems = data?.items ?? [];

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <p className="container mx-auto px-4 py-20 text-gray-500 text-sm">Loading news…</p>
        <Footer />
      </main>
    );
  }

  if (error || !newsItems.length) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <p className="container mx-auto px-4 py-20 text-gray-500 text-sm text-center">
          {error ? 'Unable to load news.' : 'No items yet.'}
        </p>
        <Footer />
      </main>
    );
  }

  const featuredItem = newsItems.find((item) => item.featured) || newsItems[0];
  const webinars = newsItems.filter(item => item.category === 'webinar');
  const trainings = newsItems.filter(item => item.category === 'training');
  const resources = newsItems.filter(item => item.category === 'resource');

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Featured Event */}
      <section className="relative h-[500px] md:h-[600px] mb-12">
        <Image
          src={featuredItem.image}
          alt={featuredItem.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="max-w-3xl">
              <p className="text-white/80 text-sm md:text-base mb-2">Upcoming</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {featuredItem.title}
              </h1>
              <p className="text-white/90 text-base md:text-lg mb-6">
                {featuredItem.description}
              </p>
              <Link
                href={`/news/register/${featuredItem.slug}`}
                className="bg-[#2867AE] hover:bg-[#1e4d7a] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg inline-block"
              >
                Register
              </Link>
            </div>
          </div>
          
          {/* Navigation Arrow */}
          <div className="absolute left-8 bottom-12 z-20">
            <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors">
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
          </div>
        </div>
      </section>

      {/* Webinars Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Webinars</h2>
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {webinars.map((item) => (
              <Link
                key={item.id}
                href={`/news/register/${item.slug}`}
                className="flex-shrink-0 w-full md:w-96 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 384px"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  <button className="bg-[#DC2626] hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Register
                  </button>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full flex items-center">
            <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Trainings Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Trainings</h2>
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {trainings.map((item) => (
              <Link
                key={item.id}
                href={`/news/register/${item.slug}`}
                className="flex-shrink-0 w-full md:w-96 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 384px"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full flex items-center">
            <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Resources</h2>
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {resources.map((item) => (
              <Link
                key={item.id}
                href={`/news/register/${item.slug}`}
                className="flex-shrink-0 w-full md:w-96 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 384px"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full flex items-center">
            <button className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors">
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}


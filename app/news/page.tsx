'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import PageLoader from '@/components/PageLoader';
import { useApiResource } from '@/hooks/useApiResource';
import type { NewsItem } from '@/types/content';

function EmptyStrip({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center text-sm text-slate-600">
      {message}
    </div>
  );
}

function isRegistrationOpen(item: NewsItem) {
  return item.registrationOpen !== false;
}

export default function NewsPage() {
  const { data, loading, error } = useApiResource<{ items: NewsItem[] }>('/api/news');
  const newsItems = data?.items ?? [];

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <PageLoader />
        <Footer />
      </main>
    );
  }

  if (error || !newsItems.length) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <p className="container mx-auto px-4 py-16 text-center text-slate-600 text-sm">
          {error ? 'Unable to load events.' : 'No webinars or trainings listed yet.'}
        </p>
        <Footer />
      </main>
    );
  }

  const webinars = newsItems.filter((item) => item.category === 'webinar');
  const trainings = newsItems.filter((item) => item.category === 'training');
  const featuredItem = webinars.find((item) => item.featured) || webinars[0] || newsItems[0];
  const featuredOpen = featuredItem ? isRegistrationOpen(featuredItem) : false;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900">
      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 md:pt-12 lg:px-8">
        <nav className="text-xs font-medium uppercase tracking-wider text-slate-500">
          <Link href="/" className="hover:text-[#2867AE] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-[#2867AE]">News</span>
        </nav>
      </div>

      {featuredItem ? (
        <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-slate-900/10">
            <div className="relative aspect-[21/9] min-h-[280px] md:min-h-[360px]">
              <Link
                href={`/blog/${featuredItem.slug}`}
                className="absolute inset-0 z-0 block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label={`Read article: ${featuredItem.title}`}
              >
                <Image
                  src={featuredItem.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                  style={{ objectPosition: 'center' }}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </Link>
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-10 lg:p-12">
                <p className="pointer-events-none mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {featuredOpen ? 'Upcoming' : 'Past webinar'}
                </p>
                <Link href={`/blog/${featuredItem.slug}`} className="pointer-events-auto max-w-3xl group">
                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl group-hover:text-blue-100 transition-colors">
                    {featuredItem.title}
                  </h1>
                </Link>
                <p className="pointer-events-none mt-3 line-clamp-2 text-sm text-white/85 sm:text-base md:line-clamp-3">
                  {featuredItem.description}
                </p>
                <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                  {featuredOpen ? (
                    <Link
                      href={`/news/register/${featuredItem.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2867AE] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1e4d7a]"
                    >
                      Register
                    </Link>
                  ) : (
                    <>
                      <span className="inline-flex items-center rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm">
                        Registration closed
                      </span>
                      <Link
                        href={`/blog/${featuredItem.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        Read article
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Webinars</h2>
        </div>
        {webinars.length === 0 ? (
          <EmptyStrip message="No webinars scheduled yet. Please check back later." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {webinars.map((item) => {
              const open = isRegistrationOpen(item);
              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Link href={`/blog/${item.slug}`} className="relative aspect-[4/3] block overflow-hidden bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Link href={`/blog/${item.slug}`}>
                      <h3 className="text-lg font-semibold leading-snug text-slate-900 transition hover:text-[#2867AE]">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {open ? (
                        <Link
                          href={`/news/register/${item.slug}`}
                          className="inline-flex rounded-full bg-[#2867AE] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1e4d7a] sm:text-sm"
                        >
                          Register
                        </Link>
                      ) : (
                        <>
                          <span className="inline-flex rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 sm:text-sm">
                            Closed
                          </span>
                          <Link
                            href={`/blog/${item.slug}`}
                            className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2867AE] hover:text-[#2867AE] sm:text-sm"
                          >
                            Read article
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
        <h2 className="mb-8 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Trainings</h2>
        {trainings.length === 0 ? (
          <EmptyStrip message="No trainings scheduled at the moment. Please check back later." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trainings.map((item) => {
              const open = isRegistrationOpen(item);
              return (
                <article
                  key={item.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Link
                    href={open ? `/news/register/${item.slug}` : `/blog/${item.slug}`}
                    className="relative aspect-[4/3] block overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <Link href={open ? `/news/register/${item.slug}` : `/blog/${item.slug}`}>
                      <h3 className="text-lg font-semibold leading-snug text-slate-900 transition hover:text-[#2867AE]">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {open ? (
                        <Link
                          href={`/news/register/${item.slug}`}
                          className="inline-flex rounded-full bg-[#2867AE] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1e4d7a] sm:text-sm"
                        >
                          Register
                        </Link>
                      ) : (
                        <span className="inline-flex rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 sm:text-sm">
                          Registration closed
                        </span>
                      )}
                      {!open ? (
                        <Link
                          href={`/blog/${item.slug}`}
                          className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#2867AE] hover:text-[#2867AE] sm:text-sm"
                        >
                          Read article
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

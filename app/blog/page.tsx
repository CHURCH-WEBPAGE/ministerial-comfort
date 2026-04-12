'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import PageLoader from '@/components/PageLoader';
import { useApiResource } from '@/hooks/useApiResource';
import type { BlogPostManifest } from '@/types/content';

export default function BlogPage() {
  const { data, loading, error } = useApiResource<{ posts: BlogPostManifest[] }>('/api/blog');
  const posts = data?.posts ?? [];
  const webinarPosts = posts.filter((p) => !p.category || p.category === 'webinar');
  const featuredPost = webinarPosts.find((post) => post.featured) || webinarPosts[0];
  const gridWebinars = webinarPosts;

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <PageLoader />
        <Footer />
      </main>
    );
  }

  if (error || !featuredPost) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <p className="container mx-auto px-4 py-16 text-center text-slate-600 text-sm">
          {error ? 'Unable to load blog posts.' : 'No blog posts yet.'}
        </p>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900">
      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-8 sm:px-6 md:pt-12 lg:px-8">
        <nav className="text-xs font-medium uppercase tracking-wider text-slate-500">
          <Link href="/" className="hover:text-[#2867AE] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-[#2867AE]">Blog</span>
        </nav>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-slate-900/10">
          <div className="relative aspect-[21/9] min-h-[280px] md:min-h-[360px]">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Featured</p>
              <Link href={`/blog/${featuredPost.slug}`} className="group max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl group-hover:text-blue-100 transition-colors">
                  {featuredPost.title}
                </h1>
              </Link>
              <p className="mt-3 text-sm text-white/80 sm:text-base">{featuredPost.author}</p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
              >
                Read blog post
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">All blogs</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              Blog posts from the MCR webinar series.
            </p>
          </div>
        </div>

        {gridWebinars.length === 0 ? (
          <p className="text-sm text-slate-500">No blog posts yet.</p>
        ) : (
          <div
            className={`grid gap-6 sm:gap-8 ${
              gridWebinars.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {gridWebinars.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  post.slug === featuredPost.slug
                    ? 'border-[#2867AE]/40 ring-2 ring-[#2867AE]/15'
                    : 'border-slate-200/80'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {post.slug === featuredPost.slug ? (
                    <span className="mb-2 w-fit rounded-full bg-[#2867AE]/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#2867AE]">
                      Featured
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-[#2867AE] sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{post.description}</p>
                  <p className="mt-4 text-xs font-medium text-slate-400">
                    {post.author} · {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

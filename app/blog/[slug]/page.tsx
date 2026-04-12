'use client';

import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
import PageLoader from '@/components/PageLoader';
import { useApiResource } from '@/hooks/useApiResource';
import type { BlogPost, BlogPostManifest } from '@/types/content';

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';

  const { data: post, loading: postLoading, error: postError } = useApiResource<BlogPost>(
    slug ? `/api/blog/${encodeURIComponent(slug)}` : null
  );
  const { data: listData } = useApiResource<{ posts: BlogPostManifest[] }>(
    slug ? '/api/blog' : null
  );

  const relatedPosts = listData?.posts.filter((p) => p.slug !== slug).slice(0, 3) ?? [];

  const handleBack = () => {
    router.back();
  };

  if (postLoading) {
    return (
      <main className="flex min-h-screen flex-col bg-slate-50">
        <Header />
        <PageLoader />
        <Footer />
      </main>
    );
  }

  if (postError || !post) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-slate-600">Blog post not found.</p>
          <p className="mt-4 text-center">
            <Link href="/blog" className="text-sm font-semibold text-[#2867AE] hover:underline">
              Back to blog
            </Link>
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-50 text-slate-900">
      <Header />

      <div className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Go back"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <nav className="text-xs font-medium uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-[#2867AE] transition-colors">
              Home
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link href="/blog" className="hover:text-[#2867AE] transition-colors">
              Blog
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="line-clamp-1 text-[#2867AE]">{post.title}</span>
          </nav>
        </div>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pt-6 pb-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-slate-900/10">
          <div className="relative aspect-[21/9] min-h-[220px] md:min-h-[320px]">
            <Image
              src={post.image}
              alt=""
              fill
              className="object-cover"
              style={{ objectPosition: 'center' }}
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-900/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <h1 className="max-w-4xl text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/85">
                <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">{post.author}</span>
                <span className="text-white/50">·</span>
                <time className="font-medium">{post.date}</time>
              </div>
            </div>
          </div>
        </div>
      </section>

      <article className="relative z-10 mx-auto max-w-3xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="-mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl sm:-mt-10 sm:p-10 md:p-12">
          <div
            className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900 prose-a:text-[#2867AE] prose-a:no-underline hover:prose-a:underline prose-hr:border-slate-200"
          >
            <ReactMarkdown
              components={{
                a: ({ node: _n, href, children, ...props }) => {
                  const isMailto = typeof href === 'string' && href.toLowerCase().startsWith('mailto:');
                  return (
                    <a
                      href={href}
                      {...props}
                      {...(isMailto ? { target: '_blank', rel: 'noopener noreferrer' as const } : {})}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post.content || post.description}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 ? (
        <section className="border-t border-slate-200/80 bg-slate-50/80 py-12 md:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              More on the blog
            </h2>
            <p className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-900">Related blogs</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-[#2867AE]">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{relatedPost.description}</p>
                    <p className="mt-3 text-xs font-medium text-slate-400">
                      {relatedPost.author} · {relatedPost.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

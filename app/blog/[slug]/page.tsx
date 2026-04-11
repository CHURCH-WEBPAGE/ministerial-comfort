'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';
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

  const relatedPosts =
    listData?.posts.filter((p) => p.slug !== slug).slice(0, 3) ?? [];

  const handleBack = () => {
    router.back();
  };

  if (postLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <p className="container mx-auto px-4 py-20 text-gray-500 text-sm">Loading article…</p>
        <Footer />
      </main>
    );
  }

  if (postError || !post) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-center text-gray-600">Blog post not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative h-[400px] md:h-[500px] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />

        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Go back"
              >
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-white/90 text-base md:text-lg">
              {post.author} • {post.date}
            </p>
          </div>
        </div>
      </section>

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content || post.description}
            </div>
          </div>
        </div>
      </article>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Related Blog Posts</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {relatedPost.description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {relatedPost.author} {relatedPost.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}

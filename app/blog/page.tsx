'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';

// Blog data structure - ready to be replaced with API calls
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
  content?: string;
}

// Sample blog data - replace with API call later
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'proactive-emotional-health-in-ministry',
    title: 'Proactive Emotional Health in Ministry',
    description: 'Understanding the importance of maintaining emotional wellness before challenges arise in ministry work.',
    author: 'Rev. Samuel Adeyemi',
    date: '15th Jan. 2025',
    image: '/assets/blog/handling-stress.svg',
    featured: true,
  },
  {
    id: '2',
    slug: 'handling-stress-in-ministry',
    title: 'Handling Stress in Ministry',
    description: 'Stress is natural in ministry. Recognizing it early and seeking guidance from mentors or counselors prevents burnout and keeps your service effective.....',
    author: 'Pastor Grace Olamide',
    date: '19th Jan. 2025',
    image: '/assets/blog/handling-stress.svg',
  },
  {
    id: '3',
    slug: 'balancing-proactive-and-reactive-care',
    title: 'Balancing Proactive and Reactive Care',
    description: 'Proactive care builds resilience; reactive care heals when challenges arise. Ministry leaders need both to serve their communities effectively....',
    author: 'Rev. Michael Chukwu',
    date: '29th Jun. 2025',
    image: '/assets/blog/balancing-care.svg',
  },
  {
    id: '4',
    slug: 'the-role-of-hospitality-in-emotional-wellness',
    title: 'The Role of Hospitality in Emotional Wellness',
    description: 'Welcoming and supporting others strengthens both the giver and receiver. Hospitality in ministry fosters emotional health for the whole community....',
    author: 'Pastor Naomi Eze',
    date: '30th Sept. 2025',
    image: '/assets/blog/hospitality.png',
  },
];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const recentPosts = blogPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Featured Article */}
      <section className="relative h-[500px] md:h-[600px] mb-12">
        <Image
          src={featuredPost.image}
          alt={featuredPost.title}
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
              <p className="text-white/80 text-sm md:text-base mb-2">Featured</p>
              <Link href={`/blog/${featuredPost.slug}`}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 hover:text-blue-300 transition-colors">
                  {featuredPost.title}
                </h1>
              </Link>
              <p className="text-white/90 text-base md:text-lg">
                Author: {featuredPost.author}
              </p>
            </div>
          </div>
          
          {/* Navigation Arrow */}
          <div className="absolute right-8 bottom-12 z-20">
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
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Recent Blog Posts & News Highlights
          </h2>
          <button className="bg-[#2867AE] hover:bg-[#1e4d7a] text-white px-6 py-2.5 rounded-lg transition-colors font-semibold shadow-md w-fit">
            Create a blog post
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post) => (
            <Link 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#2867AE] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>
                <p className="text-gray-500 text-xs">
                  {post.author} {post.date}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="bg-[#2867AE] hover:bg-[#1e4d7a] text-white px-8 py-3 rounded-lg transition-colors font-semibold shadow-md">
            Load More
          </button>
        </div>
      </section>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}


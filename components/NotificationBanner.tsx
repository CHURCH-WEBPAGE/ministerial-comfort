'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NotificationItem {
  id: string;
  type: 'blog' | 'news' | 'seminar';
  title: string;
  slug: string;
  isNew?: boolean;
  isRecent?: boolean;
}

// Sample notification items - replace with API call later
const notificationItems: NotificationItem[] = [
  {
    id: '1',
    type: 'blog',
    title: 'Proactive Emotional Health in Ministry',
    slug: 'proactive-emotional-health-in-ministry',
    isNew: true,
  },
  {
    id: '2',
    type: 'news',
    title: 'Building Emotional Resilience in Ministry',
    slug: 'building-emotional-resilience-in-ministry',
    isRecent: true,
  },
  {
    id: '3',
    type: 'seminar',
    title: 'Effective Counseling for Congregation Members',
    slug: 'effective-counseling-for-congregation-members',
    isNew: true,
  },
  {
    id: '4',
    type: 'blog',
    title: 'Handling Stress in Ministry',
    slug: 'handling-stress-in-ministry',
  },
  {
    id: '5',
    type: 'news',
    title: 'The Total Approach to Emotional Health',
    slug: 'total-approach-emotional-health',
  },
];

export default function NotificationBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only show on home page
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Duplicate items for seamless loop
  const scrollingItems = [...notificationItems, ...notificationItems];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 400; // Approximate footer height
      
      // Hide banner when near footer
      if (scrollPosition + windowHeight >= documentHeight - footerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getItemUrl = (item: NotificationItem) => {
    if (item.type === 'blog') {
      return `/blog/${item.slug}`;
    } else if (item.type === 'news' || item.type === 'seminar') {
      return `/news/register/${item.slug}`;
    }
    return '#';
  };

  if (!isHomePage || !isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#2867AE]/40 border-t border-white/30 shadow-2xl transition-all duration-1000 ${
        isMounted ? 'animate-slide-up' : 'translate-y-full'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(40, 103, 174, 0.3) 0%, rgba(30, 77, 122, 0.4) 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full overflow-hidden py-3">
        <div className="flex items-center">
          {/* Notification Icon - Fixed on left */}
          <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>

          {/* Scrolling News Ticker */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className={`flex items-center space-x-8 md:space-x-12 ${
                isPaused ? 'pause-animation' : 'animate-news-ticker'
              }`}
            >
              {scrollingItems.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={getItemUrl(item)}
                  className="flex items-center space-x-3 md:space-x-4 flex-shrink-0 group"
                  title={getItemUrl(item)}
                >
                  <div className="flex items-center space-x-3 md:space-x-4">
                    {(item.isNew || item.isRecent) && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs md:text-sm font-bold bg-red-500 text-white animate-pulse">
                        {item.isNew ? 'NEW' : 'RECENT'}
                      </span>
                    )}
                    <span className="text-xs md:text-sm font-medium italic uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity text-white whitespace-nowrap">
                      {item.type === 'blog' ? 'BLOG' : item.type === 'seminar' ? 'SEMINAR' : 'EVENT'}
                    </span>
                  </div>
                  <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white group-hover:text-blue-200 group-hover:underline transition-colors duration-300 tracking-wide md:tracking-wider lg:tracking-widest whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { useApiResource } from '@/hooks/useApiResource';
import type { EventItem, EventLabelTone } from '@/types/content';

/** Event copy lives in `data/events.json` and is served by `GET /api/events`. */

const LABEL_TONE_CLASSES: Record<EventLabelTone, string> = {
  green: 'bg-emerald-600 border-emerald-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  red: 'bg-red-600 border-red-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  amber: 'bg-amber-600 border-amber-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  blue: 'bg-sky-600 border-sky-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  violet: 'bg-violet-600 border-violet-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  rose: 'bg-rose-600 border-rose-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
};

/**
 * Higher = faster scroll (pixels moved per second along the track).
 * Duration = (half the track width) / this value. Do not use a high minimum duration
 * in code or turning this up will have no effect once below that floor.
 */
const MARQUEE_PIXELS_PER_SECOND = 42;

function buildEventStrip(eventList: EventItem[]): ReactNode[] {
  const items: ReactNode[] = [];
  eventList.forEach((event) => {
    const toneClass = LABEL_TONE_CLASSES[event.labelTone];

    items.push(
      <span
        key={`title-${event.id}`}
        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm md:text-base lg:text-lg font-bold text-white border whitespace-nowrap flex-shrink-0 ${toneClass}`}
      >
        {event.name}
      </span>
    );

    const details = [
      event.date,
      event.time,
      `Facilitator: ${event.facilitator}`,
      `For: ${event.audience}`,
      event.platform,
    ]
      .filter(Boolean)
      .join('  ·  ');

    items.push(
      <span
        key={`details-${event.id}`}
        className="text-sm md:text-base lg:text-lg font-semibold text-white tracking-wide whitespace-nowrap flex-shrink-0 mx-4"
      >
        {details}
      </span>
    );

    items.push(
      <span
        key={`sep-${event.id}`}
        className="text-white/30 flex-shrink-0 mx-8 text-lg"
      >
        ●
      </span>
    );
  });
  return items;
}

export default function NotificationBanner() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { data: events, loading, error } = useApiResource<EventItem[]>(
    isHomePage ? '/api/events' : null
  );
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [marqueeDurationSec, setMarqueeDurationSec] = useState(120);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerHeight = 400;

      if (scrollPosition + windowHeight >= documentHeight - footerHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const el = marqueeTrackRef.current;
    if (!el) return;

    const updateDuration = () => {
      const total = el.scrollWidth;
      if (total <= 0) return;
      const half = total / 2;
      const sec = Math.max(28, half / MARQUEE_PIXELS_PER_SECOND);
      setMarqueeDurationSec(sec);
    };

    updateDuration();
    const ro = new ResizeObserver(updateDuration);
    ro.observe(el);
    return () => ro.disconnect();
  }, [isHomePage, isVisible, events]);

  if (!isHomePage || !isVisible) return null;
  if (loading || error || !events?.length) return null;

  const strip = buildEventStrip(events);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#2867AE]/40 border-t border-white/30 shadow-2xl transition-all duration-1000 ${
        isMounted ? 'animate-slide-up' : 'translate-y-full'
      }`}
      style={{
        background:
          'linear-gradient(135deg, rgba(40, 103, 174, 0.3) 0%, rgba(30, 77, 122, 0.4) 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full overflow-hidden py-3">
        <div className="flex items-center">
          {/* Bell + single “Event” label (scrolling strip is titles + details only) */}
          <div className="flex flex-shrink-0 items-center gap-3 pl-4 pr-2 sm:pl-6 sm:pr-3 lg:pl-8 lg:pr-4">
            <svg
              className="h-8 w-8 shrink-0 text-white md:h-10 md:w-10 lg:h-12 lg:w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-white/95 md:text-sm">
              Events
            </span>
          </div>

          {/* Continuous scrolling marquee: two identical copies side by side.
              Track must be w-max + shrink-0 so width = content, not viewport; otherwise only ~one event fits in the "box" and the rest is clipped. */}
          <div className="min-w-0 flex-1 overflow-hidden relative">
            <div
              ref={marqueeTrackRef}
              className={`animate-event-marquee flex w-max shrink-0 flex-nowrap items-center ${
                isPaused ? 'pause-animation' : ''
              }`}
              style={
                {
                  ['--event-marquee-duration' as string]: `${marqueeDurationSec}s`,
                  animationDuration: `${marqueeDurationSec}s`,
                } as CSSProperties
              }
            >
              <div className="flex flex-nowrap items-center shrink-0">
                {strip}
              </div>
              <div className="flex flex-nowrap items-center shrink-0">
                {strip}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

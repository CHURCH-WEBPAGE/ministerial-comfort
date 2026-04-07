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

// ============================================================
// EVENT DATA - UPDATE THIS SECTION TO CHANGE BANNER CONTENT
// ============================================================
// Each event has the following fields:
//   name     - The title/topic of the event
//   date     - The date of the event (e.g. "Friday 21st November, 2025")
//   time     - Time with timezone info
//   facilitator - Name and title of the facilitator
//   audience - Who the event is for
//   platform - Where the event is held (e.g. "Zoom")
//   meetingId - Zoom meeting ID (optional)
//   passcode  - Zoom passcode (optional)
//   labelTone - Color of the title label so each event is easy to spot:
//               'green' | 'red' | 'amber' | 'blue' | 'violet' | 'rose'
//
// To add a new event:  Copy one of the objects below and fill in the details.
// To remove an event:  Delete the entire { ... } block for that event.
// To edit an event:    Change the relevant field values below.
// ============================================================

type EventLabelTone = 'green' | 'red' | 'amber' | 'blue' | 'violet' | 'rose';

interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  facilitator: string;
  audience: string;
  platform: string;
  meetingId?: string;
  passcode?: string;
  /** Background color for the event title label (each event can differ). */
  labelTone: EventLabelTone;
}

const LABEL_TONE_CLASSES: Record<EventLabelTone, string> = {
  green: 'bg-emerald-600 border-emerald-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  red: 'bg-red-600 border-red-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  amber: 'bg-amber-600 border-amber-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  blue: 'bg-sky-600 border-sky-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  violet: 'bg-violet-600 border-violet-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
  rose: 'bg-rose-600 border-rose-400/90 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
};

const events: EventItem[] = [
  // --- EVENT 1 ---
  {
    id: '1',
    name: 'The Emotional Health of the Leader',
    labelTone: 'green',
    date: 'Thursday 30th October, 2025',
    time: '2:00 PM - 3:30 PM WAT (Nigeria) / 9:00 AM - 10:30 AM ET (USA)',
    facilitator: 'Rev. Paul Kuzma — Director, Centre for Spiritual Renewal, Christiansburg, VA, USA',
    audience: 'National Board of Directors of the Foursquare Gospel Church in Nigeria',
    platform: 'Live on Zoom',
    meetingId: '881 1587 7622',
    passcode: '45164',
  },

  // --- EVENT 2 ---
  {
    id: '2',
    name: 'Spiritual Renewal and Emotionally Healthy Discipleship',
    labelTone: 'red',
    date: 'Friday 21st November, 2025',
    time: '2:00 PM - 3:30 PM WAT (Nigeria) / 8:00 AM - 9:30 AM ET (USA)',
    facilitator: 'Rev. Paul Kuzma — Director, Centre for Spiritual Renewal, Christiansburg, VA, USA',
    audience: 'National Executive Council of the Foursquare Gospel Church in Nigeria and invited ministers',
    platform: 'Live on Zoom',
    meetingId: '881 1587 7622',
    passcode: '45164',
  },

  // --- EVENT 3 ---
  {
    id: '3',
    name: 'Service Excellence in a Spiritual Renewal Ministry',
    labelTone: 'amber',
    date: 'Friday 12th December, 2025',
    time: '2:00 PM - 3:30 PM WAT (Nigeria) / 8:00 AM - 9:30 AM ET (USA)',
    facilitator: 'Ginny Drews — Guest Services Team Lead, Cross Pointe Conference Centre, Centre for Spiritual Renewal, Christiansburg, VA, USA',
    audience: 'MCR Team',
    platform: 'Live on Zoom',
    meetingId: '881 1587 7622',
    passcode: '45164',
  },
];

// ============================================================
// END OF EVENT DATA
// ============================================================

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
      event.meetingId ? `Meeting ID: ${event.meetingId}` : '',
      event.passcode ? `Passcode: ${event.passcode}` : '',
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
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const [marqueeDurationSec, setMarqueeDurationSec] = useState(120);

  const isHomePage = pathname === '/';

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
  }, [isHomePage, isVisible]);

  if (!isHomePage || !isVisible) return null;

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
              Track must be w-max + shrink-0 so width = content, not viewport — otherwise only ~one event fits in the "box" and the rest is clipped. */}
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

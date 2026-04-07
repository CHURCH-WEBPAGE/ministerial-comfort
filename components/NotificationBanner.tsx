'use client';

import { useState, useEffect, useRef } from 'react';
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
//
// To add a new event:  Copy one of the objects below and fill in the details.
// To remove an event:  Delete the entire { ... } block for that event.
// To edit an event:    Change the relevant field values below.
// ============================================================

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
}

const events: EventItem[] = [
  // --- EVENT 1 ---
  {
    id: '1',
    name: 'The Emotional Health of the Leader',
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

function formatEventText(event: EventItem): string {
  let text = `${event.name}  ·  ${event.date}  ·  ${event.time}  ·  Facilitator: ${event.facilitator}  ·  For: ${event.audience}  ·  ${event.platform}`;
  if (event.meetingId) {
    text += `  ·  Meeting ID: ${event.meetingId}`;
  }
  if (event.passcode) {
    text += `  ·  Passcode: ${event.passcode}`;
  }
  return text;
}

export default function NotificationBanner() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollingItems = [...events, ...events];

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

  if (!isHomePage || !isVisible) return null;

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
          {/* Bell Icon */}
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

          {/* Scrolling Event Ticker */}
          <div className="flex-1 overflow-hidden relative">
            <div
              className={`flex items-center space-x-10 md:space-x-16 ${
                isPaused ? 'pause-animation' : 'animate-news-ticker'
              }`}
            >
              {scrollingItems.map((event, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="flex items-center space-x-3 md:space-x-4 flex-shrink-0"
                >
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs md:text-sm font-bold bg-[#2867AE] text-white uppercase tracking-wider">
                    Event
                  </span>
                  <span className="text-sm md:text-base lg:text-lg xl:text-xl font-semibold text-white tracking-wide whitespace-nowrap">
                    {formatEventText(event)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import { CONTACT_ADDRESS, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from '@/lib/contact';

export default function Footer() {
  return (
    <footer className="bg-[#0f1419] text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          <div>
            <div className="mb-4">
              <Image
                src="/assets/MCR logo 2.svg"
                alt="MCR Logo"
                width={320}
                height={120}
                className="h-auto w-auto max-w-[min(100%,320px)] brightness-0 invert"
                sizes="320px"
              />
            </div>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Ministerial Comfort and Renewal (MCR) serves ministers with hope, care, and practical
              support.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                aria-label={`Email ${SUPPORT_EMAIL}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
              <a
                href="/#contact"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
                aria-label="Contact form"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Explore</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About MCR
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Programs</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Our programs &amp; services
                </Link>
              </li>
              <li>
                <Link href="/eligibility" className="hover:text-white transition-colors">
                  Eligibility
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Get support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">Contact</h3>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="leading-relaxed">
                  <span className="block font-medium text-white">Contact us</span>
                  <span className="mt-1 block">{CONTACT_ADDRESS}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${SUPPORT_PHONE_TEL}`} className="hover:text-white transition-colors">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline break-all"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-8 mt-4 text-center">
          <p className="text-lg md:text-xl font-medium text-white/95 mb-6 max-w-2xl mx-auto leading-snug">
            Walking with ministers towards restoration, renewal, and lasting impact.
          </p>
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Ministerial Comfort and Renewal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

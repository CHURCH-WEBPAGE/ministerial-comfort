'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.25rem] py-2 md:min-h-[5.75rem]">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMenu}>
            <Image
              src="/assets/MCR logo 2.svg"
              alt="MCR Logo"
              width={280}
              height={100}
              className="h-[3.25rem] w-auto sm:h-[3.75rem] md:h-[4.25rem]"
              sizes="(max-width: 768px) 200px, 280px"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Events
            </Link>
          </nav>

          <Link 
            href="/#contact" 
            className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-semibold shadow-md"
          >
            Get Started
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                Gallery
              </Link>
              <Link
                href="/events"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-4"
                onClick={closeMenu}
              >
                Events
              </Link>
              <Link
                href="/#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-semibold shadow-md mx-4 mt-2 block text-center"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


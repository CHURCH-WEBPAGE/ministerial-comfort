'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/MCR logo 2.svg"
              alt="MCR Logo"
              width={50}
              height={50}
              className="w-12 h-12"
              priority
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </Link>
            <Link href="#blog" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
            <Link href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Gallery
            </Link>
            <Link href="#news" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              News
            </Link>
          </nav>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors font-semibold shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}


import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-[#2867AE] mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#2867AE] hover:bg-[#1e4d7a] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}


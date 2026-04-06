import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero2.jpg"
          alt="MCR Hero"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="ml-0 md:ml-8 lg:ml-16">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
                  Restoring Hope and Renewal for Ministers
                </h1>
                <p className="text-xl md:text-2xl text-white leading-relaxed">
                  You are not alone—support, restoration, and guidance are here for you
                </p>
              </div>
              <Link 
                href="/#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg mt-6 md:mt-0 md:flex-shrink-0 inline-block text-center"
              >
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


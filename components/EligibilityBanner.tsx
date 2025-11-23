import Image from 'next/image';
import Link from 'next/link';

export default function EligibilityBanner() {
  return (
    <section id="eligibility" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-[500px] md:h-[600px]">
            <Image
              src="/assets/gopraying.svg"
              alt="Eligibility requirements"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="container px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:gap-16 lg:gap-20 justify-center items-center md:items-center">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Our Eligibility Requirements
                  </h2>
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                    To ensure that the Ministerial Comfort &amp; Renewal Initiative (MCR) serves those who genuinely need support, eligibility criteria have been established for ministers seeking to participate in the program.
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <Link
                    href="/eligibility"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg inline-block"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

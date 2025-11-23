import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">
              The Ministerial Comfort and Renewal Initiative (MCR) exists to restore hope, healing, and transformation to ministers in distress—regardless of the cause. Our mission is to stand with ministers who urgently need encouragement, guidance, and renewal, ensuring that no servant of God walks alone in their season of struggle.
            </p>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/aboutimg.svg"
              alt="About MCR - Hands on Bible"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


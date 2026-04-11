import Image from 'next/image';
import aboutContent from '@/data/about.json';
import type { AboutContent } from '@/types/content';

const about = aboutContent as AboutContent;

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">About Us</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">
              {about.body}
            </p>
          </div>
          <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={about.imageSrc}
              alt={about.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


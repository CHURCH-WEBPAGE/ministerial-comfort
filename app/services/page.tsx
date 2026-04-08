'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';

const services = [
  {
    title: 'Building awareness of emotional health and mental health',
    image: '/assets/emotionalhealth.svg',
    description:
      'MCR helps ministers and leaders grow in understanding of emotional and mental well-being. Through teaching, resources, and conversation, we shine a light on what healthy ministry requires. A core part of this pillar is building capacity—equipping people and churches to recognise needs early and respond with wisdom and care.',
  },
  {
    title: 'Promoting emotionally healthy living',
    image: '/assets/ministerialpeer.svg',
    description:
      'We champion rhythms and practices that support whole-person health in ministry: sustainable boundaries, connection, and habits that honour both calling and humanity. The goal is not perfection but a way of living and serving that can be maintained with integrity over the long term.',
  },
  {
    title: 'Counseling (multi-disciplinary)',
    image: '/assets/emergencyandcrisis.svg',
    description:
      'Professional counseling is offered through a multi-disciplinary lens, so care can be tailored to the minister, spouse, or family. This brings together appropriate expertise to address emotional, relational, and mental health needs in a confidential, respectful setting.',
  },
  {
    title: 'Rest and recovery facility',
    image: '/assets/ministerialrenewal.png',
    description:
      'MCR provides a dedicated rest and recovery facility for times when ministry has taken a heavy toll. It is a place to step back, breathe, and receive structured support toward renewal—so leaders can recover strength before returning to service, or discern next steps with clarity.',
  },
];

export default function ServicesPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="mr-3 p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Go back"
            >
              <svg 
                className="w-6 h-6 text-[#2867AE]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2867AE]">
              Our Programs & Services
            </h1>
            <div className="flex-1 h-px bg-[#2867AE]/30 ml-6"></div>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
            The Ministerial Comfort and Renewal (MCR) organises its work around four pillars: raising awareness and capacity for emotional and mental health, promoting emotionally healthy living, multi-disciplinary counseling, and a rest and recovery facility. Together they support ministers through education, practical life patterns, professional care, and space to heal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ScrollDownArrow />
    </main>
  );
}


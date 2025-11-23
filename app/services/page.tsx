'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';

const services = [
  {
    title: 'Counseling and Therapy Services',
    image: '/assets/counselorandtherapy.svg',
    description: 'It covers Individual Counseling; Group Therapy & Support Circles; Marriage and Family Counseling.',
  },
  {
    title: 'Ministerial Renewals and Sabbaticals',
    image: '/assets/ministerialrenewal.png',
    description: 'MCR will advocate for Weekend Retreats; Extended Sabbaticals; and Specialized Renewal Retreats.',
  },
  {
    title: 'Ministerial peer support and Mentorship',
    image: '/assets/ministerialpeer.svg',
    description: 'MCR will promote the following programs such as Ministerial Peer Support Groups and One-on-One Coaching / Mentoring Program.',
  },
  {
    title: 'Emotional health and leadership development workshops',
    image: '/assets/emotionalhealth.svg',
    description: 'The MCR mental health and leadership workshops shall balance Christian-based principles, psychological insights and practical leadership training.',
  },
  {
    title: 'Emergency and Crisis Response Program',
    image: '/assets/emergencyandcrisis.svg',
    description: 'To provide support to anyone in crisis that calls in for help; no one shall be turned away. However, whilst Foursquare ministers shall be routed into the MCR care program, other callers shall be routed to other appropriate agencies for attention.',
  },
  {
    title: 'Online and Virtual Support Services',
    image: '/assets/onlineandvirtual.svg',
    description: 'To expand the reach and impact of the MCR, online and virtual support services will be an integral part of the program. A mix of technology, digital tools and professional services will be applied.',
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
            The Ministerial Comfort and Renewal Initiative will provide a range of programs tailored to support ministers facing emotional, spiritual, and mental health challenges. These programs are designed to promote healing, resilience, and renewed purpose in ministry.
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


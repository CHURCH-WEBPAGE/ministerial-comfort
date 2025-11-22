import ServiceCard from './ServiceCard';
import Link from 'next/link';

const services = [
  {
    title: 'Counseling and Therapy Services',
    image: '/assets/counselorandtherapy.svg',
  },
  {
    title: 'Ministerial Renewals and Sabbaticals',
    image: '/assets/ministerialrenewal.png',
  },
  {
    title: 'Ministerial Peer Support and Mentorship',
    image: '/assets/ministerialpeer.svg',
  },
  {
    title: 'Emotional Health and Leadership Development Workshops',
    image: '/assets/emotionalhealth.svg',
  },
  {
    title: 'Emergency and Crisis Response Program',
    image: '/assets/emergencyandcrisis.svg',
  },
  {
    title: 'Online and Virtual Support Services',
    image: '/assets/onlineandvirtual.svg',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600">
            Our Programs & Services
          </h2>
          <Link href="/services" className="text-red-600 hover:text-red-700 font-semibold text-base">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.slice(0, 4).map((service, index) => (
            <ServiceCard key={index} title={service.title} image={service.image} />
          ))}
        </div>
      </div>
    </section>
  );
}


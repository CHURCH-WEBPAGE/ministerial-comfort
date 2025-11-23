import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  image: string;
}

export default function ServiceCard({ title, image }: ServiceCardProps) {
  return (
    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">{title}</h3>
      </div>
    </div>
  );
}


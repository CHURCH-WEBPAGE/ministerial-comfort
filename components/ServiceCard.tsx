import Image from '@/components/ProgressiveImage';

interface ServiceCardProps {
  title: string;
  image: string;
}

export default function ServiceCard({ title, image }: ServiceCardProps) {
  return (
    <div className="group relative h-72 overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-2xl md:h-80 lg:h-96">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition duration-700 ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
        <h3 className="text-xl font-semibold leading-snug tracking-tight text-white md:text-2xl">{title}</h3>
      </div>
    </div>
  );
}

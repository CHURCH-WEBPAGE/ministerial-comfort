export type EventLabelTone =
  | 'green'
  | 'red'
  | 'amber'
  | 'blue'
  | 'violet'
  | 'rose';

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  facilitator: string;
  audience: string;
  platform: string;
  labelTone: EventLabelTone;
}

export interface ServiceItem {
  title: string;
  image: string;
  description: string;
}

export interface ServicesContent {
  pageIntro: string;
  items: ServiceItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface GalleryContent {
  homepage: GalleryImage[];
  page: GalleryImage[];
}

export interface AboutContent {
  body: string;
  imageSrc: string;
  imageAlt: string;
}

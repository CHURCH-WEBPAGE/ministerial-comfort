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

export type BlogPostCategory = 'webinar' | 'training';

export interface BlogPostManifest {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  featured?: boolean;
  category?: BlogPostCategory;
}

export interface BlogPost extends BlogPostManifest {
  content?: string;
}

export type NewsCategory = 'webinar' | 'training';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: NewsCategory;
  featured?: boolean;
  /** When false, registration is closed regardless of date. */
  registrationOpen?: boolean;
  /** Event day YYYY-MM-DD (local). Used with today to show Register vs Closed. */
  eventDate?: string;
}

export interface EligibilityHero {
  imageSrc: string;
  imageAlt: string;
  title: string;
}

export interface EligibilitySubsection {
  title: string;
  intro?: string;
  listItems?: string[];
}

export interface EligibilityTwoColumnSection {
  type: 'twoColumn';
  title: string;
  left: EligibilitySubsection[];
  right: EligibilitySubsection[];
}

export interface EligibilityNumberedListSection {
  type: 'numberedList';
  title: string;
  items: string[];
}

export type EligibilitySection =
  | EligibilityTwoColumnSection
  | EligibilityNumberedListSection;

export interface EligibilityContent {
  hero: EligibilityHero;
  intro: string;
  sections: EligibilitySection[];
}

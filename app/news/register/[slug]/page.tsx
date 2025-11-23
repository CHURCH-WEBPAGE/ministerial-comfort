'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormStore } from '@/store/formStore';
import { NewsItem } from '../../page';

// Sample news data - replace with API call later
const newsItems: NewsItem[] = [
  {
    id: '1',
    slug: 'building-emotional-resilience-in-ministry',
    title: 'Building Emotional Resilience in Ministry',
    description: 'Learn practical strategies to stay emotionally strong while leading......',
    image: '/assets/news/proactive-emotional-health.svg',
    category: 'webinar',
    featured: true,
  },
  {
    id: '2',
    slug: 'effective-counseling-for-congregation-members',
    title: 'Effective Counseling for Congregation Members',
    description: 'Explore counseling techniques for pastors and ministry leaders to support their church members emotional and spiritual well-being.',
    image: '/assets/news/effective-counseling.svg',
    category: 'webinar',
  },
  {
    id: '3',
    slug: 'proactive-vs-reactive-emotional-care',
    title: 'Proactive vs. Reactive Emotional Care in Ministry',
    description: 'Understand the balance between preventing emotional challenges and responding to them effectively in ministry settings.',
    image: '/assets/news/care-in-ministry.svg',
    category: 'webinar',
  },
  {
    id: '4',
    slug: 'hospitality-community-support-emotional-health',
    title: 'Hospitality and Community Support as Emotional Health Tools',
    description: 'Learn how practicing hospitality and serving your community can strengthen emotional wellness for both leaders and members.',
    image: '/assets/news/hospitality-support.png',
    category: 'webinar',
  },
  {
    id: '5',
    slug: 'total-approach-emotional-health',
    title: 'The Total Approach to Emotional Health',
    description: 'Balancing proactive and reactive care.',
    image: '/assets/news/total-approach.svg',
    category: 'training',
  },
  {
    id: '6',
    slug: 'how-to-listen-like-counselor',
    title: 'How to Listen Like a Counselor',
    description: 'Effective listening techniques for ministers.',
    image: '/assets/news/how-to-listen.svg',
    category: 'training',
  },
  {
    id: '7',
    slug: 'managing-burnout-in-ministry',
    title: 'Managing Burnout in Ministry',
    description: 'Early signs and recovery steps.',
    image: '/assets/news/managin-bornout.svg',
    category: 'training',
  },
  {
    id: '8',
    slug: 'practical-tools-emotional-spiritual-growth',
    title: 'Practical tools for emotional and spiritual growth.',
    description: 'Practical tools for emotional and spiritual growth.',
    image: '/assets/news/practical tools.svg',
    category: 'resource',
  },
  {
    id: '9',
    slug: 'simple-tools-ministers-stay-grounded',
    title: 'Simple tools that help ministers stay grounded',
    description: 'Simple tools that help ministers stay grounded',
    image: '/assets/news/simpletools.svg',
    category: 'resource',
  },
  {
    id: '10',
    slug: 'spiritual-strength-emotional-balance',
    title: 'Spiritual strength fuels emotional balance.',
    description: 'Spiritual strength fuels emotional balance.',
    image: '/assets/news/spiritual-strenght.svg',
    category: 'resource',
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const event = newsItems.find(item => item.slug === slug);
  const { registrationForm, setRegistrationForm, clearRegistrationForm } = useFormStore();

  // Load form data from store and set event slug
  useEffect(() => {
    if (slug && registrationForm.eventSlug !== slug) {
      setRegistrationForm({ eventSlug: slug });
    }
  }, [slug, registrationForm.eventSlug, setRegistrationForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Save to store silently (no toast)
    setRegistrationForm({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationForm.name || !registrationForm.email || !registrationForm.mobile) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Show saving toast
      const savingToast = toast.loading('Saving your registration...', {
        position: 'top-right',
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success toast
      toast.update(savingToast, {
        render: 'Registration successful! You will hear from us soon.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      // Clear form
      clearRegistrationForm();

      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error('Failed to submit registration. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-center text-gray-600">Event not found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] mb-12">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          style={{ objectPosition: 'center' }}
          sizes="100vw"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Go back"
              >
                <svg 
                  className="w-6 h-6 text-white" 
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
            </div>
            <div className="max-w-3xl">
              <p className="text-white/80 text-sm md:text-base mb-2">Register</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <p className="text-white/90 text-base md:text-lg">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={registrationForm.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2867AE] focus:border-transparent outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationForm.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2867AE] focus:border-transparent outline-none transition-all"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={registrationForm.mobile}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2867AE] focus:border-transparent outline-none transition-all"
                placeholder="Enter your mobile number"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2867AE] hover:bg-[#1e4d7a] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              Register
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}


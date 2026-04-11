'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormStore } from '@/store/formStore';
import { useApiResource } from '@/hooks/useApiResource';
import type { NewsItem } from '@/types/content';

export default function RegisterPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const { data: event, loading, error } = useApiResource<NewsItem>(
    slug ? `/api/news/${encodeURIComponent(slug)}` : null
  );
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

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-center text-gray-500 text-sm">Loading…</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !event) {
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


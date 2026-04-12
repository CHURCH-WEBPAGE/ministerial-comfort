'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import { useFormStore } from '@/store/formStore';
import { useApiResource } from '@/hooks/useApiResource';
import { isEventRegistrationAvailable } from '@/lib/eventRegistration';
import type { NewsItem } from '@/types/content';

export default function EventRegisterPage() {
  const router = useRouter();
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const { data: event, loading, error } = useApiResource<NewsItem>(
    slug ? `/api/news/${encodeURIComponent(slug)}` : null
  );
  const { registrationForm, setRegistrationForm, clearRegistrationForm } = useFormStore();

  useEffect(() => {
    if (slug && registrationForm.eventSlug !== slug) {
      setRegistrationForm({ eventSlug: slug });
    }
  }, [slug, registrationForm.eventSlug, setRegistrationForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegistrationForm({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = registrationForm.name?.trim();
    const email = registrationForm.email?.trim();
    const mobile = registrationForm.mobile?.trim();

    if (!name) {
      toast.error('Please enter your name.');
      return;
    }
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!mobile) {
      toast.error('Please enter your mobile number.');
      return;
    }

    try {
      const savingToast = toast.loading('Saving your registration...', {
        position: 'top-right',
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.update(savingToast, {
        render: 'Registration successful! You will hear from us soon.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      clearRegistrationForm();

      setTimeout(() => {
        router.push('/events');
      }, 2000);
    } catch {
      toast.error('Failed to submit registration. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleBack = () => {
    router.push('/events');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-28 sm:px-6 md:py-32 lg:px-8 lg:py-36">
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
        <div className="container mx-auto px-4 py-28 sm:px-6 md:py-32 lg:px-8 lg:py-36">
          <p className="text-center text-gray-600">Event not found.</p>
          <p className="mt-4 text-center">
            <Link href="/events" className="text-sm font-semibold text-[#2867AE] hover:underline">
              Back to events
            </Link>
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  const registrationClosed = !isEventRegistrationAvailable(event);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative mb-12 h-[400px] md:h-[500px]">
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

        <div className="relative z-10 flex h-full items-end">
          <div className="container mx-auto px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center">
              <button
                type="button"
                onClick={handleBack}
                className="mr-3 rounded p-1 transition-colors hover:bg-white/10"
                aria-label="Back to events"
              >
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="max-w-3xl">
              <p className="mb-2 text-sm text-white/80 md:text-base">
                {registrationClosed ? 'Past session' : 'Register'}
              </p>
              <h1 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">{event.title}</h1>
              <p className="mb-4 text-base text-white/90 md:text-lg">{event.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 sm:px-6 md:pb-24 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-md">
          {registrationClosed ? (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-8 text-center text-gray-700">
              <p className="mb-4 leading-relaxed">
                Registration for this session is closed. When available, written summaries appear on the Blog.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/blog"
                  className="inline-flex justify-center rounded-lg bg-[#2867AE] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1e4d7a]"
                >
                  Go to Blog
                </Link>
                <Link
                  href="/events"
                  className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-100"
                >
                  All events
                </Link>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={registrationForm.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={registrationForm.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="mb-2 block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={registrationForm.mobile}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                  placeholder="Enter your mobile number"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-[#2867AE] px-8 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#1e4d7a]"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

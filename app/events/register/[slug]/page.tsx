'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';
import FormSubmitButton from '@/components/FormSubmitButton';
import { getEmailJsErrorMessage } from '@/lib/getEmailJsErrorMessage';
import { isValidEmail, isValidPhone } from '@/lib/formValidation';
import { sendSupportInquiryEmail } from '@/lib/sendSupportEmail';
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
  const prevSlugRef = useRef<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    if (prevSlugRef.current !== '' && prevSlugRef.current !== slug) {
      clearRegistrationForm();
    }
    prevSlugRef.current = slug;
    setRegistrationForm({ eventSlug: slug });
  }, [slug, clearRegistrationForm, setRegistrationForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationForm({ [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!event) return;

    const firstName = registrationForm.firstName?.trim();
    const lastName = registrationForm.lastName?.trim();
    const email = registrationForm.email?.trim();
    const phone = registrationForm.phone?.trim();
    const extraNote = registrationForm.note?.trim();

    if (!firstName) {
      toast.error('Please enter your first name.');
      return;
    }
    if (!lastName) {
      toast.error('Please enter your last name.');
      return;
    }
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!phone) {
      toast.error('Please enter your phone number.');
      return;
    }
    if (!isValidPhone(phone)) {
      toast.error('Please enter a valid phone number.');
      return;
    }

    const composedNote = [
      'Event registration',
      `Event: ${event.title}`,
      '',
      extraNote || '(No additional note from the registrant.)',
    ].join('\n');

    setIsSubmitting(true);
    try {
      await sendSupportInquiryEmail({
        firstName,
        lastName,
        email,
        phone,
        note: composedNote,
      });

      toast.success(
        'Registration received. Our support team will review your details and contact you shortly.',
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
        }
      );

      clearRegistrationForm();

      setTimeout(() => {
        router.push('/events');
      }, 2000);
    } catch (err) {
      toast.error(getEmailJsErrorMessage(err), {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: true,
      });
    } finally {
      setIsSubmitting(false);
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
              <fieldset
                disabled={isSubmitting}
                className="min-w-0 space-y-6 border-0 p-0 disabled:opacity-75"
              >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={registrationForm.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={registrationForm.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                    placeholder="Last name"
                  />
                </div>
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
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={registrationForm.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="note" className="mb-2 block text-sm font-medium text-gray-700">
                  Note <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={registrationForm.note}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#2867AE]"
                  placeholder="Dietary needs, accessibility, or anything else we should know"
                />
              </div>

              </fieldset>
              <FormSubmitButton
                isLoading={isSubmitting}
                idleLabel="Register"
                loadingLabel="Submitting…"
                className="rounded-lg bg-[#2867AE] px-8 py-3 text-white shadow-md hover:bg-[#1e4d7a]"
              />
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

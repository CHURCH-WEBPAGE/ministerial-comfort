'use client';

import { useState } from 'react';
import Image from '@/components/ProgressiveImage';
import FormSubmitButton from '@/components/FormSubmitButton';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { CONTACT_ADDRESS, SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from '@/lib/contact';
import { isValidEmail, isValidPhone } from '@/lib/formValidation';
import { getEmailJsErrorMessage } from '@/lib/getEmailJsErrorMessage';
import { sendSupportInquiryEmail } from '@/lib/sendSupportEmail';
import { useFormStore } from '@/store/formStore';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { contactForm, setContactForm, clearContactForm } = useFormStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = contactForm.firstName?.trim();
    const lastName = contactForm.lastName?.trim();
    const email = contactForm.email?.trim();
    const phone = contactForm.phone?.trim();
    const note = contactForm.note?.trim();

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
    if (!note) {
      toast.error('Please enter a note.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendSupportInquiryEmail({
        firstName,
        lastName,
        email,
        phone,
        note: `Website contact form\n\n${note}`,
      });

      toast.success(
        'Message sent successfully. Our support team will review your submission and contact you shortly.',
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
        }
      );

      clearContactForm();
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Save to store silently (no toast)
    setContactForm({ [name]: value });
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-black py-20 text-white md:py-28 lg:py-32">
      <div className="absolute inset-0">
        <Image
          src="/assets/helpingministersbg.svg"
          alt="Background"
          fill
          className="object-cover opacity-30 blur-sm"
          sizes="100vw"
          loading="lazy"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid items-start gap-10 md:mb-20 md:grid-cols-2 md:gap-12 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/55">Reach out</p>
              <h2 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                Helping ministers
                <br />
                thrive again in
                <br />
                purpose and joy
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.08, ease }}
              className="grid grid-cols-2 gap-5 md:gap-6"
            >
              <div className="relative col-start-2 row-start-1 h-52 overflow-hidden rounded-2xl border-2 border-blue-500/90 shadow-xl md:h-64">
                <Image
                  src="/assets/handsjoining.svg"
                  alt="Hands joining"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <div className="relative col-start-1 row-start-2 h-52 overflow-hidden rounded-2xl border-2 border-red-500/90 shadow-xl md:h-64">
                <Image
                  src="/assets/clappingimg.svg"
                  alt="Clapping"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <div className="relative col-start-2 row-start-3 h-52 overflow-hidden rounded-2xl border-2 border-orange-500/90 shadow-xl md:h-64">
                <Image
                  src="/assets/prayinghandfold.svg"
                  alt="Praying hands"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>

          <div className="mx-auto mb-10 max-w-2xl space-y-6 text-center md:mb-12">
            <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-6 text-left text-sm text-white/90 backdrop-blur-sm md:px-8 md:py-7 md:text-base">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Contact us</p>
              <p className="mt-3 text-center font-medium leading-relaxed text-white">{CONTACT_ADDRESS}</p>
              <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wider text-white/60">Phone</p>
              <p className="mt-2 text-center">
                <a href={`tel:${SUPPORT_PHONE_TEL}`} className="inline-block font-semibold text-white hover:text-blue-200">
                  {SUPPORT_PHONE_DISPLAY}
                </a>
              </p>
            </div>
            <div>
              <p className="text-white/90 text-sm md:text-base mb-2">Prefer email? Reach us directly at</p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg md:text-xl font-semibold text-white hover:text-blue-200 transition-colors break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-2xl rounded-2xl border border-white/20 bg-black/55 p-8 shadow-2xl backdrop-blur-md md:p-10">
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <fieldset
                disabled={isSubmitting}
                className="min-w-0 space-y-6 border-0 p-0 disabled:opacity-75"
              >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={contactForm.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/30 bg-transparent px-4 py-3.5 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={contactForm.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/30 bg-transparent px-4 py-3.5 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/30 bg-transparent px-4 py-3.5 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div>
                <label htmlFor="note" className="block mb-2 text-sm font-medium text-white">
                  Note
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={contactForm.note}
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/30 bg-transparent px-4 py-3.5 text-white placeholder-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400/40"
                  placeholder="How can we help?"
                  required
                />
              </div>
              </fieldset>
              <FormSubmitButton
                isLoading={isSubmitting}
                idleLabel="Get Support"
                loadingLabel="Sending…"
                className="rounded-full bg-blue-600 px-8 py-4 text-white shadow-lg hover:bg-blue-700"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


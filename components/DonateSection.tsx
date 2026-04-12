'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  DONATE_ACCOUNT_NAME,
  DONATE_ACCOUNT_NUMBER_DISPLAY,
  DONATE_ACCOUNT_NUMBER_RAW,
  DONATE_BANK_NAME,
} from '@/lib/donate';

export default function DonateSection() {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(DONATE_ACCOUNT_NUMBER_RAW);
      setCopied(true);
      toast.success('Account number copied.');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy. Please copy manually.');
    }
  };

  return (
    <section
      aria-labelledby="donate-heading"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 md:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#2867AE]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-slate-300/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2867AE]">Partner with MCR</p>
          <h2
            id="donate-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl"
          >
            Want to support this initiative?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Your gift helps us walk alongside ministers with care, counsel, and renewal. Use the bank details below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/90 shadow-lg ring-1 ring-slate-900/[0.04] backdrop-blur-sm">
            <div className="divide-y divide-slate-200/90">
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Account name</p>
                <p className="mt-2 text-base font-medium leading-snug text-slate-900 sm:text-lg">
                  {DONATE_ACCOUNT_NAME}
                </p>
              </div>
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Account number</p>
                    <p className="mt-2 font-mono text-lg tracking-wide text-slate-900 sm:text-xl">
                      {DONATE_ACCOUNT_NUMBER_DISPLAY}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={copyNumber}
                    className="shrink-0 self-start rounded-lg border border-[#2867AE]/30 bg-[#2867AE]/5 px-4 py-2.5 text-sm font-semibold text-[#2867AE] transition hover:bg-[#2867AE]/10 sm:self-center"
                  >
                    {copied ? 'Copied' : 'Copy account number'}
                  </button>
                </div>
              </div>
              <div className="px-6 py-5 sm:px-8 sm:py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Bank name</p>
                <p className="mt-2 text-base font-medium text-slate-900 sm:text-lg">{DONATE_BANK_NAME}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

function DetailBlock({
  label,
  value,
  mono,
  onCopy,
  copyLabel,
}: {
  label: string;
  value: string;
  mono?: boolean;
  onCopy?: () => void;
  copyLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition hover:border-[#2867AE]/30 hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p
        className={`mt-3 text-slate-900 ${mono ? 'font-mono text-lg tracking-wide sm:text-xl' : 'text-base font-medium leading-snug sm:text-lg'}`}
      >
        {value}
      </p>
      {onCopy ? (
        <button
          type="button"
          onClick={onCopy}
          className="mt-4 text-sm font-semibold text-[#2867AE] underline-offset-4 hover:underline"
        >
          {copyLabel ?? 'Copy'}
        </button>
      ) : null}
    </div>
  );
}

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

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
          className="mt-10 grid gap-5 md:grid-cols-3"
        >
          <div className="md:col-span-3">
            <DetailBlock label="Account name" value={DONATE_ACCOUNT_NAME} />
          </div>
          <DetailBlock
            label="Account number"
            value={DONATE_ACCOUNT_NUMBER_DISPLAY}
            mono
            onCopy={copyNumber}
            copyLabel={copied ? 'Copied' : 'Copy account number'}
          />
          <DetailBlock label="Bank name" value={DONATE_BANK_NAME} />
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-300/90 bg-slate-50/80 p-6 text-center text-sm text-slate-600">
            <p>
              Reference your name or church on the transfer when possible so we can acknowledge your generosity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

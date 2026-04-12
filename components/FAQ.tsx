'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageLoader from '@/components/PageLoader';
import SectionReveal from '@/components/SectionReveal';
import { useApiResource } from '@/hooks/useApiResource';
import type { FAQItem } from '@/types/content';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItemRow({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03] transition hover:border-slate-300/90 hover:shadow-md">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50/80 md:px-8 md:py-6"
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-base font-semibold leading-snug text-slate-900 md:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-slate-100"
          >
            <div className="px-6 py-5 text-center text-slate-600 md:px-8 md:py-6 md:text-left md:text-lg md:leading-relaxed">
              {answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { data: faqs, loading, error } = useApiResource<FAQItem[]>('/api/faq');

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2867AE]">Questions</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-lg text-slate-600 md:text-xl">Clear answers about how MCR serves ministers.</p>
        </SectionReveal>
        <div className="mx-auto max-w-3xl space-y-4 md:space-y-5">
          {loading ? (
            <PageLoader fillViewport={false} />
          ) : error || !faqs?.length ? (
            <p className="text-center text-sm text-slate-500">
              {error ? 'Unable to load FAQ.' : 'No questions yet.'}
            </p>
          ) : (
            faqs.map((faq, index) => <FAQItemRow key={index} question={faq.question} answer={faq.answer} />)
          )}
        </div>
      </div>
    </section>
  );
}

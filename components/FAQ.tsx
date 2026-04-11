'use client';

import { useState } from 'react';
import { useApiResource } from '@/hooks/useApiResource';
import type { FAQItem } from '@/types/content';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4 text-center flex-1">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white text-gray-700 border-t border-gray-200">
          <p className="leading-relaxed text-center">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { data: faqs, loading, error } = useApiResource<FAQItem[]>('/api/faq');

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">
          Frequently asked questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 text-sm">Loading questions…</p>
          ) : error || !faqs?.length ? (
            <p className="text-center text-gray-500 text-sm">
              {error ? 'Unable to load FAQ.' : 'No questions yet.'}
            </p>
          ) : (
            faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}


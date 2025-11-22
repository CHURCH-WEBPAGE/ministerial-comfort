'use client';

import { useState } from 'react';

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

const faqs = [
  {
    question: 'What is MCR all about?',
    answer:
      'The Ministerial Comfort and Renewal Initiative (MCR) exists to restore hope, healing, and transformation to ministers in distress. We provide support, guidance, and renewal services to ensure that no servant of God walks alone in their season of struggle.',
  },
  {
    question: 'How can I register?',
    answer:
      'You can register by clicking the "Get Started" button in the header or the "Get Support" button in the hero section. You can also contact us directly through our contact form or by phone.',
  },
  {
    question: 'What benefits come with this initiative?',
    answer:
      'MCR offers various programs including counseling and therapy services, ministerial renewals and sabbaticals, peer support and mentorship, emotional health workshops, emergency crisis response, and online virtual support services.',
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">
          Frequently asked questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}


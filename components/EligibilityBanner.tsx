'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function EligibilityBanner() {
  return (
    <section id="eligibility" className="bg-white py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease }}
          className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-900/10"
        >
          <div className="relative min-h-[380px] md:min-h-[460px] lg:min-h-[500px]">
            <Image
              src="/assets/gopraying.svg"
              alt="Eligibility requirements"
              fill
              className="object-cover"
              sizes="100vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/75 to-slate-900/20" />

            <div className="relative z-10 flex min-h-[380px] flex-col justify-center px-6 py-12 md:min-h-[460px] md:px-14 lg:min-h-[500px] lg:px-20">
              <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                <div className="max-w-2xl space-y-6 text-center lg:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Who can participate</p>
                  <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl xl:text-6xl">
                    Our eligibility requirements
                  </h2>
                  <p className="text-lg leading-relaxed text-white/85 md:text-xl md:leading-relaxed">
                    To ensure that Ministerial Comfort &amp; Renewal (MCR) serves those who genuinely need support,
                    eligibility criteria have been established for ministers seeking to participate in the program.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link
                    href="/eligibility"
                    className="inline-flex min-w-[11rem] items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

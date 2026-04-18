'use client';

import Image from '@/components/ProgressiveImage';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero2.jpg"
          alt="MCR Hero"
          fill
          className="object-cover motion-safe:animate-hero-ken"
          sizes="100vw"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/40 to-black/25 z-10" />

      <div className="relative z-20 flex min-h-[100dvh] items-center py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl md:ml-8 lg:ml-16 lg:max-w-5xl">
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
              <div className="flex-1 space-y-8">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="text-sm font-semibold uppercase tracking-[0.28em] text-white"
                >
                  Ministerial Comfort &amp; Renewal
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.06, ease }}
                  className="text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  Restoring hope and renewal for ministers
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.14, ease }}
                  className="max-w-2xl text-lg leading-relaxed text-white md:text-xl md:leading-relaxed"
                >
                  You are not alone. Support, restoration, and guidance are here for you.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.28, ease }}
                className="shrink-0"
              >
                <Link
                  href="/#contact"
                  className="inline-flex min-w-[12rem] items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100 hover:shadow-2xl md:py-4 md:text-lg"
                >
                  Get support
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

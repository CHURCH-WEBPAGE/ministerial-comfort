'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="relative py-20 bg-black text-white overflow-hidden">
      {/* Background Image with blur */}
      <div className="absolute inset-0">
        <Image
          src="/assets/helpingministersbg.svg"
          alt="Background"
          fill
          className="object-cover opacity-30 blur-sm"
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Section - Text on left, Images on right */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
            {/* Left Side - Text */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Helping ministers
                <br />
                thrive again in
                <br />
                purpose and joy
              </h2>
            </div>

            {/* Right Side - Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg col-start-2 row-start-1">
                <Image
                  src="/assets/handsjoining.svg"
                  alt="Hands joining"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={90}
                />
              </div>
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden border-2 border-red-500 shadow-lg col-start-1 row-start-2">
                <Image
                  src="/assets/clappingimg.svg"
                  alt="Clapping"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={90}
                />
              </div>
              <div className="relative h-48 md:h-56 rounded-lg overflow-hidden border-2 border-orange-500 shadow-lg col-start-2 row-start-3">
                <Image
                  src="/assets/prayinghandfold.svg"
                  alt="Praying hands"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={90}
                />
              </div>
            </div>
          </div>

          {/* Bottom Section - Contact Form */}
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/20 shadow-xl max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
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
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                  Your Message...
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-transparent border border-white/30 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none transition-colors"
                  placeholder="Your Message..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg"
              >
                Get Support
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}


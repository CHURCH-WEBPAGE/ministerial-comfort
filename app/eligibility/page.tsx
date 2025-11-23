'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';

export default function EligibilityPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <section className="relative h-[200px] md:h-[250px] mb-12">
        <Image
          src="/assets/gopraying.svg"
          alt="Eligibility requirements"
          fill
          className="object-cover"
          style={{ objectPosition: 'top center' }}
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center md:mx-3xl">
              <button
                onClick={handleBack}
                className="mr-3 p-1 hover:bg-white/10 rounded transition-colors"
                aria-label="Go back"
              >
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </button>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-md md:max-w-lg">
                Our Eligibility Requirements
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">
            To ensure that the Ministerial Comfort &amp; Renewal Initiative (MCR) serves those who genuinely need support, the following eligibility criteria have been established for ministers seeking to participate in the program;
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-10 text-center">
                <span className="flex items-center justify-center">
                  <span className="h-px w-12 bg-[#2867AE] mr-4"></span>
                  <span>Eligibility Criteria</span>
                  <span className="h-px w-12 bg-[#2867AE] ml-4"></span>
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Active or Former Ministry Involvement Within the FGCN</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Must be an Inducted or Licensed minister or pastor.</li>
                      <li>Must have at least two years of experience in full-time or part-time ministry.</li>
                      <li>Former ministers who left ministry due to burnout, stress, or personal challenges may also be considered.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Commitment to the Recovery Process</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Must be willing to engage in counseling sessions and submit to the Guided Recovery Program (GRP).</li>
                      <li>Must agree to confidentiality guidelines to maintain a safe and secure healing environment.</li>
                      <li>Must demonstrate a genuine desire for recovery, renewal, and self-care.</li>
                    </ol>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                    <span className="">
                      <span>Evidence of Need</span>
                    </span>
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">
                    Must demonstrate emotional, spiritual, or mental health challenges related to ministry, such as:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                    <li>Burnout and exhaustion</li>
                    <li>Anxiety, depression, or stress</li>
                    <li>Personal crises affecting ministry effectiveness</li>
                    <li>Feelings of isolation or disconnection from the church community</li>
                    <li>A self-assessment questionnaire and/or a referral from a church leader, counselor, or trusted peer may be required.</li>
                  </ol>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-10 text-center">
                <span className="flex items-center justify-center">
                  <span className="h-px w-12 bg-[#2867AE] mr-4"></span>
                  <span>Specific Program Requirements</span>
                  <span className="h-px w-12 bg-[#2867AE] ml-4"></span>
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Counselling Services</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Ministers experiencing severe emotional distress or personal crises will be prioritized.</li>
                      <li>Participants must commit to attending a minimum of three counseling sessions with a licensed counselor or pastoral care provider.</li>
                      <li>Additional sessions may be recommended based on individual needs.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Peer Support Groups</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Open to ministers seeking emotional and spiritual support from peers.</li>
                      <li>Participants must be willing to share experiences and encourage fellow ministers.</li>
                    </ol>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Retreat and Short-term Sabbatical Program</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Ministers applying for a retreat or sabbatical must have been in active ministry for at least five years.</li>
                      <li>A letter of recommendation from a church leader, ZS or D.O.</li>
                      <li>Preference will be given to those who have not taken a sabbatical in the past five years.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
                      <span className="">
                        <span>Workshops and Training</span>
                      </span>
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                      <li>Open to all ministers seeking personal development in stress management, selfcare, and mental resilience.</li>
                      <li>No prior approval needed, but registration is required for logistical planning. These sessions can be both virtual and/or physical.</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-8 text-start">
                <span className="">
                  <span>Special Considerations</span>
                </span>
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                <li>
                  <strong>Financial Assistance:</strong> Ministers in financial hardship may apply for sponsorships or grants to cover counseling or retreat costs.
                </li>
                <li>The initiative can subsequently be open to ministers from other Christian denominations.</li>
                <li>
                  <strong>Confidentiality Assurance:</strong> Personal information shared within the program will be kept strictly confidential.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-8 text-start">
                <span className="">
                  <span>Application Process</span>
                </span>
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                <li>Complete an online or physical application form detailing ministry background and current challenges.</li>
                <li>Undergo an initial consultation (self-assessment or referral-based). This will be followed by a medical assessment of the applicant.</li>
                <li>Receive program placement (counseling, support groups, retreats, or training).</li>
                <li>Commit to participation as per program guidelines.</li>
              </ol>
            </section>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollDownArrow />
    </main>
  );
}


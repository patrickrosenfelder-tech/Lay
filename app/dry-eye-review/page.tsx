import React from 'react';

import Image from 'next/image';

import Link from 'next/link';

export default function DryEyePage() {

  return (

    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* Hero Section */}

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-16 md:py-24 border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase">

                <span>FDA-Approved Advanced Ocular Care</span>

              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">

                Envision by InMode: <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">

                  Root-Cause Dry Eye Relief

                </span>

              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">

                Move beyond temporary eye drops. Our non-surgical, non-drug Radio Frequency (RF) and Intense Pulsed Light (IPL) therapies restore your eyes' natural oil glands and eliminate surface inflammation for lasting comfort.

              </p>

              

              <div className="flex flex-wrap gap-4 pt-4">

                <a

                  href="#booking"

                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 text-center"

                >

                  Book Dry Eye Evaluation

                </a>

                <a

                  href="#pricing"

                  className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all duration-200 text-center"

                >

                  View Treatment Packages

                </a>

              </div>

              {/* Key Quick Specs */}

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-sm">

                <div>

                  <div className="text-cyan-400 font-bold text-lg">100% Non-Drug</div>

                  <div className="text-slate-400 text-xs">No daily drop dependence</div>

                </div>

                <div>

                  <div className="text-cyan-400 font-bold text-lg">4 Sessions</div>

                  <div className="text-slate-400 text-xs">Recommended full series</div>

                </div>

                <div>

                  <div className="text-cyan-400 font-bold text-lg">Zero Downtime</div>

                  <div className="text-slate-400 text-xs">Resume normal activity</div>

                </div>

              </div>

            </div>

            <div className="lg:col-span-5 relative">

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">

                <img

                  src="/Envision Master.jpg"

                  alt="Envision by InMode Dry Eye Treatment"

                  className="w-full h-auto object-cover"

                />

                <div className="p-6 bg-slate-900/90 backdrop-blur">

                  <div className="flex items-center gap-4">

                    <img

                      src="/dr-nim.webp"

                      alt="Dr. Lay Nim"

                      className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400"

                    />

                    <div>

                      <h3 className="text-white font-bold text-base">Dr. Lay Nim, OD</h3>

                      <p className="text-slate-400 text-xs">Ocular Surface & Dry Eye Specialist</p>

                      <p className="text-cyan-400 text-xs font-medium mt-0.5">Precision Vision Institute</p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Philosophy: Root Cause vs. Temporary Drops */}

      <section className="py-16 md:py-24 bg-slate-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

            <h2 className="text-3xl sm:text-4xl font-bold text-white">

              Why Artificial Tears & Prescription Drops Aren't Enough

            </h2>

            <p className="text-slate-400 text-base sm:text-lg">

              Most dry eye sufferers spend years rotating through artificial tears without addressing <span className="text-cyan-300 font-semibold">why</span> their eyes are dry in the first place.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Traditional Drops Box */}

            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">

              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xl">

                ✕

              </div>

              <h3 className="text-xl font-bold text-white">Traditional Eye Drops & Artificial Tears</h3>

              <ul className="space-y-3 text-slate-300 text-sm">

                <li className="flex items-start gap-2">

                  <span className="text-red-400 font-bold">·</span>

                  <span>Provides brief, temporary surface lubrication lasting only a few hours.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-red-400 font-bold">·</span>

                  <span>Does not unblock clogged meibomian oil glands or stop tear evaporation.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-red-400 font-bold">·</span>

                  <span>Requires lifelong compliance, daily hassle, and ongoing monthly expense.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-red-400 font-bold">·</span>

                  <span>Leaves underlying gland atrophy and chronic inflammation untreated.</span>

                </li>

              </ul>

            </div>

            {/* Envision Procedural Box */}

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-950/30 to-slate-900 border border-cyan-500/30 space-y-4 shadow-xl">

              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-bold text-xl">

                ✓

              </div>

              <h3 className="text-xl font-bold text-white">Envision Procedural Technology</h3>

              <ul className="space-y-3 text-slate-200 text-sm">

                <li className="flex items-start gap-2">

                  <span className="text-cyan-400 font-bold">✓</span>

                  <span>Restores healthy oil flow from meibomian glands to lock in tear moisture.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-cyan-400 font-bold">✓</span>

                  <span>Targets inflammation, ocular rosacea, blepharitis, and Demodex at the source.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-cyan-400 font-bold">✓</span>

                  <span>Non-drug, procedure-based therapy that significantly reduces drop dependency.</span>

                </li>

                <li className="flex items-start gap-2">

                  <span className="text-cyan-400 font-bold">✓</span>

                  <span>Delivers long-term restorative health and improved vision stability.</span>

                </li>

              </ul>

            </div>

          </div>

          {/* Root Cause Analogy Banner */}

          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-4xl mx-auto">

            <p className="text-slate-300 italic text-base sm:text-lg leading-relaxed">

              "Using drops on dry eyes is like watering a plant with poor soil — you temporarily wet the surface, but the environment causing the problem remains unhealthy. Envision restores the gland health and soil so your eyes produce stable, natural tears."

            </p>

          </div>

        </div>

      </section>

      {/* Dual-Modality Technology Section */}

      <section className="py-16 md:py-24 bg-slate-900/60 border-t border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

            <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase">

              Dual-Modality Excellence

            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">

              How Envision Technology Works

            </h2>

            <p className="text-slate-400 text-base">

              Envision combines two complementary, FDA-approved modalities to address both oil gland obstruction and ocular surface inflammation in a single treatment protocol.

            </p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Forma-I (RF) */}

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all">

              <div className="flex items-center justify-between mb-6">

                <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold">

                  Modality 1: Radio Frequency (RF)

                </span>

                <span className="text-slate-400 text-xs">Forma-I Device</span>

              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Forma-I Thermal Expression</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">

                Forma-I delivers gentle, controlled radio frequency heat to the upper and lower eyelids. The therapeutic warmth melts hardened, stagnant oil clogging the meibomian glands, allowing natural oils to flow freely into your tear film and preventing rapid tear evaporation.

              </p>

              <div className="space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-400">

                <div className="flex justify-between">

                  <span className="font-semibold text-slate-200">Primary Targets:</span>

                  <span>Meibomian Gland Dysfunction (MGD), Styes, Chalazions</span>

                </div>

                <div className="flex justify-between">

                  <span className="font-semibold text-slate-200">Patient Sensation:</span>

                  <span>Relaxing, warm eyelid massage</span>

                </div>

              </div>

            </div>

            {/* Lumecca-I (IPL) */}

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all">

              <div className="flex items-center justify-between mb-6">

                <span className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-semibold">

                  Modality 2: Intense Pulsed Light (IPL)

                </span>

                <span className="text-slate-400 text-xs">Lumecca-I Device</span>

              </div>

              <h3 className="text-2xl font-bold text-white mb-3">Lumecca-I Light Therapy</h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">

                Lumecca-I utilizes targeted pulses of light to seal off abnormal telangiectatic blood vessels that leak inflammatory markers around the eyes. It closes the inflammatory cascade, treats ocular rosacea, resolves blepharitis, and eradicates Demodex mites.

              </p>

              <div className="space-y-2 border-t border-slate-800 pt-4 text-xs text-slate-400">

                <div className="flex justify-between">

                  <span className="font-semibold text-slate-200">Primary Targets:</span>

                  <span>Ocular Rosacea, Blepharitis, Demodex Mites, Vascular Inflammation</span>

                </div>

                <div className="flex justify-between">

                  <span className="font-semibold text-slate-200">Patient Sensation:</span>

                  <span>Gentle, warm light pulses with protective eye shields</span>

                </div>

              </div>

            </div>

          </div>

          {/* Office Showcase Image */}

          <div className="mt-12 rounded-2xl overflow-hidden border border-slate-800 relative group">

            <img

              src="/office-lounge.webp"

              alt="Precision Vision Institute Office Lounge"

              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"

            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">

              <div>

                <h4 className="text-xl font-bold text-white">State-of-the-Art Dry Eye Suite</h4>

                <p className="text-slate-300 text-sm mt-1">Designed for maximum patient comfort in a modern, soothing clinic environment in Duluth, GA.</p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Key Patient Benefits */}

      <section className="py-16 md:py-24 bg-slate-950">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

            <h2 className="text-3xl sm:text-4xl font-bold text-white">Key Patient Benefits</h2>

            <p className="text-slate-400 text-base">What you can expect from your Envision treatment journey.</p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">

              <div className="text-cyan-400 text-2xl font-bold">01</div>

              <h3 className="text-lg font-bold text-white">Proven Root-Cause Results</h3>

              <p className="text-slate-400 text-sm">Addresses gland blockage and vascular inflammation directly for sustained, long-term improvement rather than masking symptoms.</p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">

              <div className="text-cyan-400 text-2xl font-bold">02</div>

              <h3 className="text-lg font-bold text-white">Fast & Non-Invasive</h3>

              <p className="text-slate-400 text-sm">No surgery, no incisions, and zero downtime. Patients can immediately return to work, driving, and normal daily activities.</p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-3">

              <div className="text-cyan-400 text-2xl font-bold">03</div>

              <h3 className="text-lg font-bold text-white">Noticeable Relief After 2 Sessions</h3>

              <p className="text-slate-400 text-sm">Most patients notice significant reduction in burning, itching, redness, and fluctuating vision after their second session.</p>

            </div>

          </div>

        </div>

      </section>

      {/* Transparent Pricing Section */}

      <section id="pricing" className="py-16 md:py-24 bg-slate-900/80 border-t border-b border-slate-800">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">

            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase">

              Transparent Investment

            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">Envision Treatment Packages</h2>

            <p className="text-slate-400 text-base">

              Clear, upfront pricing with single-session and full 4-treatment package options.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Forma-I */}

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">

              <div className="space-y-4">

                <h3 className="text-xl font-bold text-white">Forma-I (RF Therapy)</h3>

                <p className="text-slate-400 text-xs">Radio frequency heat therapy for MGD, styes, and chalazions.</p>

                <div className="py-4 border-t border-b border-slate-800 space-y-2">

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">1 Treatment:</span>

                    <span className="text-2xl font-extrabold text-white">$500</span>

                  </div>

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">4 Treatments:</span>

                    <span className="text-2xl font-extrabold text-cyan-400">$1,700</span>

                  </div>

                </div>

                <ul className="space-y-2 text-xs text-slate-300">

                  <li>✓ Thermal oil gland expression</li>

                  <li>✓ Melts hardened meibomian secretions</li>

                  <li>✓ Non-invasive eyelid massage</li>

                </ul>

              </div>

              <a

                href="#booking"

                className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-sm transition-colors"

              >

                Book Forma-I

              </a>

            </div>

            {/* Lumecca-I */}

            <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">

              <div className="space-y-4">

                <h3 className="text-xl font-bold text-white">Lumecca-I (IPL Therapy)</h3>

                <p className="text-slate-400 text-xs">Targeted light therapy for rosacea, blepharitis, and demodex.</p>

                <div className="py-4 border-t border-b border-slate-800 space-y-2">

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">1 Treatment:</span>

                    <span className="text-2xl font-extrabold text-white">$500</span>

                  </div>

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">4 Treatments:</span>

                    <span className="text-2xl font-extrabold text-cyan-400">$1,700</span>

                  </div>

                </div>

                <ul className="space-y-2 text-xs text-slate-300">

                  <li>✓ Reduces telangiectatic blood vessels</li>

                  <li>✓ Treats ocular rosacea & blepharitis</li>

                  <li>✓ Eradicates Demodex overgrowth</li>

                </ul>

              </div>

              <a

                href="#booking"

                className="mt-8 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-center text-sm transition-colors"

              >

                Book Lumecca-I

              </a>

            </div>

            {/* Complete Dry Eye Package (Featured) */}

            <div className="p-8 rounded-2xl bg-gradient-to-b from-cyan-950/40 via-slate-900 to-slate-950 border-2 border-cyan-400/80 flex flex-col justify-between relative shadow-2xl">

              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-400 text-slate-950 font-bold text-xs rounded-full uppercase tracking-wider">

                Recommended Flagship Package

              </div>

              <div className="space-y-4 mt-2">

                <h3 className="text-xl font-bold text-white">Complete Dry Eye Package</h3>

                <p className="text-slate-300 text-xs">Forma-I (RF) + Lumecca-I (IPL) combined in every session.</p>

                <div className="py-4 border-t border-b border-slate-800/80 space-y-2">

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">1 Treatment:</span>

                    <span className="text-2xl font-extrabold text-white">$750</span>

                  </div>

                  <div className="flex justify-between items-baseline">

                    <span className="text-slate-300 text-sm">4 Treatments:</span>

                    <span className="text-3xl font-black text-cyan-300">$2,700</span>

                  </div>

                </div>

                <ul className="space-y-2 text-xs text-slate-200">

                  <li className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Dual RF heat + IPL light in 1 visit</li>

                  <li className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Highest value vs separate procedures</li>

                  <li className="flex items-center gap-1.5"><span className="text-cyan-400">✓</span> Comprehensive gland & surface restoration</li>

                </ul>

              </div>

              <a

                href="#booking"

                className="mt-8 w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold rounded-xl text-center text-sm shadow-lg transition-transform hover:scale-[1.02]"

              >

                Get Complete Package

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* Frequently Asked Questions (FAQ) */}

      <section className="py-16 md:py-24 bg-slate-950">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16 space-y-3">

            <h2 className="text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>

            <p className="text-slate-400 text-base">Answers to common questions about dry eye causes, Envision, and insurance.</p>

          </div>

          <div className="space-y-6">

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">What causes dry eyes, and why don't drops cure them?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                Over 80% of dry eye sufferers have Meibomian Gland Dysfunction (MGD) or chronic eyelid inflammation where the protective oil layer of tears is missing, causing tears to evaporate rapidly. Drops add temporary surface water but do not open clogged glands or stop inflammation. <strong className="text-cyan-300">Dry eyes can also be a result of surgery like LASIK and other autoimmune conditions</strong> (such as Sjogren's syndrome, rosacea, or lupus), which require targeted thermal and light therapies rather than artificial tears alone.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">Can Envision help if my dry eyes stem from LASIK surgery or an autoimmune condition?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                Yes, absolutely. <strong className="text-cyan-300">Dry eyes can also be a result of surgery like LASIK and other autoimmune conditions</strong>. Post-LASIK nerve sensitivity changes and systemic inflammation often impair natural tear output. Envision's dual RF and IPL technologies gently calm ocular surface inflammation and stimulate oil gland activity to help post-surgical and autoimmune patients achieve consistent, lasting comfort.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">How does Envision by InMode work?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                Envision utilizes two proven technologies: Forma-I uses controlled radio frequency heat to melt hardened oils blocking your meibomian glands, while Lumecca-I uses specialized Intense Pulsed Light (IPL) to seal leaking, inflammatory blood vessels and eradicate Demodex mites around the eyelids.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">Is the treatment painful, and is there any downtime?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                No, the procedure is gentle and comfortable. Forma-I feels like a warm, soothing eyelid massage. Lumecca-I delivers warm pulses of light (with protective eye shields in place). There is zero downtime, and you can immediately return to your normal routine.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">How many treatments will I need, and how quickly will I see results?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                We generally recommend a series of 4 treatments spaced about 4 weeks apart. Most patients report noticeable improvements in tear comfort, reduced redness, and clearer vision after their second session.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-2">

              <h3 className="text-lg font-bold text-white">Does medical insurance cover Envision dry eye procedures?</h3>

              <p className="text-slate-300 text-sm leading-relaxed">

                Insurance covers diagnostic exams and prescription drops, but advanced procedural treatments designed to restore gland function are private-pay. We offer transparent package pricing ($500 to $2,700) and CareCredit payment options to make restorative care manageable.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Booking Widget / CTA */}

      <section id="booking" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">

            Schedule Your Dry Eye Evaluation

          </h2>

          <p className="text-slate-300 text-base sm:text-lg">

            Experience lasting, restorative dry eye relief at Precision Vision Institute in Duluth, GA.

          </p>

          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">

            <div className="text-cyan-400 font-bold text-xl">Precision Vision Institute</div>

            <p className="text-slate-400 text-sm">Dr. Lay Nim, OD — Duluth, GA</p>

            <p className="text-slate-300 text-sm">Call us or book your appointment online for an Envision consultation.</p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">

              <a

                href="tel:7700000000"

                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-colors text-sm"

              >

                Call Office

              </a>

              <a

                href="/#booking"

                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm"

              >

                Online Booking Widget

              </a>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

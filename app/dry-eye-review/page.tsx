import React from 'react';

import BookingWidget from '../BookingWidget';

export default function DryEyePage() {

  return (

    <main className="min-h-screen bg-white text-slate-900 font-sans">

      {/* Breadcrumb / Top Bar */}

      <div className="bg-slate-50 border-b border-slate-200 py-3">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2">

          <a href="/" className="hover:text-slate-900 transition-colors">Home</a>

          <span>/</span>

          <a href="/services" className="hover:text-slate-900 transition-colors">Services</a>

          <span>/</span>

          <span className="text-slate-900 font-medium">Dry Eye Treatment</span>

        </div>

      </div>

      {/* Hero Section */}

      <section className="relative bg-gradient-to-b from-slate-50 via-white to-white py-12 md:py-20 border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-7 space-y-5">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold uppercase tracking-wider">

                Advanced Eye Care in Duluth, GA

              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">

                Envision by InMode: <br />

                <span className="text-teal-700">Root-Cause Dry Eye Therapy</span>

              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">

                Experience lasting relief from dry, burning, or irritated eyes. Our non-surgical, non-drug Radio Frequency (RF) and Intense Pulsed Light (IPL) treatments unblock oil glands and eliminate surface inflammation at the source.

              </p>

              

              <div className="flex flex-wrap gap-4 pt-2">

                <a

                  href="#booking"

                  className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg shadow-sm transition-all text-center text-sm"

                >

                  Schedule Dry Eye Consultation

                </a>

                <a

                  href="#pricing"

                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg border border-slate-300 transition-all text-center text-sm"

                >

                  View Treatment Pricing

                </a>

              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">

                <div>

                  <div className="text-slate-900 font-bold text-base">Non-Drug</div>

                  <div className="text-slate-500">No daily drop hassle</div>

                </div>

                <div>

                  <div className="text-slate-900 font-bold text-base">4 Sessions</div>

                  <div className="text-slate-500">Standard protocol</div>

                </div>

                <div>

                  <div className="text-slate-900 font-bold text-base">Zero Downtime</div>

                  <div className="text-slate-500">Immediate recovery</div>

                </div>

              </div>

            </div>

            <div className="lg:col-span-5">

              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md bg-white">

                <img

                  src="/Envision Master.jpg"

                  alt="Envision by InMode Dry Eye Treatment"

                  className="w-full h-auto object-cover"

                />

                <div className="p-5 bg-slate-900 text-white">

                  <div className="flex items-center gap-4">

                    <img

                      src="/dr-nim.webp"

                      alt="Dr. Lay Nim, OD"

                      className="w-12 h-14 rounded-full object-cover border-2 border-teal-400"

                    />

                    <div>

                      <h3 className="text-white font-bold text-sm">Dr. Lay Nim, OD</h3>

                      <p className="text-slate-300 text-xs">Dry Eye & Ocular Surface Specialist</p>

                      <p className="text-teal-300 text-xs font-semibold mt-0.5">Precision Vision Institute</p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Understanding Dry Eye */}

      <section className="py-12 md:py-16 bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">

              Understanding Dry Eye Disease

            </h2>

            <p className="text-slate-600 text-sm sm:text-base">

              Over 80% of dry eye cases are caused by Meibomian Gland Dysfunction (MGD) — where the oil glands along your eyelids become clogged, causing your natural tears to evaporate rapidly.

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">

              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm">

                ✕

              </div>

              <h3 className="text-lg font-bold text-slate-900">Eye Drops & Artificial Tears</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Eye drops add temporary moisture to the eye's surface, but they do not clear blocked oil glands or stop tear evaporation. They manage symptoms temporarily rather than fixing the underlying problem.

              </p>

            </div>

            <div className="p-6 rounded-xl bg-teal-50/60 border border-teal-200 space-y-3">

              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">

                ✓

              </div>

              <h3 className="text-lg font-bold text-slate-900">Envision Procedural Therapy</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Envision uses targeted thermal heat and light energy to melt clogged oils, restore natural meibomian gland flow, and eliminate inflammation along the eyelids for true, long-term comfort.

              </p>

            </div>

          </div>

          <div className="mt-8 p-6 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto">

            <p className="text-slate-700 italic text-sm sm:text-base">

              "Using drops on dry eyes is like watering a plant with poor soil — it briefly wets the surface, but the environment remains dry. Envision restores gland health so your eyes produce stable, natural tears."

            </p>

          </div>

        </div>

      </section>

      {/* Technology Breakdown */}

      <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">

            <span className="text-xs font-semibold text-teal-800 uppercase tracking-wider">Advanced Technology</span>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">

              Forma-I (RF) & Lumecca-I (IPL)

            </h2>

            <p className="text-slate-600 text-sm sm:text-base">

              Envision brings together two FDA-approved medical technologies to restore your ocular surface.

            </p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">

              <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 font-mono text-xs font-semibold">

                Radio Frequency (RF)

              </span>

              <h3 className="text-xl font-bold text-slate-900">Forma-I Thermal Expression</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Forma-I delivers gentle, therapeutic radio frequency heat to the eyelids. This warmth melts hardened oils clogging the meibomian glands, unblocking them so essential lipids can flow into your tear film to prevent evaporation.

              </p>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">

                <strong>Treats:</strong> Meibomian Gland Dysfunction (MGD), Styes, Chalazions

              </div>

            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">

              <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-800 font-mono text-xs font-semibold">

                Intense Pulsed Light (IPL)

              </span>

              <h3 className="text-xl font-bold text-slate-900">Lumecca-I Light Therapy</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Lumecca-I uses precise light wavelengths to close abnormal, leaky blood vessels around the eyelids, stopping the spread of inflammatory markers. It treats ocular rosacea, resolves blepharitis, and eradicates Demodex mites.

              </p>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">

                <strong>Treats:</strong> Ocular Rosacea, Blepharitis, Demodex Mites, Eyelid Redness

              </div>

            </div>

          </div>

          {/* Office Image */}

          <div className="mt-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">

            <img

              src="/office-lounge.webp"

              alt="Precision Vision Institute Office"

              className="w-full h-56 sm:h-72 object-cover"

            />

            <div className="absolute inset-0 bg-slate-900/60 flex items-end p-6">

              <p className="text-white text-sm font-medium">State-of-the-Art Dry Eye Suite at Precision Vision Institute, Duluth, GA.</p>

            </div>

          </div>

        </div>

      </section>

      {/* Pricing Tiers */}

      <section id="pricing" className="py-12 md:py-16 bg-white border-b border-slate-200">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Transparent Package Pricing</h2>

            <p className="text-slate-600 text-sm">Clear, upfront options for single sessions and full 4-treatment packages.</p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">

              <div className="space-y-3">

                <h3 className="text-lg font-bold text-slate-900">Forma-I (RF Therapy)</h3>

                <p className="text-slate-500 text-xs">Radio frequency heat therapy for MGD & stye relief.</p>

                <div className="py-3 border-t border-b border-slate-200 space-y-1">

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">Single Treatment:</span>

                    <span className="font-bold text-slate-900">$500</span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">4-Session Package:</span>

                    <span className="font-bold text-teal-700">$1,700</span>

                  </div>

                </div>

              </div>

              <a href="#booking" className="mt-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg text-center text-xs transition-colors">

                Book Forma-I

              </a>

            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">

              <div className="space-y-3">

                <h3 className="text-lg font-bold text-slate-900">Lumecca-I (IPL Therapy)</h3>

                <p className="text-slate-500 text-xs">Light therapy for rosacea, blepharitis & demodex.</p>

                <div className="py-3 border-t border-b border-slate-200 space-y-1">

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">Single Treatment:</span>

                    <span className="font-bold text-slate-900">$500</span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">4-Session Package:</span>

                    <span className="font-bold text-teal-700">$1,700</span>

                  </div>

                </div>

              </div>

              <a href="#booking" className="mt-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg text-center text-xs transition-colors">

                Book Lumecca-I

              </a>

            </div>

            <div className="p-6 rounded-xl bg-teal-50/80 border-2 border-teal-500 flex flex-col justify-between relative shadow-sm">

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-teal-700 text-white font-bold text-[10px] rounded-full uppercase tracking-wider">

                Flagship Package

              </div>

              <div className="space-y-3 mt-1">

                <h3 className="text-lg font-bold text-slate-900">Complete Dry Eye Package</h3>

                <p className="text-slate-600 text-xs">Forma-I (RF) + Lumecca-I (IPL) combined in every session.</p>

                <div className="py-3 border-t border-b border-teal-200 space-y-1">

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">Single Treatment:</span>

                    <span className="font-bold text-slate-900">$750</span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-slate-600">4-Session Package:</span>

                    <span className="font-extrabold text-teal-800 text-lg">$2,700</span>

                  </div>

                </div>

              </div>

              <a href="#booking" className="mt-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg text-center text-xs transition-colors">

                Get Complete Package

              </a>

            </div>

          </div>

        </div>

      </section>

      {/* Frequently Asked Questions */}

      <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 space-y-2">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>

            <p className="text-slate-600 text-sm">Common questions about dry eye, treatments, and expectations.</p>

          </div>

          <div className="space-y-4">

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">What causes dry eyes, and why don't artificial tears cure them?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Most dry eye disease stems from Meibomian Gland Dysfunction (MGD) or eyelid inflammation where tears evaporate too quickly. Artificial tears add brief surface moisture but do not open clogged glands or stop inflammation. <strong className="text-teal-800">Dry eyes can also be a result of surgery like lasik and other autoimmune conditions</strong> (such as Sjogren's syndrome, rosacea, or lupus), which require targeted thermal and light procedures rather than drops alone.

              </p>

            </div>

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">Can Envision help post-LASIK or autoimmune dry eyes?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Yes. <strong className="text-teal-800">Dry eyes can also be a result of surgery like lasik and other autoimmune conditions</strong>. Post-LASIK nerve sensitivity changes and systemic inflammation impair natural tear production. Envision's dual RF and IPL technologies gently calm ocular surface inflammation and stimulate oil gland activity for consistent comfort.

              </p>

            </div>

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">How does Envision by InMode work?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Forma-I uses radio frequency heat to melt clogged oils blocking meibomian glands, while Lumecca-I uses Intense Pulsed Light (IPL) to seal leaking inflammatory blood vessels and eradicate Demodex mites.

              </p>

            </div>

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">Is the procedure painful or accompanied by downtime?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                No, the procedure is gentle and non-invasive. Forma-I feels like a warm eyelid massage, while Lumecca-I delivers warm pulses of light. There is zero downtime, and you can immediately resume normal activities.

              </p>

            </div>

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">How many sessions will I need?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                We generally recommend a series of 4 treatments spaced about 4 weeks apart. Most patients report noticeable improvements after their second session.

              </p>

            </div>

            <div className="p-5 rounded-lg bg-white border border-slate-200 space-y-2">

              <h3 className="text-base font-bold text-slate-900">Is Envision covered by insurance?</h3>

              <p className="text-slate-600 text-sm leading-relaxed">

                Insurance covers diagnostic exams and prescription drops, but procedural gland treatments are out-of-pocket. We offer transparent package options ($500 to $2,700) and financing options (CareCredit).

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Booking Widget Container */}

      <section id="booking" className="py-12 md:py-16 bg-white">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <div className="space-y-2">

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Schedule Your Dry Eye Evaluation</h2>

            <p className="text-slate-600 text-sm">Select a convenient date and time for your consultation at Precision Vision Institute.</p>

          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">

            <BookingWidget />

          </div>

        </div>

      </section>

    </main>

  );

}

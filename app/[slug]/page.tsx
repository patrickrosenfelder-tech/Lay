import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "../ArrowIcon";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { TestimonialsPage } from "../TestimonialsPage";

type DetailPage = {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
  factLabel: string;
  factValue: string;
  highlights: { title: string; copy: string }[];
  sections: {
    label: string;
    title: string;
    copy: string;
    bullets?: string[];
  }[];
  faq?: { question: string; answer: string }[];
  credentials?: { intro: string; name: string; description?: string }[];
  ctaTitle: string;
  ctaCopy: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaConditions?: string[];
};

const pages: Record<string, DetailPage> = {
  sclerals: {
    eyebrow: "Specialty contact lenses",
    title: "A smoother surface for clearer vision.",
    lede:
      "Scleral lenses vault over the cornea and rest on the white of the eye, creating a stable optical surface for eyes that need more than a standard contact lens.",
    image: "/exam-room.jpg",
    imageAlt: "Diagnostic eye care equipment at Precision Vision Institute",
    factLabel: "Designed for",
    factValue: "Complex corneas",
    highlights: [
      {
        title: "Keratoconus",
        copy: "A custom lens can help neutralize distortion from an irregular corneal shape.",
      },
      {
        title: "Severe dry eye",
        copy: "The fluid reservoir beneath the lens may support comfort throughout the day.",
      },
      {
        title: "Post-surgical vision",
        copy: "Specialty optics can address fluctuations, glare, halos, and ghosting after corneal surgery.",
      },
    ],
    sections: [
      {
        label: "How they work",
        title: "The lens does not sit on the cornea.",
        copy:
          "Unlike a conventional contact lens, a scleral lens arches over the sensitive corneal surface. The space beneath it is filled with preservative-free saline, while the larger lens diameter creates a stable fit.",
      },
      {
        label: "Your evaluation",
        title: "Measured, mapped, and refined.",
        copy:
          "Dr. Nim evaluates the health and shape of your eyes using specialized technology such as the Pentacam, Corneal Scleral Profilometer, and Ovitz Wavefront Analysis. These measurements help guide diagnostic lens selection before vision, comfort, clearance, and edge alignment are refined for your individualized design.",
        bullets: [
          "Pentacam corneal tomography",
          "Corneal Scleral Profilometer mapping",
          "Ovitz Wavefront Analysis",
          "Diagnostic lens fitting",
          "Insertion and removal training",
          "Follow-up adjustments",
        ],
      },
      {
        label: "What to bring",
        title: "Help us understand your current vision.",
        copy:
          "Bring your current glasses, contact lenses, lens cases, and any records that explain prior surgery or a corneal diagnosis. The clinic will tell you whether to stop wearing existing lenses before your evaluation.",
      },
    ],
    faq: [
      {
        question: "Are scleral lenses comfortable?",
        answer:
          "Yes. Although scleral lenses are larger than traditional contacts, they rest on the sclera, which has fewer nerve endings than the cornea. Most patients find them surprisingly comfortable after a brief adjustment period.",
      },
      {
        question: "Can scleral lenses help dry eyes?",
        answer:
          "Yes. The fluid reservoir beneath the lens continuously bathes the cornea in preservative-free saline, making scleral lenses an excellent option for many patients with moderate to severe dry eye disease.",
      },
      {
        question: "Can scleral lenses help keratoconus?",
        answer:
          "Absolutely. Scleral lenses are considered one of the most effective non-surgical treatments for keratoconus because they create a smooth optical surface over the irregular cornea, often providing significantly clearer vision than glasses or soft contact lenses.",
      },
      {
        question: "Are scleral lenses covered by insurance?",
        answer:
          "Coverage varies depending on your medical diagnosis and insurance plan. Our team will review your benefits and discuss any available coverage before beginning treatment.",
      },
    ],
    ctaTitle: "Schedule your scleral lens consultation.",
    ctaCopy:
      "If blurry vision, discomfort, or dry eyes are limiting your daily life, we're here to help. Schedule a comprehensive scleral lens evaluation with Precision Vision Institute to find out whether custom specialty lenses are the right solution for you. Together, we'll develop a personalized treatment plan designed to help you achieve clearer, more comfortable vision.",
    ctaConditions: [
      "Keratoconus",
      "Severe dry eye disease",
      "Post-surgical corneal irregularity",
      "Corneal ectasia",
      "Other irregular corneas",
    ],
  },
  "dry-eye": {
    eyebrow: "Ocular surface care",
    title: "Dry eye is a clue, not a conclusion.",
    lede:
      "Burning, grittiness, redness, watering, and fluctuating vision can have different causes. A focused evaluation looks for the pattern behind your symptoms.",
    image: "/office-lounge.webp",
    imageAlt: "Comfortable waiting area at Precision Vision Institute",
    factLabel: "First step",
    factValue: "Find the driver",
    highlights: [
      {
        title: "Tear quality",
        copy: "The balance and stability of the tear film affect comfort and clear vision.",
      },
      {
        title: "Lid function",
        copy: "Oil glands along the eyelids can influence how quickly tears evaporate.",
      },
      {
        title: "Surface health",
        copy: "The cornea and conjunctiva reveal where irritation and inflammation are occurring.",
      },
    ],
    sections: [
      {
        label: "A closer look",
        title: "Symptoms do not always tell the whole story.",
        copy:
          "Your visit considers when symptoms happen, medications, contact lens wear, screen use, environment, and prior treatment. Microscopic evaluation helps connect those details to what is happening on the ocular surface.",
      },
      {
        label: "Personalized care",
        title: "A plan matched to the type of dryness.",
        copy:
          "Recommendations may include changes to daily habits, eyelid care, tear support, prescription treatment, or specialty lens options. The plan depends on your exam and diagnosis.",
        bullets: [
          "Symptom and lifestyle review",
          "Tear-film evaluation",
          "Eyelid and gland assessment",
          "Clear follow-up plan",
        ],
      },
      {
        label: "Before your visit",
        title: "Arrive with your usual routine in mind.",
        copy:
          "Bring a list of eye drops and medications you use. Unless the clinic gives different instructions, avoid masking your typical symptoms immediately before the exam.",
      },
    ],
    ctaTitle: "Ready to understand your dry eye?",
    ctaCopy:
      "Choose a dry eye consultation from the live appointment scheduler.",
  },
  "post-laser-vision": {
    eyebrow: "Complex cornea care",
    title: "When surgery changed the shape—not the symptoms.",
    lede:
      "After LASIK, PRK, RK, or other corneal procedures, some people experience glare, halos, ghosting, or vision that shifts throughout the day.",
    image: "/exam-room.jpg",
    imageAlt: "Precision Vision Institute examination room",
    factLabel: "Focus",
    factValue: "Optical stability",
    highlights: [
      {
        title: "Irregular optics",
        copy: "Corneal mapping helps reveal the shape changes behind visual distortion.",
      },
      {
        title: "Fluctuating clarity",
        copy: "A stable lens surface may provide more consistent focus than glasses alone.",
      },
      {
        title: "Comfort",
        copy: "Lens design and ocular surface health are considered together.",
      },
    ],
    sections: [
      {
        label: "Why vision can change",
        title: "A prescription is only one part of the picture.",
        copy:
          "Corneal surgery can leave a surface that is difficult to correct with ordinary lenses. Advanced mapping shows how curvature varies across the eye and helps guide the next step.",
      },
      {
        label: "Specialty options",
        title: "Build a new optical surface.",
        copy:
          "A scleral or other specialty contact lens may mask irregularities by creating a smooth refractive surface in front of the cornea. Suitability depends on your eye health, measurements, and visual goals.",
        bullets: [
          "Corneal topography",
          "Refraction and visual analysis",
          "Diagnostic specialty lens trial",
          "Individualized follow-up",
        ],
      },
      {
        label: "Bring context",
        title: "Previous records can help.",
        copy:
          "Bring surgical records if available, along with your current glasses, contact lenses, and a description of when your vision is best or worst.",
      },
    ],
    ctaTitle: "See whether specialty optics can help.",
    ctaCopy:
      "Schedule a scleral lens or complex-cornea evaluation with Dr. Nim.",
  },
  "ortho-k-crt-lenses": {
    eyebrow: "Myopia management",
    title: "Clearer days begin overnight.",
    lede:
      "Orthokeratology uses specially designed lenses during sleep to temporarily reshape the cornea, supporting clear daytime vision without glasses or contacts.",
    image: "/exam-room.jpg",
    imageAlt: "Eye examination technology used for corneal mapping",
    factLabel: "Treatment",
    factValue: "Non-surgical",
    highlights: [
      {
        title: "Daytime freedom",
        copy: "Lenses are removed in the morning after gently reshaping the cornea overnight.",
      },
      {
        title: "Myopia strategy",
        copy: "Ortho-K may be considered as part of a plan to manage nearsightedness progression.",
      },
      {
        title: "Reversible",
        copy: "The cornea gradually returns toward its original shape when lens wear stops.",
      },
    ],
    sections: [
      {
        label: "How it works",
        title: "Custom lenses worn while sleeping.",
        copy:
          "Corneal topography guides a gas-permeable lens design that changes how tears distribute pressure across the eye. The effect is temporary and requires consistent overnight wear.",
      },
      {
        label: "The fitting",
        title: "A process designed around safety and consistency.",
        copy:
          "Your evaluation includes eye health, prescription, corneal shape, and lifestyle. Follow-up visits check vision, lens position, corneal response, and care technique.",
        bullets: [
          "Baseline eye health exam",
          "Detailed corneal mapping",
          "Lens application and care training",
          "Scheduled progress checks",
        ],
      },
      {
        label: "Good habits matter",
        title: "Results depend on routine.",
        copy:
          "Cleaning, disinfecting, hand hygiene, and attending follow-up visits are essential. Dr. Nim will discuss whether Ortho-K is appropriate for you or your child.",
      },
    ],
    ctaTitle: "Explore a proactive approach to myopia.",
    ctaCopy:
      "Book an Ortho-K fitting to review candidacy, goals, and expected follow-up.",
  },
  "dr-nim": {
    eyebrow: "Meet your optometrist",
    title:
      "Dr. Lay Nim specializes in advanced contact lens fittings, taking the time to listen, educate, and ensure your perfect fit.",
    lede: "Georgia State University and Southern College of Optometry, with a focus on keratoconus, scleral lenses, and orthokeratology.",
    image: "/dr-nim.webp",
    imageAlt: "Dr. Lay Nim of Precision Vision Institute",
    factLabel: "Special focus",
    factValue: "Specialty lenses",
    credentials: [
      {
        intro: "Dr. Nim is a member of:",
        name: "AAOMC",
        description: "American Academy of Orthokeratology & Myopia Control",
      },
    ],
    highlights: [
      {
        title: "Education",
        copy: "Georgia State University and Southern College of Optometry in Memphis.",
      },
      {
        title: "Service",
        copy: "International volunteer eye-care experience in Haiti, Nicaragua, and Costa Rica.",
      },
      {
        title: "Perspective",
        copy: "A belief that careful fitting can meaningfully change daily life.",
      },
    ],
    sections: [
      {
        label: "Her path",
        title: "A passion discovered through patient results.",
        copy:
          "During clinical rotations, Dr. Nim worked with experienced specialty lens fitters and saw how the right scleral lens could restore sharp, usable vision for people who had exhausted standard options.",
      },
      {
        label: "Her approach",
        title: "Measure carefully. Explain clearly. Refine patiently.",
        copy:
          "Every fit starts with understanding how a person uses their vision. Technology supplies precise measurements; conversation and follow-up turn those measurements into care that works in real life.",
        bullets: [
          "Keratoconus and irregular corneas",
          "Scleral lens fitting",
          "Orthokeratology and myopia management",
          "Comprehensive eye care",
        ],
      },
      {
        label: "Beyond the clinic",
        title: "Rock climbing, curiosity, and new adventures.",
        copy:
          "Outside the office, Dr. Nim enjoys rock climbing, crocheting, cooking, hiking, and traveling. One of her favorite adventures was fulfilling a longtime dream of climbing in the Italian Dolomites. She believes that exploring new places, embracing new challenges, and continually learning help her bring curiosity and creativity into both her personal life and her patient care.",
      },
    ],
    ctaTitle: "Meet Dr. Nim in Duluth.",
    ctaCopy:
      "Choose an appointment type and see the clinic’s live availability.",
  },
  "doctor-referral": {
    eyebrow: "For referring doctors",
    title: "Collaborative care, with a clear handoff.",
    lede:
      "Precision Vision Institute welcomes referrals for specialty contact lenses, complex corneas, myopia management, and comprehensive optometric care.",
    image: "/exam-room.jpg",
    imageAlt: "Clinical examination room at Precision Vision Institute",
    factLabel: "Referral line",
    factValue: "(470) 440-4099",
    highlights: [
      {
        title: "Send the reason",
        copy: "Include the working diagnosis, visual goal, and the service you are requesting.",
      },
      {
        title: "Share key records",
        copy: "Corneal maps, surgical history, prescriptions, and relevant exam findings are helpful.",
      },
      {
        title: "We coordinate",
        copy: "The clinic contacts the patient and can update the referring practice after scheduling.",
      },
    ],
    sections: [
      {
        label: "Referral process",
        title: "Start with a call from your practice.",
        copy:
          "To protect patient information, please call the clinic before sending records. The team will provide the current secure referral instructions and confirm what documentation is needed.",
        bullets: [
          "Patient name and best contact number",
          "Referring doctor and practice details",
          "Reason for referral",
          "Relevant testing and treatment history",
        ],
      },
      {
        label: "Common referrals",
        title: "Specialty expertise for the difficult fit.",
        copy:
          "Referrals commonly include keratoconus, corneal ectasia, post-surgical irregularity, severe ocular surface disease, scleral lens evaluation, and Ortho-K candidacy.",
      },
      {
        label: "Keep information secure",
        title: "Do not send protected health details by ordinary email.",
        copy:
          "Call (470) 440-4099 for the clinic’s current secure transmission method. General questions may be sent to invoices@precisionvisioninstitute.com without patient-specific information.",
      },
    ],
    ctaTitle: "Ready to refer a patient?",
    ctaCopy:
      "Call the clinic and the team will guide your practice through the secure next step.",
    ctaLabel: "Call referral line",
    ctaHref: "tel:+14704404099",
  },
  testimonials: {
    eyebrow: "Patient experiences",
    title: "The difference is in how care feels.",
    lede:
      "Patients consistently describe careful explanations, unhurried visits, a welcoming team, and specialty lens care that helped them see more clearly.",
    image: "/office-lounge.webp",
    imageAlt: "Bright modern reception area at Precision Vision Institute",
    factLabel: "Shared theme",
    factValue: "Thorough care",
    highlights: [
      {
        title: "Complex vision understood",
        copy: "Patients with keratoconus describe finally feeling heard and receiving a thoughtful lens plan.",
      },
      {
        title: "Clear explanations",
        copy: "First-time and experienced patients alike value knowing what the doctor sees and why it matters.",
      },
      {
        title: "A comfortable visit",
        copy: "The bright office, friendly staff, and patient pace help make eye care feel approachable.",
      },
    ],
    sections: [
      {
        label: "Specialty lens care",
        title: "Confidence after difficult contact lens experiences.",
        copy:
          "Patients frequently mention Dr. Nim’s knowledge of hard and scleral lenses, her persistence with fit and vision, and the comfort of having complex concerns taken seriously.",
      },
      {
        label: "Communication",
        title: "A visit that leaves fewer unanswered questions.",
        copy:
          "Reviews emphasize detailed exams and explanations in plain language. Many patients note that the team listened closely and gave them time to understand their options.",
      },
      {
        label: "The whole experience",
        title: "Professional care in a warm environment.",
        copy:
          "From scheduling through follow-up, patients highlight an organized office, a welcoming staff, and a doctor who is both precise and personable.",
      },
    ],
    ctaTitle: "Create your own clearer next chapter.",
    ctaCopy:
      "See live appointment availability and choose the visit that fits your needs.",
  },
  patients: {
    eyebrow: "Patient resources",
    title: "Arrive prepared. Leave with a plan.",
    lede:
      "A few details before your visit help the team spend more time on what matters: understanding your eyes, your vision, and your goals.",
    image: "/office-lounge.webp",
    imageAlt: "Reception area at Precision Vision Institute",
    factLabel: "Questions?",
    factValue: "(470) 440-4099",
    highlights: [
      {
        title: "Bring identification",
        copy: "Have a photo ID and your current vision and medical insurance cards available.",
      },
      {
        title: "Bring your eyewear",
        copy: "Include current glasses, contact lenses, cases, and solutions you regularly use.",
      },
      {
        title: "Bring your history",
        copy: "A medication list, prior eye records, and surgical information can provide important context.",
      },
    ],
    sections: [
      {
        label: "Before the appointment",
        title: "Know what kind of visit you selected.",
        copy:
          "Specialty lens evaluations may take longer than routine exams and can include dilation, mapping, or diagnostic lenses. Call if you are unsure about contact lens wear before the appointment.",
        bullets: [
          "Confirm date, time, and appointment type",
          "Complete any requested intake information",
          "Verify insurance benefits before arrival",
          "Plan transportation if dilation is expected",
        ],
      },
      {
        label: "At the clinic",
        title: "Tell us what better vision would change.",
        copy:
          "Share the tasks that are difficult, when symptoms happen, and what you have already tried. Those everyday details help shape the exam and recommendations.",
      },
      {
        label: "After the visit",
        title: "Follow-up is part of specialty care.",
        copy:
          "Lens training, fit checks, and refinements are expected parts of many specialty lens plans. Keep your scheduled follow-ups and call if you experience unexpected pain, redness, discharge, or vision loss.",
      },
    ],
    ctaTitle: "Plan your visit online.",
    ctaCopy:
      "Use EyeCloud to view appointment types and current availability.",
  },
  insurances: {
    eyebrow: "Insurance and payment",
    title: "Know your benefits before your visit.",
    lede:
      "Vision plans, medical insurance, and specialty lens benefits are different. Coverage depends on your plan, diagnosis, and the services performed.",
    image: "/office-lounge.webp",
    imageAlt: "Precision Vision Institute patient reception area",
    factLabel: "Benefits support",
    factValue: "(470) 440-4099",
    highlights: [
      {
        title: "Vision plans",
        copy: "Routine exam, glasses, and contact lens allowances vary by plan and benefit period.",
      },
      {
        title: "Medical insurance",
        copy: "A medical diagnosis may change how an evaluation or treatment is billed.",
      },
      {
        title: "Self-pay",
        copy: "The clinic can explain expected fees when benefits do not apply.",
      },
    ],
    sections: [
      {
        label: "Plans patients ask about",
        title: "Verify participation and benefits directly.",
        copy:
          "Patients commonly ask the clinic about VSP, EyeMed, Medicare, Blue Cross plans, and self-pay options. Network status and coverage can change, so please call before your appointment rather than relying on a plan directory alone.",
      },
      {
        label: "What to ask",
        title: "Three questions can prevent surprises.",
        copy:
          "Ask whether the doctor and location are in network, whether your visit is considered routine or medical, and whether specialty contact lens materials and fitting fees have separate benefits.",
        bullets: [
          "Is an authorization or referral required?",
          "What is my exam copay or deductible?",
          "Are specialty lens fitting and materials covered?",
          "When does my benefit renew?",
        ],
      },
      {
        label: "Bring both cards",
        title: "Vision and medical benefits may work differently.",
        copy:
          "Bring current cards and the subscriber’s information. Final benefit decisions are made by the insurer, and a benefit estimate is not a guarantee of payment.",
      },
    ],
    ctaTitle: "Confirm coverage before booking.",
    ctaCopy:
      "Call the clinic with your plan details and preferred appointment type.",
    ctaLabel: "Call about benefits",
    ctaHref: "tel:+14704404099",
  },
  "comprehensive-exams": {
    eyebrow: "Comprehensive eye care",
    title: "More than a glasses check.",
    lede:
      "A comprehensive eye exam evaluates how you see and how your eyes are functioning, even when your vision seems unchanged.",
    image: "/exam-room.jpg",
    imageAlt: "Comprehensive examination room at Precision Vision Institute",
    factLabel: "Recommended",
    factValue: "Regular eye care",
    highlights: [
      {
        title: "Clear vision",
        copy: "Refraction checks for nearsightedness, farsightedness, astigmatism, and focusing changes.",
      },
      {
        title: "Eye health",
        copy: "The exam screens the structures of the eye for signs that may need monitoring or treatment.",
      },
      {
        title: "Whole-person context",
        copy: "Medications and health conditions can affect the eyes and the way vision changes.",
      },
    ],
    sections: [
      {
        label: "What is included",
        title: "A complete view of vision and eye health.",
        copy:
          "Your exam may include visual acuity, refraction, eye coordination, pressure measurement, microscopic evaluation, retinal examination, and additional testing when indicated.",
      },
      {
        label: "Reasons to schedule",
        title: "Routine care and new concerns belong here.",
        copy:
          "Comprehensive visits can address glasses or contact lens prescriptions, computer eyestrain, reading difficulty, cataract concerns, glaucoma screening, dry or itchy eyes, and consultation for refractive surgery.",
        bullets: [
          "Routine eye examination",
          "Glasses or standard contact lens prescription",
          "Sudden or persistent visual symptoms",
          "Monitoring related to general health",
        ],
      },
      {
        label: "Urgent symptoms",
        title: "Some changes should not wait.",
        copy:
          "Sudden vision loss, a curtain or shadow, new flashes or many floaters, significant injury, chemical exposure, or severe eye pain may require urgent care. Call immediately or seek emergency care.",
      },
    ],
    ctaTitle: "Make eye care part of your routine.",
    ctaCopy:
      "Choose a comprehensive exam from the clinic’s live scheduler.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) return {};

  const isDoctorPage = slug === "dr-nim";
  const title = isDoctorPage
    ? "Dr. Lay Nim, OD | Precision Vision Institute"
    : `${page.title} | Precision Vision Institute`;
  const description = isDoctorPage
    ? "Meet Dr. Lay Nim, a Duluth optometrist focused on specialty contact lenses, keratoconus, orthokeratology, and personalized eye care."
    : page.lede;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: page.image, alt: page.imageAlt }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.image],
    },
  };
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];

  if (!page) notFound();
  if (slug === "testimonials") return <TestimonialsPage />;
  const isDoctorPage = slug === "dr-nim";

  return (
    <main
      className={`detail-page${isDoctorPage ? " doctor-detail-page" : ""}`}
    >
      <SiteHeader />

      <section className="detail-hero">
        <div className="detail-hero-copy">
          <Link className="detail-back" href="/#specialties">
            ← Back to specialties
          </Link>
          <p className="section-label">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p className="detail-lede">{page.lede}</p>
          <div className="detail-actions">
            <Link className="button button-primary" href="/#book">
              View live availability <ArrowIcon />
            </Link>
            <a href="tel:+14704404099" className="detail-phone">
              Call (470) 440-4099
            </a>
          </div>
        </div>
        <div className="detail-hero-image">
          <Image
            src={page.image}
            alt={page.imageAlt}
            fill
            preload={slug === "dr-nim"}
            fetchPriority={slug === "dr-nim" ? "high" : "auto"}
            sizes="(max-width: 1050px) 90vw, 42vw"
          />
          <div className="detail-fact">
            <span>{page.factLabel}</span>
            <strong>{page.factValue}</strong>
          </div>
        </div>
      </section>

      <section
        className="detail-highlights"
        aria-label={isDoctorPage ? "Professional background" : "Key information"}
      >
        {page.highlights.map((highlight, index) => (
          <article key={highlight.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{highlight.title}</h2>
            <p>{highlight.copy}</p>
          </article>
        ))}
      </section>

      {page.credentials && page.credentials.length > 0 && (
        <section className="detail-credentials" aria-label="Professional memberships">
          {page.credentials.map((credential) => (
            <div className="credential-card" key={credential.name}>
              <p className="credential-intro">{credential.intro}</p>
              <p className="credential-name">{credential.name}</p>
              {credential.description && (
                <p className="credential-description">{credential.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="detail-content">
        {page.sections.map((section, index) => (
          <article
            className={`detail-section${
              isDoctorPage && section.label === "Beyond the clinic"
                ? " doctor-personal-section"
                : ""
            }`}
            key={section.title}
          >
            <div className="detail-section-label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{section.label}</p>
            </div>
            <div>
              <h2>{section.title}</h2>
              <p>{section.copy}</p>
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
        {/* TODO(client): Add a second, distinct in-exam-room photo of Dr. Nim when supplied. */}
        {/* TODO(client): Add verified years in practice, fitting volume, and expanded subspecialty motivation; see CONTENT-TODOS.md. */}
      </section>

      {page.faq && page.faq.length > 0 && (
        <section className="detail-faq" aria-label="Frequently asked questions">
          <p className="section-label">Frequently asked questions</p>
          <div className="detail-faq-list">
            {page.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="detail-cta">
        <p className="section-label">Your next step</p>
        <h2>{page.ctaTitle}</h2>
        <p>{page.ctaCopy}</p>
        {page.ctaConditions && page.ctaConditions.length > 0 && (
          <ul className="detail-cta-conditions">
            {page.ctaConditions.map((condition) => (
              <li key={condition}>{condition}</li>
            ))}
          </ul>
        )}
        <a
          className="button button-primary"
          href={page.ctaHref ?? "/#book"}
        >
          {page.ctaLabel ?? "View live availability"} <ArrowIcon />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "../ArrowIcon";
import { SiteFooter } from "../SiteFooter";
import { SiteHeader } from "../SiteHeader";
import { DryEyePage } from "../DryEyePage";
import { StaticPage, type StaticPageData } from "../StaticPage";
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
  credentials?: { intro: string; name: string; description?: string; href?: string }[];
  ctaTitle: string;
  ctaCopy: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaConditions?: string[];
};

const staticPages: Record<string, StaticPageData> = {
  faq: {
    eyebrow: "Patient resources",
    title: "Questions, answered clearly.",
    lede: "Every eye and every treatment plan is different. These answers cover the practical things patients ask before booking.",
    sections: [
      { title: "What should I bring?", copy: "Please bring a photo ID, current insurance cards, glasses, contact lenses and cases, medication list, and any helpful prior eye records." },
      { title: "How do I know which appointment to choose?", copy: "If you are unsure, choose the option that best matches your main goal or call the clinic at (470) 440-4099. The team can help you select the right starting point." },
      { title: "Do you offer specialty contact lenses?", copy: "Yes. Scleral lenses, post-laser vision care, and Ortho-K/CRT lens consultations each begin with a detailed evaluation and individualized measurements." },
      { title: "Can I book dry eye care online?", copy: "Yes. Use the live scheduler to request a comprehensive dry eye evaluation. Your evaluation determines the right care plan and whether advanced treatment is appropriate." },
    ],
  },
  "our-office": {
    eyebrow: "About Precision Vision Institute",
    title: "A calmer kind of specialty eye care.",
    lede: "Precision Vision Institute brings detailed measurements, attentive conversation, and personalized follow-up together in Duluth, Georgia.",
    image: "/office-lounge.webp",
    imageAlt: "Precision Vision Institute office lounge",
    ctaLabel: "Plan your visit",
    sections: [
      { title: "Visit us", copy: "3940 Buford Hwy Ste A104, Duluth, GA 30096. Call (470) 440-4099 if you need help finding the office or preparing for your appointment." },
      { title: "Office hours", copy: "Mon / Tue / Wed / Fri: 9:30 AM–5:30 PM. Sat: 9:30 AM–1:30 PM. Thurs / Sun: Closed." },
      { title: "Designed around the details", copy: "Specialty lens care and complex eye concerns often need more time and more precise measurements. Our office is built to make that process clear, comfortable, and collaborative." },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "We are here to help you find the right next step.",
    lede: "Call the clinic for appointment questions, benefits support, or help choosing a visit type. For general, non-patient-specific questions, email info@precisionvisioninstitute.com.",
    ctaLabel: "Call (470) 440-4099",
    ctaHref: "tel:+14704404099",
    sections: [
      { title: "Precision Vision Institute", copy: "3940 Buford Hwy Ste A104, Duluth, GA 30096\n(470) 440-4099\ninfo@precisionvisioninstitute.com" },
      { title: "Please protect your privacy", copy: "Do not send protected health information or urgent medical concerns through ordinary email. Call the clinic for secure instructions or seek urgent care for emergencies." },
    ],
  },
  "privacy-policy": {
    eyebrow: "Privacy policy",
    title: "Your privacy matters.",
    lede: "This website provides general practice information and links to appointment scheduling. Please do not use ordinary email to send private health information.",
    ctaLabel: "Contact the clinic",
    sections: [
      { title: "Scheduling and third-party services", copy: "Appointment scheduling may be provided through a separate service. Information you provide there is governed by that service’s own privacy practices and the clinic’s applicable policies." },
      { title: "Questions about privacy", copy: "For help with a privacy question, contact Precision Vision Institute at (470) 440-4099. Do not include private health information in ordinary email." },
    ],
  },
  "hipaa-notice": {
    eyebrow: "HIPAA notice",
    title: "Request the official Notice of Privacy Practices.",
    lede: "The clinic’s official Notice of Privacy Practices explains how protected health information may be used or disclosed and how to obtain a copy.",
    ctaLabel: "Call the clinic",
    ctaHref: "tel:+14704404099",
    sections: [
      { title: "Obtain the official notice", copy: "Please call (470) 440-4099 or ask the team during your visit for the current official Notice of Privacy Practices." },
      { title: "Important", copy: "This webpage is a request pathway and does not replace the practice’s official Notice of Privacy Practices." },
    ],
  },
  "terms-of-service": {
    eyebrow: "Terms of service",
    title: "Using this website.",
    lede: "Information on this website is for general educational and scheduling purposes. It is not medical advice or a substitute for a comprehensive eye examination.",
    ctaLabel: "Book an evaluation",
    sections: [
      { title: "For care, start with an evaluation", copy: "Eye conditions, treatment suitability, and outcomes are individual. Please book an appointment for advice specific to your eyes." },
      { title: "Urgent symptoms", copy: "Sudden vision loss, severe eye pain, eye injury, chemical exposure, or new flashes and many floaters can require urgent care. Call immediately or seek emergency care." },
    ],
  },
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
    faq: [
      {
        question: "What actually causes dry eye?",
        answer:
          "Dry eye can come from too few tears, poor tear quality, or tears that evaporate too quickly due to blocked oil glands along the eyelids. Screen use, contact lens wear, certain medications, and environment can all play a role, which is why an evaluation looks for your specific pattern rather than assuming one cause.",
      },
      {
        question: "How is dry eye actually diagnosed?",
        answer:
          "A dry eye evaluation goes beyond asking about symptoms. Microscopic examination of the tear film, eyelids, and ocular surface helps identify whether the issue is tear production, tear quality, gland function, or a combination — which then guides the treatment plan.",
      },
      {
        question: "Will over-the-counter drops fix it?",
        answer:
          "Sometimes, but not always. Artificial tears can help mild, occasional dryness, but more persistent or severe dry eye often needs a plan matched to its underlying cause — eyelid care, prescription treatment, or specialty lens options — rather than drops alone.",
      },
      {
        question: "Is dry eye treatment covered by insurance?",
        answer:
          "Coverage depends on your diagnosis and insurance plan. Some treatments are considered medical and may be covered, while others are not. Our team will review your benefits and walk you through any costs before starting treatment.",
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
    faq: [
      {
        question: "Why do I still see glare or halos after LASIK?",
        answer:
          "Corneal surgery reshapes the eye, but it can leave a surface that is difficult to correct with an ordinary prescription. Even small irregularities in that surface can scatter light and cause glare, halos, or fluctuating clarity — especially at night.",
      },
      {
        question: "Can new glasses fix these symptoms?",
        answer:
          "Sometimes glasses help, but they cannot correct an irregular corneal surface the way a specialty contact lens can. Corneal mapping shows exactly where the shape varies, which helps determine whether glasses, a specialty lens, or another approach is the better fit.",
      },
      {
        question: "Are scleral lenses safe to wear after corneal surgery?",
        answer:
          "Yes. Scleral lenses vault over the cornea entirely and rest on the white of the eye, so they do not put pressure on the surgical site. They are commonly used for post-surgical eyes that need a smoother, more stable optical surface.",
      },
      {
        question: "How long after surgery should I wait for an evaluation?",
        answer:
          "It depends on your procedure and healing timeline. If your vision has stabilized but you're still experiencing glare, halos, or fluctuating clarity, it's reasonable to schedule an evaluation — Dr. Nim will review your surgical history and current symptoms to determine next steps.",
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
    faq: [
      {
        question: "Is Ortho-K safe?",
        answer:
          "Yes, when properly fitted and cared for. Ortho-K uses FDA-approved gas-permeable lenses worn overnight, with follow-up visits to check corneal health, lens fit, and response along the way. Good lens hygiene and attending scheduled check-ups are essential to keeping it safe.",
      },
      {
        question: "At what age can my child start Ortho-K?",
        answer:
          "There isn't a strict minimum age — candidacy depends on eye health, prescription, and whether your child can reliably handle lens insertion, removal, and care with adult supervision. Many families start Ortho-K in the school-age years as part of a myopia management plan.",
      },
      {
        question: "What happens if I stop wearing the lenses?",
        answer:
          "The effect is temporary. If you stop wearing the lenses consistently, the cornea gradually returns toward its original shape and your uncorrected vision returns to how it was before treatment.",
      },
      {
        question: "Does insurance cover Ortho-K?",
        answer:
          "Coverage varies by plan, and Ortho-K is sometimes considered elective. Our team will review your specific benefits and discuss the costs involved before you begin treatment.",
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
    lede: "Specializing in keratoconus, scleral lenses, and orthokeratology, with a practice built around patient, hands-on fitting.",
    image: "/dr-nim.webp",
    imageAlt: "Dr. Lay Nim of Precision Vision Institute",
    factLabel: "Special focus",
    factValue: "Specialty lenses",
    credentials: [
      {
        intro: "Dr. Nim is a member of:",
        name: "AAOMC",
        description: "American Academy of Orthokeratology & Myopia Control",
        href: "https://aaomc.org/",
      },
      {
        intro: "Dr. Nim volunteers at:",
        name: "RAM",
        description: "Remote Area Medical mission events",
        href: "https://www.ramusa.org/volunteer/",
      },
    ],
    highlights: [
      {
        title: "Education",
        copy: "Georgia State University and Southern College of Optometry in Memphis, Tennessee.",
      },
      {
        title: "Service",
        copy: "International mission trips providing eye care in Haiti, Nicaragua, and Costa Rica.",
      },
      {
        title: "Perspective",
        copy: "A belief that early intervention and careful fitting can meaningfully change daily life.",
      },
    ],
    sections: [
      {
        label: "Her path",
        title: "From Georgia State to specialty lenses.",
        copy:
          "Dr. Nim completed her undergraduate studies at Georgia State University before earning her Doctor of Optometry degree from Southern College of Optometry in Memphis, Tennessee. During optometry school, she took part in international mission trips to Haiti, Nicaragua, and Costa Rica, providing eye care to underserved communities — experiences that reinforced her passion for helping patients regain their vision and improve their quality of life. She continues that work closer to home as a volunteer at Remote Area Medical (RAM) clinics. It was during her clinical rotations, training alongside experienced specialty lens practitioners, that she discovered the profound difference scleral lenses can make for patients with complex corneal conditions.",
      },
      {
        label: "Her focus",
        title: "Specialty lenses, built around the eye in front of her.",
        copy:
          "Today, Dr. Nim has dedicated her practice to specialty contact lenses — including scleral lenses, custom soft lenses, and orthokeratology (Ortho-K). She enjoys caring for patients with keratoconus, corneal irregularities, severe dry eye, and other challenging conditions that often require a customized approach, combining advanced diagnostic technology with today's newest lens designs, including freeform lens technology, to give each patient the best possible vision, comfort, and long-term eye health.",
        bullets: [
          "Scleral lenses",
          "Custom soft lenses",
          "Orthokeratology (Ortho-K)",
          "Keratoconus & corneal irregularities",
          "Severe dry eye",
        ],
      },
      {
        label: "Myopia management",
        title: "Protecting vision early, for the long run.",
        copy:
          "Dr. Nim is also passionate about myopia management. She believes that slowing the progression of nearsightedness during childhood can have lifelong benefits, and she enjoys partnering with families to help protect their children's vision through treatments such as orthokeratology.",
      },
      {
        label: "Beyond the clinic",
        title: "Rock climbing, curiosity, and new adventures.",
        copy:
          "Outside the office, Dr. Nim enjoys rock climbing, crocheting, cooking, and traveling. One of her favorite adventures was fulfilling a longtime dream of climbing in the Italian Dolomites. She believes that exploring new places, embracing new challenges, and continually learning help her bring curiosity and creativity into both her personal life and her patient care.",
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
          "Call (470) 440-4099 for the clinic’s current secure transmission method. General questions may be sent to info@precisionvisioninstitute.com without patient-specific information.",
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
  return [...Object.keys(pages), ...Object.keys(staticPages), "envision-dry-eye"].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  const staticPage = staticPages[slug];

  if (slug === "envision-dry-eye") {
    return { title: "Envision Complete Dry Eye Package | Precision Vision Institute", description: "Explore the Envision Complete Dry Eye Package and book a comprehensive dry eye evaluation in Duluth, Georgia." };
  }
  if (!page && !staticPage) return {};

  const isDoctorPage = slug === "dr-nim";
  const title = isDoctorPage
    ? "Dr. Lay Nim, OD | Precision Vision Institute"
    : `${(page ?? staticPage).title} | Precision Vision Institute`;
  const description = isDoctorPage
    ? "Meet Dr. Lay Nim, a Duluth optometrist focused on specialty contact lenses, keratoconus, orthokeratology, and personalized eye care."
    : (page ?? staticPage).lede;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page ? [{ url: page.image, alt: page.imageAlt }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: page ? [page.image] : undefined,
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
  const staticPage = staticPages[slug];

  if (!page && !staticPage && slug !== "envision-dry-eye") notFound();
  if (slug === "dry-eye" || slug === "envision-dry-eye") return <DryEyePage packageFocus={slug === "envision-dry-eye"} />;
  if (staticPage) return <StaticPage page={staticPage} />;
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
              {credential.href ? (
                <a
                  className="credential-name credential-name-link"
                  href={credential.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {credential.name}
                </a>
              ) : (
                <p className="credential-name">{credential.name}</p>
              )}
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
              isDoctorPage &&
              (section.label === "Her focus" ||
                section.label === "Beyond the clinic")
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

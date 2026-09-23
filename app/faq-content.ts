// Single source of truth for FAQ copy. Service pages show their own group;
// /faq composes the groups so the same answer never exists in two versions.
// Clinical answers are deliberately hedged ("for many patients", "your
// evaluation determines…"): the site must not promise outcomes.

export type Faq = { question: string; answer: string };

export const generalFaqs: Faq[] = [
  {
    question: "What should I bring?",
    answer:
      "Please bring a photo ID, current insurance cards, glasses, contact lenses and cases, medication list, and any helpful prior eye records.",
  },
  {
    question: "How do I know which appointment to choose?",
    answer:
      "If you are unsure, choose the option that best matches your main goal or call the clinic at (470) 440-4099. The team can help you select the right starting point.",
  },
  {
    question: "Do you offer specialty contact lenses?",
    answer:
      "Yes. Scleral lenses, keratoconus care, post-surgical vision care, and Ortho-K/CRT lens consultations each begin with a detailed evaluation and individualized measurements.",
  },
  {
    question: "Can I book dry eye care online?",
    answer:
      "Yes. Use the live scheduler to request a comprehensive dry eye evaluation. Your evaluation determines the right care plan and whether advanced treatment is appropriate.",
  },
];

export const scleralFaqs: Faq[] = [
  {
    question: "Are scleral lenses comfortable?",
    answer:
      "For most patients, yes. Although scleral lenses are larger than traditional contacts, they rest on the sclera, which has fewer nerve endings than the cornea. Most patients adapt after a brief adjustment period, though comfort varies from person to person and the fit is refined at follow-up visits.",
  },
  {
    question: "Can scleral lenses help dry eyes?",
    answer:
      "Often, yes. The fluid reservoir beneath the lens keeps the cornea bathed in preservative-free saline, which can make scleral lenses a helpful option for many patients with moderate to severe dry eye disease. Your evaluation determines whether they fit your needs.",
  },
  {
    question: "Can scleral lenses help keratoconus?",
    answer:
      "For many patients, yes. Scleral lenses are considered one of the most effective non-surgical options for keratoconus because they create a smooth optical surface over the irregular cornea, often providing clearer vision than glasses or soft contact lenses.",
  },
  {
    question: "What if I already wear scleral lenses but still have ghosting or halos?",
    answer:
      "That can often be improved. Some patients continue to experience ghosting, halos, glare, or starbursts despite seeing 20/20 in scleral lenses. These symptoms may be caused by higher-order aberrations. We can measure these distortions with OVITZ wavefront technology and determine whether further lens or optical customization may improve your vision.",
  },
  {
    question: "Are scleral lenses covered by insurance?",
    answer:
      "Coverage varies depending on your medical diagnosis and insurance plan. Our team will review your benefits and discuss any available coverage before beginning treatment.",
  },
];

export const postSurgicalFaqs: Faq[] = [
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
      "For most post-surgical eyes, yes. Scleral lenses vault over the cornea and rest on the white of the eye, so they do not press on the surgical site, and they are commonly used after LASIK, RK, and corneal transplant. Dr. Nim will review your surgical history and eye health to confirm they are appropriate for you.",
  },
  {
    question: "How long after surgery should I wait for an evaluation?",
    answer:
      "It depends on your procedure and healing timeline. If your vision has stabilized but you're still experiencing glare, halos, or fluctuating clarity, it's reasonable to schedule an evaluation — Dr. Nim will review your surgical history and current symptoms to determine next steps.",
  },
];

export const orthoKFaqs: Faq[] = [
  {
    question: "Is Ortho-K safe?",
    answer:
      "Ortho-K has a good safety record when lenses are properly fitted, cleaned, and monitored. Like any overnight contact lens wear, it carries a small risk of eye infection, which is why lens hygiene and scheduled check-ups of corneal health, lens fit, and response are essential.",
  },
  {
    question: "Is Ortho-K FDA-approved for slowing myopia?",
    answer:
      "Ortho-K lenses are FDA-approved for temporarily correcting nearsightedness during the day. Using them to help slow the progression of myopia in children is widely practiced and supported by research, but in the U.S. it is considered off-label use. Dr. Nim will explain the evidence, the alternatives, and what to expect for your child.",
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
];

export const dryEyeFaqs: Faq[] = [
  {
    question: "Why might one dry eye treatment work better than another?",
    answer:
      "Dry eye can involve tear production, gland function, inflammation, eyelid health, medications, screen use, prior surgery, and more. Your evaluation helps identify the contributors that matter most for you.",
  },
  {
    question: "Can dry eyes be related to LASIK or an autoimmune condition?",
    answer:
      "Yes. Dry-eye symptoms can occur after eye surgery such as LASIK and alongside certain autoimmune conditions. Tell the team about your surgical and health history so it can inform your evaluation.",
  },
  {
    question: "Can scleral lenses help dry eye?",
    answer:
      "For appropriate patients, a scleral lens can hold a fluid reservoir over the cornea and may support comfort. Your evaluation determines whether it fits your needs.",
  },
  {
    question: "Do I have to understand every cause before booking?",
    answer:
      "No. You only need to describe what your eyes feel like and when symptoms are most noticeable. The evaluation is designed to make the next step clearer.",
  },
];

export const envisionFaqs: Faq[] = [
  {
    question: "Does Envision treatment hurt?",
    answer:
      "Comfort and treatment settings are individualized. Your clinician will explain what to expect, review possible temporary effects, and confirm whether treatment is appropriate for you.",
  },
  {
    question: "How many sessions might I need?",
    answer:
      "Recommendations are based on your evaluation and response to care. A four-session protocol is commonly recommended for patients who are candidates for the Complete Dry Eye Package.",
  },
  {
    question: "Can Envision be combined with drops or specialty lenses?",
    answer:
      "Sometimes. Dry eye often has more than one contributor, so your plan may include home care, medical therapy, specialty lenses, or other options alongside in-office treatment.",
  },
  {
    question: "Is Envision covered by insurance?",
    answer:
      "Envision is currently considered an elective procedure and is not covered by insurance. HSA/FSA funds may be eligible; please confirm eligibility with your plan administrator.",
  },
];

/** Everything shown on /faq, in reading order, de-duplicated by question. */
export const allFaqs: Faq[] = [
  ...generalFaqs,
  // The dry-eye group already asks this; skip the scleral duplicate.
  ...scleralFaqs.filter((faq) => faq.question !== "Can scleral lenses help dry eyes?"),
  ...postSurgicalFaqs,
  ...orthoKFaqs,
  ...dryEyeFaqs,
];

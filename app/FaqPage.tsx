import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const faqs = [
  ["What should I bring?", "Please bring a photo ID, current insurance cards, glasses, contact lenses and cases, medication list, and any helpful prior eye records."],
  ["How do I know which appointment to choose?", "If you are unsure, choose the option that best matches your main goal or call the clinic at (470) 440-4099. The team can help you select the right starting point."],
  ["Do you offer specialty contact lenses?", "Yes. Scleral lenses, LASIK/PK/PRK care, and Ortho-K/CRT lens consultations each begin with a detailed evaluation and individualized measurements."],
  ["Can I book dry eye care online?", "Yes. Use the live scheduler to request a comprehensive dry eye evaluation. Your evaluation determines the right care plan and whether advanced treatment is appropriate."],
  ["Are scleral lenses comfortable?", "Yes. Although scleral lenses are larger than traditional contacts, they rest on the sclera, which has fewer nerve endings than the cornea. Most patients find them surprisingly comfortable after a brief adjustment period."],
  ["Can scleral lenses help dry eyes?", "Yes. The fluid reservoir beneath the lens continuously bathes the cornea in preservative-free saline, making scleral lenses an excellent option for many patients with moderate to severe dry eye disease."],
  ["Can scleral lenses help keratoconus?", "Absolutely. Scleral lenses create a smooth optical surface over the irregular cornea, often providing significantly clearer vision than glasses or soft contact lenses."],
  ["Are scleral lenses covered by insurance?", "Coverage varies depending on your medical diagnosis and insurance plan. Our team will review your benefits and discuss any available coverage before beginning treatment."],
  ["Why do I still see glare or halos after LASIK?", "Corneal surgery can leave a surface that is difficult to correct with an ordinary prescription. Even small irregularities can scatter light and cause glare, halos, or fluctuating clarity—especially at night."],
  ["Can new glasses fix these symptoms?", "Sometimes glasses help, but they cannot correct an irregular corneal surface the way a specialty contact lens can. Corneal mapping helps determine whether glasses, a specialty lens, or another approach is the better fit."],
  ["Are scleral lenses safe to wear after corneal surgery?", "Yes. Scleral lenses vault over the cornea and rest on the white of the eye, so they do not put pressure on the surgical site. They are commonly used for post-surgical eyes that need a smoother optical surface."],
  ["How long after surgery should I wait for an evaluation?", "It depends on your procedure and healing timeline. If your vision has stabilized but you still have glare, halos, or fluctuating clarity, Dr. Nim can review your surgical history and symptoms to determine next steps."],
  ["Is Ortho-K safe?", "Yes, when properly fitted and cared for. Ortho-K uses FDA-approved gas-permeable lenses worn overnight, with follow-up visits to check corneal health, lens fit, and response."],
  ["At what age can my child start Ortho-K?", "There is no strict minimum age. Candidacy depends on eye health, prescription, and whether your child can reliably handle lens care with adult supervision."],
  ["What happens if I stop wearing Ortho-K lenses?", "The effect is temporary. If you stop wearing the lenses consistently, the cornea gradually returns toward its original shape and uncorrected vision returns to how it was before treatment."],
  ["Does insurance cover Ortho-K?", "Coverage varies by plan, and Ortho-K is sometimes considered elective. Our team will review your specific benefits and discuss costs before you begin."],
  ["Why might one dry eye treatment work better than another?", "Dry eye can involve tear production, gland function, inflammation, eyelid health, medications, screen use, prior surgery, and more. Your evaluation identifies the contributors that matter most for you."],
  ["Can dry eyes be related to LASIK or an autoimmune condition?", "Yes. Dry-eye symptoms can occur after eye surgery such as LASIK and alongside certain autoimmune conditions. Tell the team about your surgical and health history so it can inform your evaluation."],
  ["Do I have to understand every cause before booking?", "No. You only need to describe what your eyes feel like and when symptoms are most noticeable. The evaluation is designed to make the next step clearer."],
] as const;

export function FaqPage() {
  return (
    <main className="faq-page">
      <SiteHeader />
      <section className="static-hero faq-hero">
        <div>
          <p className="section-label">Patient resources</p>
          <h1>Questions, answered clearly.</h1>
          <p>Every eye and every treatment plan is different. These answers cover the practical things patients ask before booking.</p>
          <Link className="button button-primary" href="/book">Book an appointment <ArrowIcon /></Link>
        </div>
      </section>
      <section className="detail-faq faq-accordion" aria-labelledby="faq-heading">
        <p className="section-label">Frequently asked questions</p>
        <h2 id="faq-heading">Helpful answers before your visit.</h2>
        <div className="detail-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

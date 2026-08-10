import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type DryEyeReviewPageProps = {
  envision?: boolean;
};

function ReviewHero({ envision }: { envision: boolean }) {
  return (
    <section className="dry-eye-hero">
      <div className="dry-eye-hero-copy">
        <Link className="detail-back" href="/#specialties">
          <ArrowIcon direction="left" placement="before" /> Back to specialty care
        </Link>
        <p className="section-label">{envision ? "Envision by InMode" : "Dry eye treatment"}</p>
        <h1>{envision ? "A more complete approach to dry eye treatment." : "Dry eye is a clue, not a conclusion."}</h1>
        <p>
          {envision
            ? "For patients whose evaluation points to gland dysfunction and eyelid inflammation, Envision combines two advanced, non-surgical technologies in one personalized treatment plan."
            : "Burning, grittiness, redness, watering, blurry vision, and contact lens discomfort can have more than one cause. A focused evaluation helps identify what is disrupting your tear film."}
        </p>
        <Link className="button button-primary" href="/#book">
          {envision ? "Book an Envision dry eye evaluation" : "View live availability"} <ArrowIcon />
        </Link>
      </div>
      <div className="dry-eye-hero-image">
        <Image src="/exam-room.jpg" alt="Precision Vision Institute examination room" fill priority sizes="(max-width: 900px) 90vw, 40vw" />
        <p>Personalized care begins with a comprehensive evaluation.</p>
      </div>
    </section>
  );
}

function GeneralDryEyeReview() {
  return (
    <>
      <section className="gland-comparison" aria-labelledby="gland-comparison-heading">
        <div className="gland-comparison-copy">
          <p className="section-label">The tear-film difference</p>
          <h2 id="gland-comparison-heading">Healthy oil flow helps tears stay where they belong.</h2>
          <p>Meibomian glands line the eyelids and release the oil layer of your tears. When that oil flows well, tears evaporate more slowly. When glands become blocked, tears can break apart too quickly—leaving eyes dry, irritated, and inconsistent.</p>
        </div>
        <div className="gland-visuals" aria-label="Examples of healthy and blocked meibomian glands">
          <article className="gland-card healthy-glands"><span>Healthy glands</span><Image className="gland-photo" src="/healthy-glands.png" alt="Close-up example of healthy meibomian glands" width={1582} height={840} /><p>Clear, flowing oil supports a more stable tear film.</p></article>
          <article className="gland-card blocked-glands"><span>Blocked glands</span><Image className="gland-photo" src="/blocked-glands.png" alt="Close-up example of blocked meibomian glands" width={1566} height={1046} /><p>Thickened or obstructed oil can contribute to rapid evaporation.</p></article>
        </div>
      </section>

      <section className="meibography-section">
        <div className="meibography-image"><Image src="/meibomian-gland-structural-changes.png" alt="Examples of meibomian gland structural changes" width={1120} height={1472} sizes="(max-width: 1050px) 90vw, 42vw" /></div>
        <div><p className="section-label">Meibography</p><h2>See what symptoms cannot show on their own.</h2><p>Imaging gives Dr. Nim a closer view of the meibomian glands inside your eyelids. It helps connect what you feel with the condition of the glands, tear film, and ocular surface—so care is based on your eyes, not a one-size-fits-all routine.</p><p className="meibography-note">This clinical reference shows how gland structure can range from no significant change to gland drop out.</p></div>
      </section>

      <section className="dry-eye-treatments"><div><p className="section-label">Your treatment options</p><h2>One condition. More than one way to support it.</h2></div><div className="treatment-card-grid">
        <article><span>01</span><h3>Home care</h3><p>Targeted routines, lid hygiene, tear support, and environmental changes may help protect the ocular surface between visits.</p></article>
        <article><span>02</span><h3>Medical therapy</h3><p>Prescription treatments may be considered when your evaluation points to inflammation or another underlying contributor.</p></article>
        <article><span>03</span><h3>Specialty lenses</h3><p>For some eyes, a scleral lens can create a protective fluid reservoir and support comfort alongside a broader care plan.</p></article>
        <article><span>04</span><h3>In-office procedures</h3><p>When appropriate, thermal RF or IPL may be incorporated into a clinician-led plan for gland dysfunction or inflammatory signs.</p></article>
      </div></section>

      <section className="dry-eye-pathway"><p className="section-label">A four-step pathway</p><h2>Evaluate. Treat. Reassess. Adjust.</h2><div>{[["Evaluate", "Identify the pattern behind your symptoms."], ["Treat", "Build the right combination of options."], ["Reassess", "Track comfort, vision, and eye-health findings."], ["Adjust", "Refine the plan as your eyes respond."]].map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="detail-faq dry-eye-faq" aria-labelledby="dry-eye-faq-heading"><p className="section-label">Frequently asked questions</p><h2 id="dry-eye-faq-heading">Dry eye is personal. Your plan should be, too.</h2><div className="detail-faq-list">
        <details><summary>Why might one treatment work better than another?</summary><p>Dry eye can involve tear production, gland function, inflammation, eyelid health, medications, screen use, prior surgery, and more. Your evaluation helps identify the contributors that matter most for you.</p></details>
        <details><summary>Can dry eyes be related to LASIK or an autoimmune condition?</summary><p>Yes. Dry-eye symptoms can occur after eye surgery such as LASIK and alongside certain autoimmune conditions. Tell the team about your surgical and health history so it can inform your evaluation.</p></details>
        <details><summary>Can scleral lenses help dry eye?</summary><p>For appropriate patients, a scleral lens can hold a fluid reservoir over the cornea and may support comfort. Your evaluation determines whether it fits your needs.</p></details>
        <details><summary>Do I have to understand every cause before booking?</summary><p>No. You only need to describe what your eyes feel like and when symptoms are most noticeable. The evaluation is designed to make the next step clearer.</p></details>
      </div></section>

      <section className="detail-cta"><p className="section-label">Advanced treatment</p><h2>When advanced treatment may help.</h2><p>Some evaluations point to Envision by InMode as an appropriate next step for gland dysfunction and eyelid inflammation. It is one option within a complete, individualized dry-eye care plan.</p><Link className="button button-primary" href="/envision-dry-eye-review08-Aug">Explore Envision dry eye treatment <ArrowIcon /></Link></section>
    </>
  );
}

function EnvisionReview() {
  return (
    <>
      <section className="dry-eye-problem"><div><p className="section-label">Why drops are not always enough</p><h2>Temporary relief is not the same as treating the driver.</h2></div><p>Artificial tears and prescription drops can help you feel better temporarily, but they do not always improve the health of the glands that keep your tears stable. Symptoms may improve for a moment while gland dysfunction or eyelid inflammation still needs attention.</p></section>

      <section className="dry-eye-treatments"><div><p className="section-label">Who may be a candidate?</p><h2>Start with the reason your eyes are dry.</h2></div><div className="treatment-card-grid">
        <article><span>01</span><h3>Persistent symptoms</h3><p>Dryness, burning, redness, fluctuating vision, or contact lens discomfort that continues despite routine care.</p></article>
        <article><span>02</span><h3>Gland dysfunction</h3><p>Findings that suggest thickened oils or reduced meibomian gland function are affecting tear stability.</p></article>
        <article><span>03</span><h3>Eyelid inflammation</h3><p>Inflammatory signs around the eyelids, including rosacea-related changes, may be part of the dry-eye picture.</p></article>
        <article><span>04</span><h3>Evaluation-led care</h3><p>Your examination determines whether Envision, another treatment, or a combination is the appropriate next step.</p></article>
      </div></section>

      <section className="dry-eye-solution"><div className="dry-eye-solution-intro"><p className="section-label">The Envision approach</p><h2>Two technologies. One coordinated plan.</h2><p>Envision combines thermal radiofrequency and intense pulsed light in a treatment plan designed around your ocular-surface findings, symptoms, and candidacy.</p></div><div className="dry-eye-modality-grid">
        <article><span>01</span><h3>Forma-I thermal radiofrequency</h3><p>Gentle, controlled heat is applied around the eyelids to support meibomian gland function and the natural oil layer of the tear film. It may be recommended when thickened gland secretions are contributing to rapid tear evaporation.</p></article>
        <article><span>02</span><h3>Lumecca-I intense pulsed light</h3><p>Targeted light therapy may be used as part of a clinician-led plan for inflammatory signs around the eyelids. Treatment choice and settings are individualized after an eye-health evaluation.</p></article>
      </div></section>

      <section className="dry-eye-pathway"><p className="section-label">Your Envision plan</p><h2>Evaluate. Plan. Treat. Reassess.</h2><div>{[["Evaluate", "Measure gland health, tear-film stability, and ocular-surface findings."], ["Plan", "Confirm candidacy and select the appropriate treatment sequence."], ["Treat", "Complete the recommended Envision sessions with your clinician."], ["Reassess", "Review comfort, findings, and the next steps for lasting support."]].map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="dry-eye-package"><div className="dry-eye-package-copy"><p className="section-label">The flagship offer</p><h2>Complete Dry Eye Package</h2><p>Why choose between treatments when your evaluation points to a more comprehensive approach? The Complete Dry Eye Package combines Forma-I and Lumecca-I care in one coordinated protocol, helping us address more than one contributing factor without piecing together separate therapy visits.</p><p className="dry-eye-package-note">Your evaluation determines candidacy, treatment sequence, and whether a package is right for you.</p></div><div className="dry-eye-pricing" aria-label="Dry eye package pricing"><article><span>Single session</span><strong>$750</strong><p>For patients whose evaluation supports a single treatment visit.</p></article><article className="recommended-price"><span>Recommended 4-session protocol</span><strong>$2,700</strong><p>CareCredit financing is available. HSA/FSA eligibility may vary by plan.</p></article></div></section>

      <section className="dry-eye-expectations"><div><p className="section-label">What to expect</p><h2>Clear expectations make better care possible.</h2></div><div className="expectation-list"><article><h3>Return to your day</h3><p>Most patients return to normal activities right away after treatment.</p></article><article><h3>Comfort comes first</h3><p>Temporary warmth, redness, or swelling can occur. Your clinician will review possible effects before treatment.</p></article><article><h3>A plan, not a promise</h3><p>Response and timing vary. We will track your symptoms and ocular-surface findings throughout your plan.</p></article></div></section>

      <section className="detail-faq dry-eye-faq" aria-labelledby="envision-faq-heading"><p className="section-label">Envision questions</p><h2 id="envision-faq-heading">The right next step starts with an evaluation.</h2><div className="detail-faq-list">
        <details><summary>Does Envision treatment hurt?</summary><p>Comfort and treatment settings are individualized. Your clinician will explain what to expect, review possible temporary effects, and confirm whether treatment is appropriate for you.</p></details>
        <details><summary>How many sessions might I need?</summary><p>Recommendations are based on your evaluation and response to care. A four-session protocol is commonly recommended for patients who are candidates for the Complete Dry Eye Package.</p></details>
        <details><summary>Can Envision be combined with drops or specialty lenses?</summary><p>Sometimes. Dry eye often has more than one contributor, so your plan may include home care, medical therapy, specialty lenses, or other options alongside in-office treatment.</p></details>
        <details><summary>Is Envision covered by insurance?</summary><p>Coverage for advanced in-office procedures varies by plan and is often limited. CareCredit financing is available, and HSA/FSA eligibility depends on your individual plan.</p></details>
      </div></section>

      <section className="dry-eye-insurance"><p className="section-label">Insurance and financing</p><h2>“Does insurance cover this?”</h2><p>Insurance may cover parts of a dry-eye evaluation or symptom management, but coverage for advanced in-office procedures varies by plan and is often limited. Our team can help you understand the next step before you commit.</p><Link className="button button-light" href="/#book">Book an Envision dry eye evaluation <ArrowIcon /></Link><small>Treatment is not appropriate for everyone. Individual results vary; your clinician will discuss risks, benefits, alternatives, and suitability during your evaluation. Pricing is subject to change.</small></section>
    </>
  );
}

export function DryEyeReviewPage({ envision = false }: DryEyeReviewPageProps) {
  return <main className="dry-eye-page"><SiteHeader /><ReviewHero envision={envision} />{envision ? <EnvisionReview /> : <GeneralDryEyeReview />}<SiteFooter /></main>;
}

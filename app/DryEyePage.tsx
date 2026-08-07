import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type DryEyePageProps = {
  packageFocus?: boolean;
};

export function DryEyePage({ packageFocus = false }: DryEyePageProps) {
  const showPricing = packageFocus;
  const pageTitle = packageFocus
    ? "The Envision Complete Dry Eye Package."
    : "Stop managing symptoms. Start treating the root cause of dry eye.";

  return (
    <main className="dry-eye-page">
      <SiteHeader />

      <section className="dry-eye-hero">
        <div className="dry-eye-hero-copy">
          <Link className="detail-back" href="/#specialties">
            ← Explore specialty care
          </Link>
          <p className="section-label">{packageFocus ? "Envision by InMode" : "Dry eye treatment"}</p>
          <h1>{pageTitle}</h1>
          <p>
            {packageFocus
              ? "Advanced, non-surgical dry eye care designed to improve how your eyes function—so you can rely less on temporary fixes and work toward more consistent comfort."
              : "Burning, grittiness, redness, watering, blurry vision, and contact lens discomfort are all signs worth looking into. A focused evaluation helps identify why your tear film is not staying stable."}
          </p>
          <Link className="button button-primary" href="/#book">
            Book a comprehensive dry eye evaluation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="dry-eye-hero-image">
          <Image
            src="/exam-room.jpg"
            alt="Precision Vision Institute examination room"
            fill
            priority
            sizes="(max-width: 900px) 90vw, 40vw"
          />
          <p>Personalized care begins with a comprehensive evaluation.</p>
        </div>
      </section>

      {!packageFocus && (
        <>
          <section className="gland-comparison" aria-labelledby="gland-comparison-heading">
            <div className="gland-comparison-copy">
              <p className="section-label">The tear-film difference</p>
              <h2 id="gland-comparison-heading">Healthy oil flow helps tears stay where they belong.</h2>
              <p>
                Meibomian glands line the eyelids and release the oil layer of your tears. When that oil flows well, tears evaporate more slowly. When glands become blocked, tears can break apart too quickly—leaving eyes dry, irritated, and inconsistent.
              </p>
            </div>
            <div className="gland-visuals" aria-label="Illustration comparing healthy and blocked meibomian glands">
              <article className="gland-card healthy-glands">
                <span>Healthy glands</span>
                <Image className="gland-photo" src="/healthy-glands.png" alt="Close-up example of healthy meibomian glands" width={1582} height={840} />
                <p>Clear, flowing oil supports a more stable tear film.</p>
              </article>
              <article className="gland-card blocked-glands">
                <span>Blocked glands</span>
                <Image className="gland-photo" src="/blocked-glands.png" alt="Close-up example of blocked meibomian glands" width={1566} height={1046} />
                <p>Thickened or obstructed oil can contribute to rapid evaporation.</p>
              </article>
            </div>
          </section>

          <section className="meibography-section">
            <div className="meibography-image"><Image src="/meibomian-gland-structural-changes.png" alt="Examples of meibomian gland structural changes" width={1120} height={1472} sizes="(max-width: 1050px) 90vw, 42vw" /></div>
            <div>
              <p className="section-label">Meibography</p>
              <h2>See what symptoms cannot show on their own.</h2>
              <p>
                Imaging gives Dr. Nim a closer view of the meibomian glands inside your eyelids. It helps connect what you feel with the condition of the glands, tear film, and ocular surface—so care is based on your eyes, not a one-size-fits-all routine.
              </p>
              <p className="meibography-note">This clinical reference shows how gland structure can range from no significant change to gland drop out.</p>
            </div>
          </section>

          <section className="dry-eye-treatments">
            <div><p className="section-label">Your treatment options</p><h2>One condition. More than one way to support it.</h2></div>
            <div className="treatment-card-grid">
              <article><span>01</span><h3>Home care</h3><p>Targeted routines, lid hygiene, tear support, and environmental changes may help protect the ocular surface between visits.</p></article>
              <article><span>02</span><h3>Thermal RF</h3><p>When appropriate, controlled heat can support the natural oil layer of the tear film and meibomian gland function.</p></article>
              <article><span>03</span><h3>IPL</h3><p>Targeted light therapy may be incorporated into a clinician-led plan for inflammatory signs around the eyelids.</p></article>
              <article><span>04</span><h3>Medical therapy</h3><p>Prescription treatments may be considered when your evaluation points to inflammation or another underlying contributor.</p></article>
            </div>
          </section>

          <section className="dry-eye-pathway">
            <p className="section-label">A four-step pathway</p>
            <h2>Evaluate. Treat. Reassess. Adjust.</h2>
            <div>
              {["Evaluate", "Treat", "Reassess", "Adjust"].map((step, index) => <article key={step}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step}</h3><p>{["Identify the pattern behind your symptoms.", "Build the right combination of options.", "Track comfort, vision, and eye-health findings.", "Refine the plan as your eyes respond."][index]}</p></article>)}
            </div>
          </section>

          <section className="dry-eye-faq" aria-labelledby="dry-eye-faq-heading">
            <div><p className="section-label">Questions, answered clearly</p><h2 id="dry-eye-faq-heading">Dry eye is personal. Your plan should be, too.</h2></div>
            <div>
              <details><summary>Why might one treatment work better than another?</summary><p>Dry eye can involve tear production, gland function, inflammation, eyelid health, medications, screen use, prior surgery, and more. Your evaluation helps identify the contributors that matter most for you.</p></details>
              <details><summary>Can dry eyes be related to LASIK or an autoimmune condition?</summary><p>Yes. Dry-eye symptoms can occur after eye surgery such as LASIK and alongside certain autoimmune conditions. Tell the team about your surgical and health history so it can inform your evaluation.</p></details>
              <details><summary>Do I have to understand every cause before booking?</summary><p>No. You only need to describe what your eyes feel like and when symptoms are most noticeable. The evaluation is designed to make the next step clearer.</p></details>
            </div>
          </section>
        </>
      )}

      <section className="dry-eye-problem">
        <div>
          <p className="section-label">Why drops are not always enough</p>
          <h2>Temporary relief is not the same as treating the driver.</h2>
        </div>
        <p>
          Artificial tears and prescription drops can help you feel better
          temporarily, but they do not always improve the health of the glands
          that keep your tears stable. Using drops for dry eye can be like
          putting lotion on dry skin without addressing the underlying
          condition—or watering a plant with poor soil. Symptoms may improve
          for a moment while the environment causing the problem still needs
          attention.
        </p>
      </section>

      <section className="dry-eye-solution">
        <div className="dry-eye-solution-intro">
          <p className="section-label">The solution</p>
          <h2>Envision by InMode</h2>
          <p>
            Envision brings thermal radiofrequency and intense pulsed light
            modalities into one personalized care plan. After your evaluation,
            Dr. Nim can determine whether either modality is appropriate for
            your dry-eye pattern and ocular-surface health.
          </p>
        </div>
        <div className="dry-eye-modality-grid">
          <article>
            <span>01</span>
            <h3>Forma-I thermal radiofrequency</h3>
            <p>
              Gentle, controlled heat is applied around the eyelids to support
              meibomian gland function and the natural oil layer of the tear
              film. It may be recommended when thickened gland secretions are
              contributing to rapid tear evaporation.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Lumecca-I intense pulsed light</h3>
            <p>
              Targeted light therapy may be used as part of a clinician-led
              plan for inflammatory signs around the eyelids. Treatment choice
              and settings are individualized after an eye-health evaluation.
            </p>
          </article>
        </div>
      </section>

      <section className="dry-eye-package">
        <div className="dry-eye-package-copy">
          <p className="section-label">The flagship offer</p>
          <h2>Complete Dry Eye Package</h2>
          <p>
            Why choose between treatments when your evaluation points to a
            more comprehensive approach? The Complete Dry Eye Package combines
            Forma-I and Lumecca-I care in one coordinated protocol, helping us
            address more than one contributing factor without piecing together
            separate thermal and light therapy visits.
          </p>
          <p className="dry-eye-package-note">
            Your evaluation determines candidacy, treatment sequence, and
            whether a package is right for you.
          </p>
        </div>
        {showPricing && (
          <div className="dry-eye-pricing" aria-label="Dry eye package pricing">
            <article>
              <span>Single session</span>
              <strong>$750</strong>
              <p>For patients whose evaluation supports a single treatment visit.</p>
            </article>
            <article className="recommended-price">
              <span>Recommended 4-session protocol</span>
              <strong>$2,700</strong>
              <p>CareCredit financing is available. HSA/FSA eligibility may vary by plan.</p>
            </article>
          </div>
        )}
      </section>

      <section className="dry-eye-expectations">
        <div>
          <p className="section-label">What to expect</p>
          <h2>Clear expectations make better care possible.</h2>
        </div>
        <div className="expectation-list">
          <article>
            <h3>Return to your day</h3>
            <p>Most patients return to normal activities right away after treatment.</p>
          </article>
          <article>
            <h3>Comfort comes first</h3>
            <p>Temporary warmth, redness, or swelling can occur. Your clinician will review possible effects before treatment.</p>
          </article>
          <article>
            <h3>A plan, not a promise</h3>
            <p>Response and timing vary. We will track your symptoms and ocular-surface findings throughout your plan.</p>
          </article>
        </div>
      </section>

      <section className="dry-eye-insurance">
        <p className="section-label">Insurance and financing</p>
        <h2>“Does insurance cover this?”</h2>
        <p>
          Insurance may cover parts of a dry-eye evaluation or symptom
          management, but coverage for advanced in-office procedures varies by
          plan and is often limited. Many patients prefer to discuss a
          multi-session care plan rather than rely indefinitely on temporary
          symptom relief. We accept CareCredit; HSA/FSA eligibility depends on
          your individual plan. Our team can help you understand the next step
          before you commit.
        </p>
        <Link className="button button-light" href="/#book">
          Schedule your evaluation <span aria-hidden="true">↗</span>
        </Link>
        <small>
          Treatment is not appropriate for everyone. Individual results vary;
          your clinician will discuss risks, benefits, alternatives, and
          suitability during your evaluation.{showPricing ? " Pricing is subject to change." : ""}
        </small>
      </section>

      <SiteFooter />
    </main>
  );
}

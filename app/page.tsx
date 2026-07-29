const BOOKING_URL =
  "https://web.eyecloudpro.com/site/!appt_req?sid=30DE3BDF7982B488E75A54C45893656C";

const specialties = [
  {
    number: "01",
    title: "Keratoconus + irregular corneas",
    copy: "When glasses and standard contacts cannot create stable vision, a custom scleral lens can create a new, smooth optical surface.",
    link: "https://precisionvisioninstitute.com/sclerals",
    tone: "acid",
  },
  {
    number: "02",
    title: "Severe dry eye",
    copy: "A detailed ocular surface evaluation reveals what is driving burning, grittiness, redness, and contact lens intolerance.",
    link: BOOKING_URL,
    tone: "cream",
  },
  {
    number: "03",
    title: "Post-LASIK + post-RK vision",
    copy: "Custom lens designs can help address fluctuating vision, glare, halos, and distortion caused by an irregular corneal surface.",
    link: "https://precisionvisioninstitute.com/sclerals",
    tone: "charcoal",
  },
  {
    number: "04",
    title: "Progressive myopia",
    copy: "Ortho-K lenses gently reshape the cornea overnight, supporting clear daytime vision and proactive myopia management.",
    link: "https://precisionvisioninstitute.com/ortho-k-crt-lenses",
    tone: "sky",
  },
];

const process = [
  ["Map", "Advanced corneal topography captures the precise shape of your eye."],
  ["Design", "Your lens is selected and customized around your unique visual needs."],
  ["Train", "Hands-on coaching helps you feel confident with insertion, removal, and care."],
  ["Refine", "Follow-up visits optimize comfort, clarity, and long-term eye health."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Precision Vision Institute home">
          <span className="brand-mark">PVI</span>
          <span className="brand-name">
            Precision Vision
            <small>Institute</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#specialties">Specialties</a>
          <a href="#process">Our approach</a>
          <a href="#doctor">Dr. Nim</a>
          <a href="#visit">Visit</a>
        </nav>

        <a className="header-cta" href={BOOKING_URL}>
          Book appointment <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Open menu">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#specialties">Specialties</a>
            <a href="#process">Our approach</a>
            <a href="#doctor">Dr. Nim</a>
            <a href="#visit">Visit</a>
            <a href={BOOKING_URL}>Book appointment ↗</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-lens" aria-hidden="true">
          <div className="lens-ring lens-ring-one" />
          <div className="lens-ring lens-ring-two" />
          <div className="lens-core" />
        </div>

        <div className="hero-content">
          <p className="eyebrow">
            Specialty eye care <span>Duluth, Georgia</span>
          </p>
          <h1>
            See what
            <br />
            others <em>miss.</em>
          </h1>
          <p className="hero-copy">
            Advanced care for complex vision needs—especially when glasses or
            standard contact lenses are not enough.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={BOOKING_URL}>
              Start with a consultation <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link" href="#specialties">
              Find your path <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <span>Scleral lenses</span>
          <span>Dry eye care</span>
          <span>Ortho-K</span>
          <span>Complex corneas</span>
        </div>
      </section>

      <section className="statement">
        <p className="section-label">Not routine. Precisely yours.</p>
        <h2>
          You have been told your vision is
          <span className="muted"> complicated.</span>
          <br />
          We see a problem worth
          <span className="highlight"> solving.</span>
        </h2>
      </section>

      <section className="specialties" id="specialties">
        <div className="section-heading">
          <p className="section-label">Start with what you are experiencing</p>
          <h2>Find your path forward.</h2>
        </div>
        <div className="specialty-grid">
          {specialties.map((item) => (
            <a
              className={`specialty-card ${item.tone}`}
              href={item.link}
              key={item.number}
            >
              <span className="card-number">{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-intro">
          <p className="section-label">Precision at every step</p>
          <h2>A better fit begins with a better look.</h2>
          <p>
            Specialty care is not a one-size-fits-all appointment. We measure,
            design, teach, and refine until your vision and comfort work
            together.
          </p>
          <a className="button button-light" href={BOOKING_URL}>
            Schedule an evaluation <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ol className="process-list">
          {process.map(([title, copy], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="doctor-section" id="doctor">
        <div className="doctor-photo">
          <img src="/dr-nim.webp" alt="Dr. Lay Nim" />
          <span>Dr. Lay Nim</span>
        </div>
        <div className="doctor-story">
          <p className="section-label">Expertise that feels human</p>
          <h2>Care for the eye. Attention to the person.</h2>
          <p>
            Dr. Lay Nim discovered her passion for specialty contact lenses
            while seeing how dramatically the right lens could change a
            patient&apos;s daily life. Today, she combines advanced fitting
            technology with the patience to listen, explain, and get the details
            right.
          </p>
          <div className="doctor-links">
            <a href="https://precisionvisioninstitute.com/dr-nim">
              Meet Dr. Nim <span aria-hidden="true">↗</span>
            </a>
            <a href="https://precisionvisioninstitute.com/doctor-referral">
              Refer a patient <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="review-section">
        <div className="review-mark" aria-hidden="true">
          “
        </div>
        <blockquote>
          <p>
            Quite literally the most thorough and informative exam I&apos;ve
            ever received. As a Keratoconus patient this was a breath of fresh
            air.
          </p>
          <footer>
            <span>Brian L.</span>
            <span className="stars" aria-label="5 out of 5 stars">
              ★ ★ ★ ★ ★
            </span>
          </footer>
        </blockquote>
        <a href="https://precisionvisioninstitute.com/testimonials">
          More patient stories <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-image">
          <img
            src="/office-lounge.jpg"
            alt="Modern waiting area at Precision Vision Institute"
          />
          <div className="visit-badge">
            <span>33.984° N</span>
            <span>84.156° W</span>
          </div>
        </div>
        <div className="visit-details">
          <p className="section-label">Visit Precision Vision Institute</p>
          <h2>Duluth, GA</h2>
          <address>
            3940 Buford Hwy
            <br />
            Suite A104
            <br />
            Duluth, GA 30096
          </address>
          <div className="hours">
            <div>
              <span>Tue / Wed / Fri</span>
              <strong>9:30 AM—5:30 PM</strong>
            </div>
            <div>
              <span>Saturday</span>
              <strong>9:30 AM—1:30 PM</strong>
            </div>
          </div>
          <div className="visit-actions">
            <a
              className="button button-dark"
              href="https://maps.google.com/?q=Precision+Vision+Institute+3940+Buford+Hwy+Duluth+GA+30096"
            >
              Get directions <span aria-hidden="true">↗</span>
            </a>
            <a className="phone-link" href="tel:+14704404099">
              (470) 440-4099
            </a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <p className="section-label">Your next chapter can look clearer</p>
        <h2>Ready to see what&apos;s possible?</h2>
        <a className="button button-primary" href={BOOKING_URL}>
          Book your consultation <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark">PVI</span>
          <p>
            Precision Vision Institute
            <small>Specialty eye care in Duluth, Georgia.</small>
          </p>
        </div>
        <div className="footer-links">
          <a href="https://precisionvisioninstitute.com/patients">Patients</a>
          <a href="https://precisionvisioninstitute.com/doctor-referral">
            Referring doctors
          </a>
          <a href="https://precisionvisioninstitute.com/insurances">
            Insurance
          </a>
          <a href={BOOKING_URL}>Book online</a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Precision Vision Institute
        </p>
      </footer>

      <nav className="mobile-bar" aria-label="Quick actions">
        <a href="tel:+14704404099">Call</a>
        <a href={BOOKING_URL}>Book online ↗</a>
      </nav>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { BookingWidget } from "./BookingWidget";
import { PatientStories } from "./PatientStories";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const specialties = [
  {
    id: "scleral-lenses",
    number: "01",
    title: "Keratoconus + irregular corneas",
    copy: "When glasses and standard contacts cannot create stable vision, a custom scleral lens can create a new, smooth optical surface.",
    link: "/sclerals",
    tone: "acid",
  },
  {
    id: "dry-eye-care",
    number: "02",
    title: "Severe dry eye",
    copy: "A detailed ocular surface evaluation reveals what is driving burning, grittiness, redness, and contact lens intolerance.",
    link: "/dry-eye",
    tone: "cream",
  },
  {
    id: "post-surgical-vision",
    number: "03",
    title: "Post-LASIK + post-RK vision",
    copy: "Custom lens designs can help address fluctuating vision, glare, halos, and distortion caused by an irregular corneal surface.",
    link: "/post-laser-vision",
    tone: "charcoal",
  },
  {
    id: "myopia-management",
    number: "04",
    title: "Progressive myopia",
    copy: "Ortho-K lenses gently reshape the cornea overnight, supporting clear daytime vision and proactive myopia management.",
    link: "/ortho-k-crt-lenses",
    tone: "sky",
  },
];

const process = [
  ["Map", "Advanced corneal topography captures the precise shape of your eye."],
  ["Design", "Your lens is selected and customized around your unique visual needs."],
  ["Train", "Hands-on coaching helps you feel confident with insertion, removal, and care."],
  ["Refine", "Follow-up visits optimize comfort, clarity, and long-term eye health."],
];

function ProcessIcon({ step }: { step: number }) {
  const paths = [
    <>
      <circle cx="24" cy="24" r="9" />
      <path d="M6 24c4.8-7.2 10.8-10.8 18-10.8S37.2 16.8 42 24c-4.8 7.2-10.8 10.8-18 10.8S10.8 31.2 6 24Z" />
    </>,
    <>
      <path d="M10 35 29 16l7 7-19 19H10v-7Z" />
      <path d="m25 20 7 7M10 38H6" />
    </>,
    <>
      <path d="M14 22v-5a3 3 0 0 1 6 0v4-8a3 3 0 0 1 6 0v8-6a3 3 0 0 1 6 0v7-3a3 3 0 0 1 6 0v8c0 9-5 15-14 15-7 0-11-4-14-10l-3-6a3 3 0 0 1 5-3l2 3v-4Z" />
    </>,
    <>
      <path d="M12 18a14 14 0 0 1 24-3l3 4" />
      <path d="m39 12 .5 7-7-.5M36 30a14 14 0 0 1-24 3l-3-4" />
      <path d="m9 36-.5-7 7 .5" />
    </>,
  ];

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {paths[step]}
    </svg>
  );
}

const clinicStructuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Precision Vision Institute",
  description:
    "Specialty eye care for keratoconus, severe dry eye, complex corneas, post-surgical vision, and progressive myopia.",
  telephone: "+1-470-440-4099",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3940 Buford Hwy, Suite A104",
    addressLocality: "Duluth",
    addressRegion: "GA",
    postalCode: "30096",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.984,
    longitude: -84.156,
  },
  medicalSpecialty: [
    "Specialty contact lenses",
    "Keratoconus care",
    "Dry eye care",
    "Orthokeratology",
    "Myopia management",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
      opens: "09:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:30",
      closes: "13:30",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(clinicStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="hero-portrait">
          {/* TODO(client): Supply a clinical hero portrait of Dr. Nim with diagnostic equipment. */}
          <Image
            src="/dr-nim.webp"
            alt="Dr. Lay Nim"
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 760px) calc(100vw - 40px), 43vw"
          />
          <div className="portrait-note">
            <span>Meet your specialist</span>
            <strong>Dr. Lay Nim</strong>
          </div>
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
            <a className="button button-primary" href="#book">
              Start with a consultation <span aria-hidden="true">↗</span>
            </a>
            <a className="text-link find-path-link" href="#specialties">
              Find your path <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero-meta">
          <a href="#scleral-lenses">Scleral lenses</a>
          <a href="#dry-eye-care">Dry eye care</a>
          <a href="#myopia-management">Ortho-K</a>
          <a href="#post-surgical-vision">Complex corneas</a>
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
            <Link
              className={`specialty-card ${item.tone}`}
              href={item.link}
              id={item.id}
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
            </Link>
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
          <a className="button button-light" href="#book">
            Schedule an evaluation <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ol className="process-list">
          {process.map(([title, copy], index) => (
            <li key={title}>
              <div className="process-step-marker">
                <ProcessIcon step={index} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
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
          <Image
            src="/dr-nim.webp"
            alt="Dr. Lay Nim"
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), 45vw"
          />
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
            <Link href="/dr-nim">
              Meet Dr. Nim <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/doctor-referral">
              Refer a patient <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <PatientStories />

      <section className="visit-section" id="visit">
        <div className="visit-image">
          <Image
            src="/office-lounge.webp"
            alt="Modern waiting area at Precision Vision Institute"
            fill
            sizes="(max-width: 760px) calc(100vw - 40px), 60vw"
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
              <span>Mon / Tue / Wed / Fri</span>
              <strong>9:30 AM—5:30 PM</strong>
            </div>
            <div>
              <span>Sat</span>
              <strong>9:30 AM—1:30 PM</strong>
            </div>
            <div className="closed">
              <span>Thurs / Sun</span>
              <strong>Closed</strong>
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

      <section className="booking-section" id="book">
        <div className="booking-intro">
          <p className="section-label">Your next chapter can look clearer</p>
          <h2>Plan your visit.</h2>
          <p>
            Complete the secure verification, choose the care you need, and
            select from the clinic&apos;s live appointment dates and times.
          </p>
          <div className="booking-contact">
            <span>Prefer to speak with us?</span>
            <a href="tel:+14704404099">(470) 440-4099</a>
          </div>
        </div>
        <BookingWidget />
      </section>

      <SiteFooter />
    </main>
  );
}

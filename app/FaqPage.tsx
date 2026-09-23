import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import {
  breadcrumbStructuredData,
  faqStructuredData,
  JsonLd,
  medicalWebPageStructuredData,
} from "./structured-data";
import { allFaqs } from "./faq-content";


export function FaqPage() {
  return (
    <main id="main-content" className="faq-page">
      <JsonLd
        data={[
          medicalWebPageStructuredData({
            path: "/faq",
            name: "Frequently asked questions",
            description:
              "Answers to the practical questions patients ask before booking specialty eye care at Precision Vision Institute.",
          }),
          faqStructuredData(allFaqs),
          breadcrumbStructuredData([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <SiteHeader />
      <section className="static-hero faq-hero">
        <div>
          <p className="section-label">Patient resources</p>
          <h1>Questions, answered clearly.</h1>
          <p>Every eye and every treatment plan is different. These answers cover the practical things patients ask before booking.</p>
          <Link className="button button-primary" href="/book">Book an evaluation <ArrowIcon /></Link>
        </div>
      </section>
      <section className="detail-faq faq-accordion" aria-labelledby="faq-heading">
        <p className="section-label">Frequently asked questions</p>
        <h2 id="faq-heading">Helpful answers before your visit.</h2>
        <div className="detail-faq-list">
          {allFaqs.map(({ question, answer }) => (
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

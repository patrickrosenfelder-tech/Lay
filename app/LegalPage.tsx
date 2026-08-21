import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export type LegalPageData = {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    subSections?: { title: string; paragraphs?: string[]; bullets?: string[] }[];
  }[];
};

export function LegalPage({ page }: { page: LegalPageData }) {
  const formatText = (text: string) => {
    const emailPattern = /(info@precisionvisioninstitute\.com)/g;
    const parts = text.split(emailPattern);
    return parts.map((part, index) =>
      part === "info@precisionvisioninstitute.com" ? (
        <a href={`mailto:${part}`} key={`${part}-${index}`}>{part}</a>
      ) : (
        part
      ),
    );
  };

  return (
    <main className="legal-page">
      <SiteHeader />
      <section className="legal-hero">
        <p className="section-label">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>Effective Date: {page.effectiveDate}<br />Last Updated: {page.effectiveDate}</p>
      </section>
      <article className="legal-content">
        {page.intro.map((paragraph) => <p className="legal-intro" key={paragraph}>{paragraph}</p>)}
        {page.sections.map((section, index) => (
          <section key={section.title}>
            <div className="legal-section-title"><span>{String(index + 1).padStart(2, "0")}</span>{" "}<h2>{section.title}</h2></div>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{formatText(paragraph)}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{formatText(bullet)}</li>)}</ul>}
            {section.subSections?.map((subSection) => (
              <div className="legal-subsection" key={subSection.title}>
                <h3>{subSection.title}</h3>
                {subSection.paragraphs?.map((paragraph) => <p key={paragraph}>{formatText(paragraph)}</p>)}
                {subSection.bullets && <ul>{subSection.bullets.map((bullet) => <li key={bullet}>{formatText(bullet)}</li>)}</ul>}
              </div>
            ))}
          </section>
        ))}
        <Link className="legal-contact-link" href="/contact">Contact Precision Vision Institute <ArrowIcon /></Link>
      </article>
      <SiteFooter />
    </main>
  );
}

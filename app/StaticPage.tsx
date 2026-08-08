import Image from "next/image";
import Link from "next/link";
import { LocationMap } from "./LocationMap";
import { OfficeExterior } from "./OfficeExterior";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export type StaticPageData = {
  eyebrow: string;
  title: string;
  lede: string;
  sections: { title: string; copy: string; bullets?: string[] }[];
  image?: string;
  imageAlt?: string;
  showOfficeLocation?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export function StaticPage({ page }: { page: StaticPageData }) {
  return (
    <main className="static-page">
      <SiteHeader />
      <section className="static-hero">
        <div>
          <p className="section-label">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.lede}</p>
          <Link className="button button-primary" href={page.ctaHref ?? "/#book"}>
            {page.ctaLabel ?? "Book an appointment"} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        {page.showOfficeLocation ? (
          <OfficeExterior className="static-hero-image" sizes="(max-width: 900px) 90vw, 38vw" />
        ) : page.image && (
          <div className="static-hero-image">
            <Image src={page.image} alt={page.imageAlt ?? ""} fill sizes="(max-width: 900px) 90vw, 38vw" />
          </div>
        )}
      </section>
      <section className="static-content">
        {page.sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </article>
        ))}
      </section>
      {page.showOfficeLocation && (
        <section className="office-location">
          <div>
            <p className="section-label">Find Precision Vision Institute</p>
            <h2>3940 Buford Hwy<br />Suite A104<br />Duluth, GA 30096</h2>
            <a href="tel:+14704404099">(470) 440-4099</a>
          </div>
          <LocationMap />
        </section>
      )}
      <SiteFooter />
    </main>
  );
}

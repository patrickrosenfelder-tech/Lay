import Image from "next/image";
import styles from "./OfficeGallery.module.css";

const photos = [
  { file: "01-waiting-room.webp", caption: "A welcoming place to settle in", alt: "Waiting area with a black sofa, white chairs, and framed artwork" },
  { file: "06-contact-lens-consultation-area.webp", caption: "Space for conversation and lens instruction", alt: "Contact lens consultation area with a white table, chairs, and a tabletop mirror" },
  { file: "07-eyewear-display.webp", caption: "Explore our eyewear selection", alt: "Eyeglass frames and sunglasses arranged on white display shelves" },
  { file: "11-diagnostic-testing-room.webp", caption: "Detailed measurements, personalized care", alt: "Diagnostic testing room with eye measurement instruments and a computer workstation" },
  { file: "21-exam-room-ai-edited.webp", caption: "Inside the exam room", alt: "Retouched view of the exam room showing the examination chair and eye care instruments" },
  { file: "26-exam-room-seating.webp", caption: "Room to feel comfortable", alt: "Two guest chairs and a small table beside eye examination equipment" },
] as const;

export function OfficeGallery() {
  return (
    <section className={styles.gallery} aria-labelledby="office-gallery-title">
      <header className={styles.intro}>
        <p className="section-label">Take a look around</p>
        <h2 id="office-gallery-title">A closer look at our office.</h2>
        <p>Get familiar with the spaces you’ll visit, from our waiting area to our consultation and testing rooms.</p>
      </header>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <figure className={styles.photo} key={photo.file}>
            <a className={styles.imageLink} href={`/office/${photo.file}`} aria-label={`View larger photo: ${photo.caption}`}>
              <Image src={`/office/${photo.file}`} alt={photo.alt} fill sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 29vw" />
            </a>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

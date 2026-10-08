import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LoadingImage from "@/components/LandingPage/LoadingImage";
import ScrambleText from "@/components/LandingPage/ScrambleText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Awards | Lockwave Systems",
};

const TITLE = "Technorama 2026";

/*
 * Technorama 2026: a collage of the day around the name. Desktop: the boxes sit where
 * the sketch put them (the stage photo top right of centre, the name across the middle
 * with a short note under its end, the stand on the right and the boards from above
 * along the bottom).
 * Tablet and phones: the name and the note, then the photos.
 */
function AwardsPage() {
  return (
    <PageShell>
      <section className={styles.awards} aria-labelledby="awards-title">
        <Reveal variant="fade" trigger="load" className={`${styles.photo} ${styles.photoA}`}>
          <LoadingImage
            src="/awards/technorama-pitch.jpg"
            alt="The Lockwave team on the KTU Pitch Battle stage at Technorama 2026, holding the FESTO and UDS prize boards"
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 75vw, 100vw"
            preload
            className={styles.image}
          />
        </Reveal>

        <Reveal trigger="load" delay={0.15} className={styles.titleBox}>
          <h1 id="awards-title" className={styles.title}>
            {/* Screen readers get the real title; it rises in, then a letter glitches now and then. */}
            <span className={styles.srOnly}>{TITLE}</span>
            <span aria-hidden="true">
              {TITLE.split(" ").map((word, i) => (
                <span key={word}>
                  {i > 0 && " "}
                  <ScrambleText text={word} scrambleIn={false} />
                </span>
              ))}
            </span>
          </h1>
        </Reveal>

        <Reveal trigger="load" delay={0.25} className={styles.note}>
          <p className={styles.noteText}>Pitch Battle winners: FESTO and UDS prizes, 1000 EUR each.</p>
        </Reveal>

        <Reveal variant="fade" trigger="load" delay={0.1} className={`${styles.photo} ${styles.photoB}`}>
          <LoadingImage
            src="/awards/technorama-stand.jpg"
            alt="The Lockwave stand at Technorama 2026: the radios, a laptop and both prize boards on the table"
            fill
            sizes="(min-width: 1024px) 35vw, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
        </Reveal>

        <Reveal variant="fade" trigger="load" delay={0.2} className={`${styles.photo} ${styles.photoC}`}>
          <LoadingImage
            src="/awards/Snapchat-1021346839 (2).jpg"
            alt="The FESTO and UDS prize boards from above, with two Lockwave radios lying on them"
            fill
            sizes="(min-width: 1024px) 31vw, 100vw"
            className={styles.image}
          />
        </Reveal>
      </section>
    </PageShell>
  );
}

export default AwardsPage;

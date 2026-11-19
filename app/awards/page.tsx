import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LoadingImage from "@/components/LandingPage/LoadingImage";
import LoadingVideo from "@/components/LandingPage/LoadingVideo";
import ScrambleText from "@/components/LandingPage/ScrambleText";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Awards | Lockwave Systems",
};

const TECHNORAMA_URL = "https://technorama.ktu.edu/";
const TECHNORAMA_LRYTAS_URL = "https://projektas.lrytas.lt/technorama-2026/dalyvis/82";
const SAULIU_URL = "https://sauliuhakatonas.lt/";
const HACKATHON_URL = "https://luma.com/hckvnb7a?utm_id=97758_v0_s00_e0_tv4";

// An award's name in heavy capitals: screen readers get the real text; a letter glitches now and then.
function GlitchTitle({ as: Tag, id, text }: { as: "h1" | "h2"; id: string; text: string }) {
  return (
    <Tag id={id} className={styles.title}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span key={word}>
            {i > 0 && " "}
            <ScrambleText text={word} scrambleIn={false} />
          </span>
        ))}
      </span>
    </Tag>
  );
}

/*
 * Each award is a collage of the day around its name. Desktop: the boxes sit where the
 * sketch put them. Technorama: the stage photo top right of centre, the name across the
 * middle with a short note under its end, the stand on the right and the boards from
 * above along the bottom. Šaulių hackathon: the video top left, the name and note beside
 * it, the team photo below with the STARTUP LAB invitation over its bottom-left corner. MKGA:
 * Technorama mirrored, with the Google Cloud card laid over the team photo.
 * Tablet and phones: the name and the note, then the photos, each prize overlapping the
 * photo above it.
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
            fetchPriority="high"
            className={styles.image}
          />
        </Reveal>

        <Reveal trigger="load" delay={0.15} className={styles.titleBox}>
          <GlitchTitle as="h1" id="awards-title" text="Technorama 2026" />
        </Reveal>

        <Reveal trigger="load" delay={0.25} className={styles.note}>
          <p className={styles.noteText}>Pitch Battle winners: FESTO and UDS prizes, 1000 EUR each.</p>
          <a href={TECHNORAMA_URL} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
            Technorama, KTU ↗
          </a>
          <a href={TECHNORAMA_LRYTAS_URL} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
            Our entry, Lrytas&nbsp;↗
          </a>
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

      <section className={`${styles.awards} ${styles.siauliai}`} aria-labelledby="siauliai-title">
        <Reveal variant="fade" className={`${styles.photo} ${styles.siauVideo}`}>
          <LoadingVideo
            src="/awards/siauliai-team-hd.mp4"
            poster="/awards/siauliai-team-hd-poster.webp"
            aria-label="The team leaning over the table at Šaulių hackathon 2026, laying out parts"
            playInView
            muted
            loop
            playsInline
            className={styles.video}
          />
        </Reveal>

        <Reveal delay={0.15} className={styles.titleBox}>
          <GlitchTitle as="h2" id="siauliai-title" text="Šaulių hackathon" />
        </Reveal>

        <Reveal delay={0.25} className={`${styles.note} ${styles.siauNote}`}>
          <p className={styles.noteText}>
            Šaulių hackathon 2026: invited to STARTUP LAB, the Dual Use Pre-Acceleration Program.
          </p>
          <a href={SAULIU_URL} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
            Šaulių hackathon ↗
          </a>
        </Reveal>

        <Reveal variant="fade" delay={0.1} className={`${styles.photo} ${styles.siauTeam}`}>
          <LoadingImage
            src="/awards/siauliai-hackathon.jpg"
            alt="The team at work around a table at Šaulių hackathon 2026, a Lockwave node and a 3D model on screen"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className={styles.image}
          />
        </Reveal>

        <Reveal variant="fade" delay={0.2} className={`${styles.photo} ${styles.prize} ${styles.siauInvite}`}>
          <LoadingImage
            src="/awards/startup-lab-invite.jpg"
            alt="The invitation to STARTUP LAB, the Dual Use Pre-Acceleration Program by Tech-Park Kaunas, Civitta, KMTP and VITP"
            fill
            sizes="(min-width: 1024px) 25vw, 60vw"
            className={styles.image}
          />
        </Reveal>
      </section>

      <section className={`${styles.awards} ${styles.hackathon}`} aria-labelledby="hackathon-title">
        <Reveal variant="fade" className={`${styles.photo} ${styles.hackVideo}`}>
          <LoadingVideo
            src="/awards/pulso-pitch-hd.mp4"
            poster="/awards/pulso-pitch-hd-poster.webp"
            aria-label="The team pitching Pulso at the MKGA #3 hackathon, pointing at the app on the screen"
            playInView
            muted
            loop
            playsInline
            className={styles.video}
          />
        </Reveal>

        <Reveal delay={0.15} className={styles.titleBox}>
          <GlitchTitle as="h2" id="hackathon-title" text="MKGA Hackathon" />
        </Reveal>

        <Reveal delay={0.25} className={`${styles.note} ${styles.hackNote}`}>
          <p className={styles.noteText}>
            Won $2,000 in Google Cloud credits with Pulso, our invoice-checking app.
          </p>
          <a href={HACKATHON_URL} target="_blank" rel="noopener noreferrer" className={styles.noteLink}>
            MKGA #3: The Playground, Kaunas ↗
          </a>
        </Reveal>

        <Reveal variant="fade" delay={0.1} className={`${styles.photo} ${styles.hackB}`}>
          <LoadingImage
            src="/awards/IMG_20261024_170038.jpg"
            alt="Three of the team building Pulso on their laptops around a table at the MKGA #3 hackathon"
            fill
            sizes="(min-width: 1024px) 35vw, 100vw"
            className={styles.image}
          />
        </Reveal>

        <Reveal variant="fade" delay={0.2} className={`${styles.photo} ${styles.prize} ${styles.hackC}`}>
          <LoadingImage
            src="/awards/google-cloud-prize.jpg"
            alt="The prize card: 2000 $ in Google Cloud credits"
            fill
            sizes="(min-width: 1024px) 20vw, 100vw"
            className={styles.image}
          />
        </Reveal>
      </section>
    </PageShell>
  );
}

export default AwardsPage;

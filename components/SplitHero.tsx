import type { ReactNode } from "react";
import LoadingImage from "./LandingPage/LoadingImage";
import LoadingVideo from "./LandingPage/LoadingVideo";
import { Reveal } from "./motion/Reveal";
import styles from "./SplitHero.module.css";

interface SplitHeroProps {
    // id of the page's h1, which names the section
    titleId: string;
    // A photo, or with `video` a clip that plays silently on a loop.
    src: string;
    alt: string;
    video?: boolean;
    // Per-page crop (object-position, or sizing for a video), so the subject stays in the tall card.
    imageClassName?: string;
    // Small stacked lines beside the headline (optional).
    label?: ReactNode;
    // The h1: plain text (give it the `title` class from SplitHero.module.css) or a lockup.
    heading: ReactNode;
    // Small note in the top-right.
    note: ReactNode;
    // The button under the headline.
    cta: ReactNode;
}

/*
 * A page's opening screen: a tall photo (or looping video) card on the left;
 * beside it a small label, a big headline and a note, with a button under the
 * headline. The photo fades in on load and the copy rises in after it.
 */
function SplitHero({ titleId, src, alt, video = false, imageClassName, label, heading, note, cta }: SplitHeroProps) {
    return (
        <section className={styles.hero} aria-labelledby={titleId}>
            <Reveal variant="fade" trigger="load" className={styles.photo}>
                {video ? (
                    // Muted and inline, so browsers let it start on its own.
                    <LoadingVideo
                        src={src}
                        aria-label={alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className={`${styles.image} ${styles.video} ${imageClassName ?? ""}`}
                    />
                ) : (
                    <LoadingImage
                        src={src}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 26vw, (min-width: 640px) 40vw, 100vw"
                        preload
                        className={`${styles.image} ${imageClassName ?? ""}`}
                    />
                )}
            </Reveal>

            <div className={styles.copy}>
                {label && <Reveal as="p" trigger="load" delay={0.1} className={styles.label}>{label}</Reveal>}
                <Reveal trigger="load" delay={0.2} className={styles.titleWrap}>
                    {heading}
                    {/* Draws the phone layout's guide lines above and below the headline. */}
                    <span className={styles.rules} aria-hidden="true" />
                </Reveal>
                <Reveal as="p" trigger="load" delay={0.3} className={styles.note}>{note}</Reveal>
                <Reveal trigger="load" delay={0.4} className={styles.cta}>{cta}</Reveal>
            </div>
        </section>
    );
}

export default SplitHero;

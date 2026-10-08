import type { ReactNode } from "react";
import LoadingImage from "./LandingPage/LoadingImage";
import LoadingVideo from "./LandingPage/LoadingVideo";
import ScrambleText from "./LandingPage/ScrambleText";
import { Parallax } from "./motion/Parallax";
import { Reveal } from "./motion/Reveal";
import styles from "./PageHero.module.css";

interface PageHeroProps {
    // id of the page's h1, which names the section
    id: string;
    title: string;
    src: string;
    alt: string;
    // Per-page object-position, so the subject stays in frame on narrow screens.
    imageClassName?: string;
    // `src` is a video: it plays silently on a loop behind the title instead of a photo.
    video?: boolean;
    // Per-page title tweaks, e.g. breaking a two-word title onto two lines.
    titleClassName?: string;
    // Per-page placement of the title block (and so of the guide lines framing it).
    contentClassName?: string;
    // Optional buttons under the title.
    children?: ReactNode;
    // light: white letters that glitch in black (for a dark photo); dark: black letters
    // that glitch in white (for a pale one).
    tone?: "light" | "dark";
}

const GLITCH_COLOR = {
    light: "var(--lw-bg, #0b0c08)",
    dark: "var(--lw-text, #f2f3ec)",
};

/*
 * A page's opening screen: a full-screen photo (or looping video) with the page name in heavy letters on
 * the left, and optional buttons under it, framed by green guide lines (one across
 * above, one across below, an upright one just after the title). Title and buttons rise
 * in together like the home page's LOCKWAVE; once in place, now and then a letter flickers.
 */
function PageHero({ id, title, src, alt, imageClassName, video = false, titleClassName, contentClassName, children, tone = "light" }: PageHeroProps) {
    return (
        <section className={styles.hero} aria-labelledby={id}>
            <Parallax>
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
                    <LoadingImage src={src} alt={alt} fill sizes="100vw" preload className={`${styles.image} ${imageClassName ?? ""}`} />
                )}
            </Parallax>
            <Reveal trigger="load" delay={0.2} className={`${styles.content} ${contentClassName ?? ""}`}>
                <h1 id={id} className={`${styles.title} ${tone === "dark" ? styles.dark : ""} ${titleClassName ?? ""}`}>
                    {/* Screen readers get the real title, not the flickering letters. */}
                    <span className={styles.srOnly}>{title}</span>
                    {/* A scrambling block per word, so a longer title can still wrap between words. */}
                    <span aria-hidden="true">
                        {title.split(" ").map((word, i) => (
                            <span key={i}>
                                {i > 0 && " "}
                                <ScrambleText text={word} scrambleIn={false} glitchColor={GLITCH_COLOR[tone]} />
                            </span>
                        ))}
                    </span>
                </h1>
                {children && <div className={styles.actions}>{children}</div>}
                <span className={styles.guides} aria-hidden="true" />
            </Reveal>
        </section>
    );
}

export default PageHero;

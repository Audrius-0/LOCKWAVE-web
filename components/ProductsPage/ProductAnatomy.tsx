'use client';

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import ArrowLink from "../ArrowLink";
import LoadingImage from "../LandingPage/LoadingImage";
import { RevealGroup, RevealItem } from "../motion/Reveal";
import { VIEWPORT, WIPE } from "../motion/springs";
import section from "../LandingPage/Section.module.css";
import styles from "./ProductAnatomy.module.css";

export interface Callout {
    label: string;
    text: string;
    // The spot pointed at, in % of the photo's width and height.
    x: number;
    y: number;
    // Which side of the photo the label sits on.
    side: "left" | "right";
    // Height of the label in % of the photo (defaults to y); the line bends to reach the spot.
    labelY?: number;
}

interface ProductAnatomyProps {
    id: string;
    category: string;
    name: string;
    intro: string;
    image: string;
    alt: string;
    callouts: Callout[];
    // Where the "More info" button beside the pointers leads, e.g. "#advantages".
    infoHref: string;
    // How far along the product is, shown at the figure's top left: e.g. Prototype / TRL 5.
    stage?: { label: string; value: string };
    // Land a jump to this product this many px further down than the photo's centre.
    jumpShift?: number;
}

/*
 * The figure is 1/0.4 times as wide as the photo, so the photo (whole, uncropped)
 * fills its middle 40% and the label columns get 30% each side. A spot (x, y) on the
 * photo is then at (30 + 0.4x, y) in the figure, which is what the lines use.
 */
const PHOTO_LEFT = 30;
const PHOTO_SHARE = 0.4;
// Where lines leave the labels: just inside each 26%-wide label column's inner edge.
const LINE_START = { left: 27, right: 73 };

/*
 * Lines draw from the label to the spot, one after another, by moving their end
 * point (pathLength would dash them, as the stroke does not scale with the SVG).
 * Labels fade in beside them.
 */
function drawTo(x1: number, y1: number, x2: number, y2: number): Variants {
    return {
        hidden: { x2: x1, y2: y1, opacity: 0 },
        shown: (i: number) => ({ x2, y2, opacity: 1, transition: { ...WIPE, delay: 0.2 + i * 0.12 } }),
    };
}

const FADE: Variants = {
    hidden: { opacity: 0 },
    shown: (i: number) => ({ opacity: 1, transition: { duration: 0.4, delay: 0.2 + i * 0.12 } }),
};

/*
 * One product shown whole, with pointers from its parts out to short descriptions on
 * either side. Phones: numbered dots on the photo and a matching numbered list below.
 */
function ProductAnatomy({ id, category, name, intro, image, alt, callouts, infoHref, stage, jumpShift = 0 }: ProductAnatomyProps) {
    return (
        <section className={section.section} aria-labelledby={`${id}-name`}>
            <div className={section.inner}>
                <RevealGroup className={styles.heading}>
                    <RevealItem as="p" className={styles.category}>{category}</RevealItem>
                    <RevealItem as="h2" id={`${id}-name`} className={`${section.title} ${styles.name}`}>{name}</RevealItem>
                    <RevealItem as="p" className={section.lead}>{intro}</RevealItem>
                </RevealGroup>

                <motion.figure className={styles.figure} initial="hidden" whileInView="shown" viewport={VIEWPORT}>
                    {/* Readiness: phones, above the photo; desktop, the free top of the left column. */}
                    {stage && (
                        <motion.p className={styles.stage} variants={FADE} custom={0}>
                            <span className={styles.stageLabel}>{stage.label}</span>
                            <span className={styles.stageValue}>{stage.value}</span>
                        </motion.p>
                    )}

                    <div className={styles.photo}>
                        {/* Jump target (#id): placed so a jump centres the photo on screen. */}
                        <span
                            id={id}
                            className={styles.anchor}
                            style={{ "--jump-shift": `${jumpShift}px` } as CSSProperties}
                            aria-hidden="true"
                        />
                        <LoadingImage src={image} alt={alt} fill sizes="(min-width: 768px) 40vw, 100vw" className={styles.image} />
                        {callouts.map((c, i) => (
                            <span key={c.label} className={styles.dot} style={{ left: `${c.x}%`, top: `${c.y}%` }} aria-hidden="true">
                                <span className={styles.number}>{i + 1}</span>
                            </span>
                        ))}
                    </div>

                    <svg className={styles.lines} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        {callouts.map((c, i) => {
                            const x1 = LINE_START[c.side];
                            const y1 = c.labelY ?? c.y;
                            return (
                                <motion.line
                                    key={c.label}
                                    x1={x1}
                                    y1={y1}
                                    vectorEffect="non-scaling-stroke"
                                    variants={drawTo(x1, y1, PHOTO_LEFT + PHOTO_SHARE * c.x, c.y)}
                                    custom={i}
                                />
                            );
                        })}
                    </svg>

                    <ol className={styles.labels}>
                        {callouts.map((c, i) => (
                            <motion.li
                                key={c.label}
                                className={`${styles.label} ${styles[c.side]}`}
                                style={{ "--label-y": `${c.labelY ?? c.y}%` } as CSSProperties}
                                variants={FADE}
                                custom={i}
                            >
                                <span className={styles.number} aria-hidden="true">{i + 1}</span>
                                <span className={styles.labelName}>{c.label}</span>
                                <span className={styles.labelText}>{c.text}</span>
                            </motion.li>
                        ))}
                    </ol>

                    {/*
                      * The same round pill as the product buttons in the hero, jumping to more
                      * info on the page. It takes a pointer label's place: desktop, the free top
                      * of the left label column; phones, the end of the list. It fades in after
                      * the pointers.
                      */}
                    <motion.div className={styles.action} variants={FADE} custom={callouts.length}>
                        <ArrowLink href={infoHref} variant="pill">More info</ArrowLink>
                    </motion.div>

                </motion.figure>
            </div>

        </section>
    );
}

export default ProductAnatomy;

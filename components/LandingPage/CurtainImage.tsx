'use client';

import LoadingImage from "./LoadingImage";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { SPRING, VIEWPORT } from "../motion/springs";
import styles from "./CurtainImage.module.css";

interface CurtainImageProps {
    src: string;
    alt: string;
    sizes: string;
    className?: string;
    imageClassName?: string;
    // single: one curtain lifts off; split: two halves part from the middle.
    variant?: "single" | "split";
}

// Own variant names so a surrounding RevealGroup ("hidden"/"shown") never drives it.
const CURTAIN: Variants = {
    covered: { scaleY: 1 },
    revealed: { scaleY: 0, transition: SPRING.reveal },
};

function CurtainImage({ src, alt, sizes, className, imageClassName, variant = "single" }: CurtainImageProps) {
    return (
        <motion.div
            className={`${styles.frame} ${className ?? ""}`}
            initial="covered"
            whileInView="revealed"
            viewport={VIEWPORT}
        >
            <LoadingImage src={src} alt={alt} fill sizes={sizes} className={`${styles.image} ${imageClassName ?? ""}`} />
            {variant === "single" ? (
                <motion.div className={`${styles.curtain} ${styles.full}`} variants={CURTAIN} />
            ) : (
                <>
                    <motion.div className={`${styles.curtain} ${styles.top}`} variants={CURTAIN} />
                    <motion.div className={`${styles.curtain} ${styles.bottom}`} variants={CURTAIN} />
                </>
            )}
        </motion.div>
    );
}

export default CurtainImage;

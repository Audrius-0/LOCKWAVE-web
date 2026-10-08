'use client';

import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { VIEWPORT, WIPE } from "./springs";
import styles from "./motion.module.css";

interface WipeTextProps {
    children: string;
    className?: string;
    // Seconds to wait after the text scrolls into view.
    delay?: number;
}

/*
 * PowerPoint-style "Wipe from left": the text's own colour sweeps across it in one
 * continuous motion. It is painted, not clipped, so text that wraps onto several
 * lines is revealed in reading order, line after line (a clip would cut off every
 * line after the first). Own variant names, so a surrounding RevealGroup
 * ("hidden"/"shown") never drives it.
 */
function variantsFor(delay: number): Variants {
    return {
        covered: { backgroundPosition: "100% 0%" },
        wiped: { backgroundPosition: "0% 0%", transition: { ...WIPE, delay } },
    };
}

export function WipeText({ children, className, delay = 0.15 }: WipeTextProps) {
    return (
        <motion.span
            className={`${styles.wipe} ${className ?? ""}`}
            variants={variantsFor(delay)}
            initial="covered"
            whileInView="wiped"
            viewport={VIEWPORT}
        >
            {children}
        </motion.span>
    );
}

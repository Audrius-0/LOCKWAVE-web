'use client';

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import styles from "./motion.module.css";

interface ParallaxProps {
    children: ReactNode;
    // How far the layer drifts each way, as a % of its own height. Max 4.5: the
    // layer overhangs its frame by only 5%, so more would show an edge.
    amount?: number;
}

/*
 * Fills its (positioned) parent. The content drifts slower than the page,
 * tied 1:1 to the scroll position, so it follows, reverses and stops with the
 * reader. The frame is measured, not the moving layer, so there is no feedback loop.
 */
export function Parallax({ children, amount = 4.5 }: ParallaxProps) {
    const frame = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

    return (
        <div ref={frame} className={styles.parallaxFrame}>
            <motion.div className={styles.parallaxLayer} style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
}

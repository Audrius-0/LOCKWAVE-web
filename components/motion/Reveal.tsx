'use client';

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { SPRING, VIEWPORT } from "./springs";

/*
 * Scroll-in reveals.
 *  <Reveal>           one element, animates on its own.
 *  <RevealGroup>      animates when it enters view and staggers its <RevealItem>s.
 *  <RevealItem>       a child of RevealGroup (or of any parent using the
 *                     "hidden" / "shown" variant names).
 * Each renders the tag given in `as`, so it can replace an existing element
 * instead of adding a wrapper.
 */

const TAGS = {
    div: motion.div,
    p: motion.p,
    ul: motion.ul,
    ol: motion.ol,
    li: motion.li,
    article: motion.article,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
};

type Tag = keyof typeof TAGS;

type RevealVariant = "rise" | "fade" | "fromLeft" | "fromRight";

// Movement always points the way the content is heading, and never overshoots.
const HIDDEN: Record<RevealVariant, Record<string, number | string>> = {
    rise: { opacity: 0, y: 32 },
    fade: { opacity: 0 },
    fromLeft: { opacity: 0, x: -48 },
    fromRight: { opacity: 0, x: 48 },
};

const SHOWN: Record<RevealVariant, Record<string, number | string>> = {
    rise: { opacity: 1, y: 0 },
    fade: { opacity: 1 },
    fromLeft: { opacity: 1, x: 0 },
    fromRight: { opacity: 1, x: 0 },
};

// `custom` carries an optional delay. It is left out when zero so a parent's
// stagger timing is not overridden.
function variantsFor(variant: RevealVariant): Variants {
    return {
        hidden: HIDDEN[variant],
        shown: (delay?: number) => ({
            ...SHOWN[variant],
            transition: delay ? { ...SPRING.reveal, delay } : SPRING.reveal,
        }),
    };
}

interface BaseProps {
    as?: Tag;
    className?: string;
    id?: string;
    children?: ReactNode;
}

interface RevealProps extends BaseProps {
    variant?: RevealVariant;
    delay?: number;
    // "scroll": when it scrolls into view. "load": as soon as the page renders,
    // for content already on screen (a scroll trigger can miss it if a parent
    // clips the element's hidden, offset position).
    trigger?: "scroll" | "load";
}

export function Reveal({ as = "div", variant = "rise", delay, trigger = "scroll", className, id, children }: RevealProps) {
    const Component = TAGS[as] as typeof motion.div;
    const start = trigger === "load" ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT };
    return (
        <Component
            className={className}
            id={id}
            variants={variantsFor(variant)}
            custom={delay}
            initial="hidden"
            {...start}
        >
            {children}
        </Component>
    );
}

interface RevealGroupProps extends BaseProps {
    stagger?: number;
    delay?: number;
}

export function RevealGroup({ as = "div", stagger = 0.08, delay = 0, className, id, children }: RevealGroupProps) {
    const Component = TAGS[as] as typeof motion.div;
    return (
        <Component
            className={className}
            id={id}
            variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
            initial="hidden"
            whileInView="shown"
            viewport={VIEWPORT}
        >
            {children}
        </Component>
    );
}

interface RevealItemProps extends BaseProps {
    variant?: RevealVariant;
}

export function RevealItem({ as = "div", variant = "rise", className, id, children }: RevealItemProps) {
    const Component = TAGS[as] as typeof motion.div;
    return (
        <Component className={className} id={id} variants={variantsFor(variant)}>
            {children}
        </Component>
    );
}

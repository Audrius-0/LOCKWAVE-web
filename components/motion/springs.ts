import type { Transition } from "motion/react";

/*
 * Apple describes springs with a damping ratio and a response time. In Motion,
 * `bounce: 0` is a damping ratio of 1 (critically damped, no overshoot) and
 * `visualDuration` plays the role of response. Nothing on this page is thrown
 * or flicked into place, so every preset settles without overshoot.
 */
export const SPRING = {
    // Press feedback: must feel instant.
    press: { type: "spring", bounce: 0, visualDuration: 0.15 },
    // Panels opening and closing (the phone menu).
    ui: { type: "spring", bounce: 0, visualDuration: 0.35 },
    // Content arriving as it scrolls into view.
    reveal: { type: "spring", bounce: 0, visualDuration: 0.7 },
} satisfies Record<string, Transition>;

// Text wipes: steady and even, like a slide transition (ease in and out).
export const WIPE = { duration: 0.5, ease: [0.65, 0, 0.35, 1] as const } satisfies Transition;

// Start a reveal once the element's top has come 12% into the viewport.
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import { SPRING } from "./springs";

// How long a tapped link keeps its highlighted look on touch screens.
const TOUCH_HOLD_MS = 800;

/*
 * Feedback lands on pointer-down, not on release, and the spring lets a press
 * be let go or dragged off at any moment without a jump.
 *
 * Touch screens keep :hover on a tapped element until something else is tapped, so
 * a touch press sets data-touched instead and clears it after a moment. Style it
 * next to the hover state, and keep :hover itself inside @media (hover: hover).
 */
export function PressableLink({ onPointerDown, ...props }: HTMLMotionProps<"a">) {
    const [touched, setTouched] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    return (
        <motion.a
            whileTap={{ scale: 0.97 }}
            transition={SPRING.press}
            data-touched={touched || undefined}
            onPointerDown={(event) => {
                if (event.pointerType !== "mouse") {
                    setTouched(true);
                    clearTimeout(timer.current);
                    timer.current = setTimeout(() => setTouched(false), TOUCH_HOLD_MS);
                }
                onPointerDown?.(event);
            }}
            {...props}
        />
    );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

// The occasional glitch after the text is in: each random character holds for flickerMs,
// a glitch swaps minFlickers–maxFlickers of them, and glitches come minGapMs–maxGapMs apart.
// The first comes sooner (firstMinMs–firstMaxMs), right as the titles finish rising in.
const GLITCH = {
    flickerMs: 150,
    minFlickers: 4,
    maxFlickers: 7,
    minGapMs: 2000,
    maxGapMs: 5000,
    firstMinMs: 900,
    firstMaxMs: 1300,
};

// The scramble-in on load: a new frame every this many ms (about 0.4 s for an 8-letter word).
const SCRAMBLE_IN_FRAME_MS = 18;

function scramble(text: string, revealCount: number) {
    return text
        .split('')
        .map((char, i) => {
            if (char === ' ' || i < revealCount) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
}

interface ScrambleTextProps {
    text: string;
    className?: string;
    start?: boolean;
    onComplete?: () => void;
    // Colour of the random characters (default: the green accent).
    glitchColor?: string;
    // false: the text is simply there from the start (no scramble-in, no fade), so a
    // parent's own entrance can carry it; only the occasional one-letter glitch runs.
    scrambleIn?: boolean;
}

function ScrambleText({ text, className, start = true, onComplete, glitchColor = 'var(--lw-accent, #8ed1a6)', scrambleIn = true }: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);
    const [inView, setInView] = useState(false);

    const spanRef = useRef<HTMLSpanElement>(null);

    const active = start && inView;

    /*
     * One sequence while the text is on screen: (optionally) scramble in, then now and
     * then a one-letter glitch. Every timer is tracked, so leaving the screen stops the
     * whole sequence at once and resets the text: the real word, or (with scramble-in)
     * a hidden scrambled one, so it replays fresh when it comes back. Nothing is left
     * half-glitched.
     */
    useEffect(() => {
        if (!active) {
            setDisplay(scrambleIn ? scramble(text, 0) : text);
            return;
        }

        const timers: ReturnType<typeof setTimeout>[] = [];
        const later = (fn: () => void, ms: number) => {
            timers.push(setTimeout(fn, ms));
        };
        const between = (min: number, max: number) => min + Math.random() * (max - min);

        const glitch = () => {
            const index = Math.floor(Math.random() * text.length);
            const flickers = GLITCH.minFlickers + Math.floor(Math.random() * (GLITCH.maxFlickers - GLITCH.minFlickers + 1));
            let tick = 0;
            const flicker = () => {
                if (text[index] !== ' ' && tick < flickers) {
                    setDisplay(text.slice(0, index) + CHARS[Math.floor(Math.random() * CHARS.length)] + text.slice(index + 1));
                    tick++;
                    later(flicker, GLITCH.flickerMs);
                } else {
                    setDisplay(text);
                    later(glitch, between(GLITCH.minGapMs, GLITCH.maxGapMs));
                }
            };
            flicker();
        };

        const startGlitching = () => later(glitch, between(GLITCH.firstMinMs, GLITCH.firstMaxMs));

        if (scrambleIn) {
            const totalFrames = text.length * 2 + 6;
            let frame = 0;
            const step = () => {
                frame++;
                if (frame < totalFrames) {
                    setDisplay(scramble(text, Math.floor((frame / totalFrames) * text.length)));
                    later(step, SCRAMBLE_IN_FRAME_MS);
                } else {
                    setDisplay(text);
                    onComplete?.();
                    startGlitching();
                }
            };
            step();
        } else {
            setDisplay(text);
            startGlitching();
        }

        return () => timers.forEach(clearTimeout);
    }, [active, text, scrambleIn, onComplete]);

    useEffect(() => {
        const node = spanRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setInView(entry.isIntersecting);
                });
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);


    /*
     * The real letters always stay in place and hold the word's width; a scrambled
     * letter is hidden and its random character drawn over it, centred. So the word
     * never changes width, whatever the font's letter widths.
     */
    let content: React.ReactNode = text;

    if (display !== text) {
        content = text.split('').map((char, i) =>
            display[i] !== char
                ? (
                    <span key={i} style={{ position: 'relative' }}>
                        <span style={{ color: 'transparent' }}>{char}</span>
                        <span style={{ position: 'absolute', left: '50%', top: 0, translate: '-50% 0', lineHeight: 'normal', color: glitchColor }}>
                            {display[i]}
                        </span>
                    </span>
                )
                : char
        );
    }

    return (
        <motion.span
            className={className}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            initial={scrambleIn ? { opacity: 0 } : false}
            animate={{ opacity: !scrambleIn || active ? 1 : 0 }}
            transition={{ duration: 0.15 }}
            ref={spanRef}
        >
            {content}
        </motion.span>
    );
}

export default ScrambleText;

'use client';

import { useEffect, useRef, useState } from "react";
import LoadingImage from "./LandingPage/LoadingImage";
import styles from "./CyclingPhoto.module.css";

// How long each photo stays before the next fades in.
const HOLD_MS = 1400;

interface CyclingPhotoProps {
    images: string[];
    alt: string;
    sizes: string;
    className?: string;
    position?: string;
}

/*
 * Photos stacked in one frame (it fills its positioned parent), crossfading from one
 * to the next in a loop. Only cycles while on screen.
 */
function CyclingPhoto({ images, alt, sizes, className, position }: CyclingPhotoProps) {
    const [shown, setShown] = useState(0);
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView || images.length < 2) return;
        const timer = setInterval(() => setShown((i) => (i + 1) % images.length), HOLD_MS);
        return () => clearInterval(timer);
    }, [inView, images.length]);

    return (
        <div ref={ref} className={styles.stack}>
            {images.map((src, i) => (
                <div key={src} className={styles.layer} data-shown={i === shown || undefined} aria-hidden={i !== shown}>
                    <LoadingImage
                        src={src}
                        alt={alt}
                        fill
                        sizes={sizes}
                        className={className}
                        style={{ objectPosition: position ?? "50% 50%" }}
                    />
                </div>
            ))}
        </div>
    );
}

export default CyclingPhoto;

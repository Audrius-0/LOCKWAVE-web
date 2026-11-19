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
 * to the next in a loop. Only cycles while on screen. Each photo is fetched just
 * before its turn (the shown one and the next), not all at once; once fetched it stays.
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

    // How far into the list photos have been fetched: the shown one and the next.
    // Only raised when it actually grows: setting it during render to the same value
    // (at the last photo, or with a single one) would render again and again.
    const [fetchedUpTo, setFetchedUpTo] = useState(1);
    const wanted = Math.min(shown + 1, images.length - 1);
    if (wanted > fetchedUpTo) setFetchedUpTo(wanted);

    return (
        <div ref={ref} className={styles.stack}>
            {images.map((src, i) => (
                <div key={src} className={styles.layer} data-shown={i === shown || undefined} aria-hidden={i !== shown}>
                    {i <= fetchedUpTo && (
                        <LoadingImage
                            src={src}
                            alt={alt}
                            fill
                            sizes={sizes}
                            className={className}
                            style={{ objectPosition: position ?? "50% 50%" }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default CyclingPhoto;

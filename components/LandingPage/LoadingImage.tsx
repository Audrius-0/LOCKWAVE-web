'use client';

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import styles from "./LoadingImage.module.css";

// "cached": ready at once (the browser already had it), so it shows without the blur-in.
type LoadState = "loading" | "loaded" | "cached" | "failed";

// A photo that finishes this soon after it appears came from the browser's cache.
const CACHED_MS = 300;

/*
 * next/image with a loading state: a quiet shimmer in the page colours while the
 * photo downloads, then the photo resolves from a slight blur instead of popping in.
 * Accepts every next/image prop. With `fill` it covers its positioned parent, like
 * next/image does; otherwise it wraps the image at its own size.
 */
function LoadingImage({ alt, className, fill, onLoad, onError, ...props }: ImageProps) {
    const [state, setState] = useState<LoadState>("loading");
    const wrap = useRef<HTMLSpanElement>(null);
    const shownAt = useRef(0);

    /*
     * A photo the browser already has (e.g. coming back to a page) should show
     * straight away, not replay the shimmer and blur-in, which makes a ready photo
     * look dark and soft for a second. It is either complete before the first
     * paint, or (with next/image's srcset) finishes within a few frames.
     */
    useLayoutEffect(() => {
        shownAt.current = performance.now();
        const img = wrap.current?.querySelector("img");
        if (img?.complete && img.naturalWidth > 0) setState("cached");
    }, []);

    return (
        <span ref={wrap} className={`${styles.wrap} ${fill ? styles.fill : ""}`} data-state={state}>
            <span className={styles.placeholder} aria-hidden="true" />
            <Image
                {...props}
                alt={alt}
                fill={fill}
                className={`${styles.image} ${className ?? ""}`}
                onLoad={(event) => {
                    setState(performance.now() - shownAt.current < CACHED_MS ? "cached" : "loaded");
                    onLoad?.(event);
                }}
                onError={(event) => {
                    setState("failed");
                    onError?.(event);
                }}
            />
        </span>
    );
}

export default LoadingImage;

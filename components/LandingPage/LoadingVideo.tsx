'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import styles from "./LoadingImage.module.css";

type LoadState = "loading" | "loaded" | "cached" | "failed";

// How far ahead of the screen a lazy video starts downloading.
const NEAR_MARGIN = "300px 0px";

/*
 * Every video the site plays has an AV1 copy beside it (name.av1.mp4, about half the
 * size). Browsers that can decode AV1 take it; the rest fall back to the H.264 file.
 */
const AV1_TYPE = 'video/mp4; codecs="av01.0.08M.08"';
const av1Of = (src: string) => src.replace(/\.mp4$/, ".av1.mp4");

interface LoadingVideoProps extends Omit<ComponentProps<"video">, "ref" | "src"> {
    // The H.264 file; its AV1 copy sits beside it.
    src: string;
    // Play while at least a quarter of it is on screen, pause otherwise (instead of autoPlay).
    playInView?: boolean;
}

/*
 * A lazy <video> with the same loading state as LoadingImage: nothing downloads until
 * it nears the screen; then the shimmer in the page colours until its first frame is
 * ready, and it sharpens and fades in. It covers its positioned parent, like
 * LoadingImage with `fill`. Accepts every <video> prop.
 */
function LoadingVideo({ className, src, poster, preload, playInView = false, onLoadedData, ...props }: LoadingVideoProps) {
    const [state, setState] = useState<LoadState>("loading");
    const [near, setNear] = useState(false);
    const video = useRef<HTMLVideoElement>(null);
    const visible = useRef(false);

    // A video the browser already has a frame of (e.g. coming back to a page) shows at once.
    useLayoutEffect(() => {
        if ((video.current?.readyState ?? 0) >= HTMLMediaElement.HAVE_CURRENT_DATA) setState("cached");
    }, []);

    // Lazy: hand the video its files (and poster) once it is within NEAR_MARGIN of the screen.
    useEffect(() => {
        const node = video.current;
        if (near || !node) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setNear(true);
        }, { rootMargin: NEAR_MARGIN });
        observer.observe(node);
        return () => observer.disconnect();
    }, [near]);

    // playInView: play while a quarter of it shows, pause when it scrolls away.
    useEffect(() => {
        const node = video.current;
        if (!playInView || !node) return;
        const observer = new IntersectionObserver(([entry]) => {
            visible.current = entry.isIntersecting;
            if (entry.isIntersecting) node.play().catch(() => {});
            else node.pause();
        }, { threshold: 0.25 });
        observer.observe(node);
        return () => observer.disconnect();
    }, [playInView]);

    // Sources added after the first render only count once the video is told to load them;
    // then a lazy video already on screen starts playing.
    useEffect(() => {
        if (!near) return;
        video.current?.load();
        if (playInView && visible.current) video.current?.play().catch(() => {});
    }, [near, playInView]);

    return (
        <span className={`${styles.wrap} ${styles.fill}`} data-state={state}>
            <span className={styles.placeholder} aria-hidden="true" />
            <video
                {...props}
                ref={video}
                poster={near ? poster : undefined}
                preload={near ? preload : "none"}
                className={`${styles.image} ${className ?? ""}`}
                onLoadedData={(event) => {
                    setState((s) => (s === "loading" ? "loaded" : s));
                    onLoadedData?.(event);
                }}
            >
                {near && (
                    <>
                        <source src={av1Of(src)} type={AV1_TYPE} />
                        {/* The last source failing means no file would play. */}
                        <source src={src} type="video/mp4" onError={() => setState("failed")} />
                    </>
                )}
            </video>
        </span>
    );
}

export default LoadingVideo;

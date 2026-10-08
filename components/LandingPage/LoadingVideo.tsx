'use client';

import { useLayoutEffect, useRef, useState } from "react";
import type { ComponentProps, Ref } from "react";
import styles from "./LoadingImage.module.css";

type LoadState = "loading" | "loaded" | "cached" | "failed";

interface LoadingVideoProps extends Omit<ComponentProps<"video">, "ref"> {
    ref?: Ref<HTMLVideoElement>;
}

/*
 * A <video> with the same loading state as LoadingImage: the shimmer in the page
 * colours until its first frame is ready, then it sharpens and fades in. It covers its
 * positioned parent, like LoadingImage with `fill`. Accepts every <video> prop.
 */
function LoadingVideo({ className, onLoadedData, onError, ref, ...props }: LoadingVideoProps) {
    const [state, setState] = useState<LoadState>("loading");
    const video = useRef<HTMLVideoElement | null>(null);

    // A video the browser already has a frame of (e.g. coming back to a page) shows at once.
    useLayoutEffect(() => {
        if ((video.current?.readyState ?? 0) >= HTMLMediaElement.HAVE_CURRENT_DATA) setState("cached");
    }, []);

    const setRefs = (node: HTMLVideoElement | null) => {
        video.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
    };

    return (
        <span className={`${styles.wrap} ${styles.fill}`} data-state={state}>
            <span className={styles.placeholder} aria-hidden="true" />
            <video
                {...props}
                ref={setRefs}
                className={`${styles.image} ${className ?? ""}`}
                onLoadedData={(event) => {
                    setState((s) => (s === "loading" ? "loaded" : s));
                    onLoadedData?.(event);
                }}
                onError={(event) => {
                    setState("failed");
                    onError?.(event);
                }}
            />
        </span>
    );
}

export default LoadingVideo;

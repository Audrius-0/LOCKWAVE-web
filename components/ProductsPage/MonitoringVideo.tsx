'use client';

import { useState } from "react";
import LoadingVideo from "../LandingPage/LoadingVideo";
import section from "../LandingPage/Section.module.css";
import styles from "./MonitoringVideo.module.css";

export interface MonitoringStep {
    // Second in the video where this step's part begins.
    at: number;
    text: string;
}

interface MonitoringVideoProps {
    // Names the section for screen readers; nothing is written above the video.
    title: string;
    src: string;
    poster: string;
    alt: string;
    steps: MonitoringStep[];
}

/*
 * A looping video, straight under the product above it, with short steps that appear
 * as their part of it plays; each step's bar fills over its part, then the next takes over.
 * Desktop: the steps build up over the video's lower left; phones: they list under it,
 * the current one bright. When the video loops, the steps start over with it.
 */
function MonitoringVideo({ title, src, poster, alt, steps }: MonitoringVideoProps) {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);

    const follow = (time: number, duration: number) => {
        let index = 0;
        steps.forEach((step, i) => {
            if (time >= step.at) index = i;
        });
        const end = steps[index + 1]?.at ?? duration;
        setCurrent(index);
        setProgress(end > steps[index].at ? Math.min(1, (time - steps[index].at) / (end - steps[index].at)) : 1);
    };

    return (
        <section className={`${section.section} ${styles.monitoring}`} aria-label={title}>
            <div className={section.inner}>
                <div className={styles.frame}>
                    <div className={styles.media}>
                        <LoadingVideo
                            src={src}
                            poster={poster}
                            aria-label={alt}
                            playInView
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className={styles.video}
                            onTimeUpdate={(event) => follow(event.currentTarget.currentTime, event.currentTarget.duration || 0)}
                        />
                    </div>
                    <ol className={styles.steps}>
                        {steps.map((step, i) => (
                            <li
                                key={step.text}
                                className={styles.step}
                                data-shown={i <= current || undefined}
                                data-current={i === current || undefined}
                            >
                                <span className={styles.bar} aria-hidden="true">
                                    <span
                                        className={styles.fill}
                                        style={{ transform: `scaleX(${i < current ? 1 : i === current ? progress : 0})` }}
                                    />
                                </span>
                                <span className={styles.stepText}>{step.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}

export default MonitoringVideo;

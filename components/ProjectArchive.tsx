'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, LazyMotion, domMax } from "motion/react";
import * as m from "motion/react-m";
import LoadingImage from "./LandingPage/LoadingImage";
import LoadingVideo from "./LandingPage/LoadingVideo";
import ScrambleText from "./LandingPage/ScrambleText";
import { Reveal } from "./motion/Reveal";
import { SPRING } from "./motion/springs";
import section from "./LandingPage/Section.module.css";
import styles from "./ProjectArchive.module.css";

interface Media {
    src: string;
    alt: string;
    // object-position, for a photo whose subject is off centre (default: the middle).
    position?: string;
}

export interface Project {
    title: string;
    // The filter it belongs to, e.g. "Vehicles".
    category: string;
    // A few sentences about the project, shown beside the photo when it is opened.
    text: string;
    // The card's photo (or, with `video`, the video's poster).
    cover: Media;
    // A short muted clip that plays in the card while it is on screen.
    video?: string;
    // The other photo shown when the project is opened (default: the video, else the cover).
    detail?: Media;
    // A different clip that plays when the project is opened, with `detail` as its poster.
    detailVideo?: string;
}

interface ProjectArchiveProps {
    // The page's h1.
    title: string;
    titleId: string;
    projects: Project[];
}

const ALL = "All";

// True in the browser after hydration, false on the server: the portal needs <body>.
const noSubscribe = () => () => {};
const useIsClient = () =>
    useSyncExternalStore(
        noSubscribe,
        () => true,
        () => false,
    );

// A card's clip: downloads as it nears the screen and plays only while on it.
function CardVideo({ src, poster }: { src: string; poster: Media }) {
    return (
        <LoadingVideo
            src={src}
            poster={poster.src}
            aria-label={poster.alt}
            playInView
            muted
            loop
            playsInline
            preload="metadata"
            className={styles.video}
            style={{ objectPosition: poster.position }}
        />
    );
}

/*
 * The other projects as a grid of cards: category filters and the title on top, then a photo (or a short clip) per project with its name under it. Hovering a
 * card shows "Press me"; pressing it opens another photo of the project (or its clip
 * again, when there is no other photo) with a short text beside it; a click anywhere (or Escape) closes it.
 */
function ProjectArchive({ title, titleId, projects }: ProjectArchiveProps) {
    const [filter, setFilter] = useState(ALL);
    const [open, setOpen] = useState<string | null>(null);
    const opener = useRef<HTMLButtonElement | null>(null);
    const overlay = useRef<HTMLDivElement>(null);
    const isClient = useIsClient();

    const categories = [ALL, ...new Set(projects.map((p) => p.category))];
    const shown = filter === ALL ? projects : projects.filter((p) => p.category === filter);

    // Back to the grid, with focus on the project that was opened.
    const close = useCallback(() => {
        setOpen(null);
        opener.current?.focus({ preventScroll: true });
    }, []);

    // While open: Escape closes, the page behind doesn't scroll, focus moves into the view.
    useEffect(() => {
        if (open === null) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        const root = document.documentElement;
        const overflow = root.style.overflow;
        root.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        overlay.current?.focus();
        return () => {
            root.style.overflow = overflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, close]);

    const project = projects.find((p) => p.title === open) ?? null;
    const detail = project ? (project.detail ?? project.cover) : null;
    // The opened view's clip: its own, else the card's when there is no other photo.
    const detailVideo = project ? (project.detailVideo ?? (project.detail ? undefined : project.video)) : undefined;
    const openProject = (p: Project) => (event: MouseEvent<HTMLButtonElement>) => {
        opener.current = event.currentTarget;
        setOpen(p.title);
    };

    return (
        // Adds layout animations (cards sliding into new places, a photo flying into the
        // pop-up) to the light set every page has; only this page's bundle carries them.
        <LazyMotion features={domMax}>
            <LayoutGroup>
                <div className={`${section.section} ${styles.archive}`}>
                    <div className={section.inner}>
                        <header className={styles.header}>
                            {/* The title between two green guide lines across the whole screen, like the page heroes. */}
                            <div className={styles.band}>
                                {/* The two guide lines, rising in like the page heroes' lines. */}
                                <Reveal trigger="load" delay={0.2} className={styles.bandRules} />
                                <Reveal as="h1" trigger="load" delay={0.2} id={titleId} className={styles.heading}>
                                    {/* Screen readers get the real title; a letter glitches now and then. */}
                                    <span className={styles.srOnly}>{title}</span>
                                    <span aria-hidden="true">
                                        {title.split(" ").map((word, i) => (
                                            <span key={i}>
                                                {i > 0 && " "}
                                                <ScrambleText text={word} scrambleIn={false} />
                                            </span>
                                        ))}
                                    </span>
                                </Reveal>
                            </div>

                            <nav className={styles.filters} aria-label="Filter projects">
                                {categories.map((c) => (
                                    <button
                                        key={c}
                                        type="button"
                                        className={styles.option}
                                        aria-pressed={filter === c}
                                        onClick={() => setFilter(c)}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </nav>
                        </header>

                        <ul className={styles.grid}>
                            <AnimatePresence mode="popLayout" initial={false}>
                                {shown.map((p) => (
                                    <m.li
                                        key={p.title}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={SPRING.ui}
                                    >
                                        <button type="button" className={styles.card} onClick={openProject(p)}>
                                            <m.span layoutId={`project-${p.title}`} transition={SPRING.ui} className={styles.frame}>
                                                {p.video ? (
                                                    <CardVideo src={p.video} poster={p.cover} />
                                                ) : (
                                                    <LoadingImage
                                                        src={p.cover.src}
                                                        alt={p.cover.alt}
                                                        fill
                                                        sizes="(min-width: 768px) 50vw, 100vw"
                                                        className={styles.image}
                                                        style={{ objectPosition: p.cover.position }}
                                                    />
                                                )}
                                                <span className={styles.press} aria-hidden="true">
                                                    Press me
                                                </span>
                                            </m.span>
                                            <span className={styles.caption}>
                                                <span className={styles.name}>{p.title}</span>
                                            </span>
                                        </button>
                                    </m.li>
                                ))}
                            </AnimatePresence>
                        </ul>
                    </div>
                </div>

                {/* In <body>, so it covers the menu as well. */}
                {isClient &&
                    createPortal(
                        <AnimatePresence>
                            {project && detail && (
                                <m.div
                                    key="overlay"
                                    ref={overlay}
                                    className={styles.overlay}
                                    role="dialog"
                                    aria-modal="true"
                                    aria-labelledby="project-title"
                                    tabIndex={-1}
                                    onClick={close}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className={styles.view}>
                                        <m.div layoutId={`project-${project.title}`} transition={SPRING.ui} className={styles.photo}>
                                            {detailVideo ? (
                                                <LoadingVideo
                                                    src={detailVideo}
                                                    poster={detail.src}
                                                    aria-label={detail.alt}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                    className={styles.video}
                                                    style={{ objectPosition: detail.position }}
                                                />
                                            ) : (
                                                <LoadingImage
                                                    src={detail.src}
                                                    alt={detail.alt}
                                                    fill
                                                    sizes="(min-width: 768px) 55vw, 100vw"
                                                    className={styles.image}
                                                    style={{ objectPosition: detail.position }}
                                                />
                                            )}
                                        </m.div>

                                        <m.div
                                            className={styles.about}
                                            initial={{ opacity: 0, x: 32 }}
                                            animate={{ opacity: 1, x: 0, transition: { ...SPRING.ui, delay: 0.15 } }}
                                            exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
                                        >
                                            <h2 id="project-title" className={styles.title}>
                                                {project.title}
                                            </h2>
                                            <p className={styles.text}>{project.text}</p>
                                            <p className={styles.hint}>Click anywhere to close</p>
                                        </m.div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>,
                        document.body,
                    )}
            </LayoutGroup>
        </LazyMotion>
    );
}

export default ProjectArchive;

'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
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
}

interface ProjectArchiveProps {
    // The page's h1.
    title: string;
    titleId: string;
    projects: Project[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const ALL = "All";

// True in the browser after hydration, false on the server: the portal needs <body>.
const noSubscribe = () => () => {};
const useIsClient = () => useSyncExternalStore(noSubscribe, () => true, () => false);

// A card's clip: plays only while on screen, so a page of them doesn't decode at once.
function CardVideo({ src, poster }: { src: string; poster: Media }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = ref.current;
        if (!video) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        }, { threshold: 0.25 });
        observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <LoadingVideo
            ref={ref}
            src={src}
            poster={poster.src}
            aria-label={poster.alt}
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
 * The other projects as a grid of cards: category filters and the title with its count
 * on top, then a photo (or a short clip) per project with its name under it. Hovering a
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
    // Numbers stay with their project, whatever the filter.
    const number = (p: Project) => pad(projects.indexOf(p) + 1);

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
    const detail = project ? project.detail ?? project.cover : null;
    const openProject = (p: Project) => (event: MouseEvent<HTMLButtonElement>) => {
        opener.current = event.currentTarget;
        setOpen(p.title);
    };

    return (
        <LayoutGroup>
            <div className={`${section.section} ${styles.archive}`}>
                <div className={section.inner}>
                    <header className={styles.header}>
                        {/* The title between two green guide lines across the whole screen, like the page heroes. */}
                        <div className={styles.band}>
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
                                <sup className={styles.total} aria-label={`${shown.length} projects`}>[{pad(shown.length)}]</sup>
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
                                <motion.li
                                    key={p.title}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={SPRING.ui}
                                >
                                    <button type="button" className={styles.card} onClick={openProject(p)}>
                                        <motion.span layoutId={`project-${p.title}`} transition={SPRING.ui} className={styles.frame}>
                                            {p.video ? (
                                                <CardVideo src={p.video} poster={p.cover} />
                                            ) : (
                                                <LoadingImage
                                                    src={p.cover.src}
                                                    alt={p.cover.alt}
                                                    fill
                                                    sizes="(min-width: 768px) 50vw, 100vw"
                                                    loading="eager"
                                                    className={styles.image}
                                                    style={{ objectPosition: p.cover.position }}
                                                />
                                            )}
                                            <span className={styles.press} aria-hidden="true">Press me</span>
                                        </motion.span>
                                        <span className={styles.caption}>
                                            <span className={styles.category}>[{number(p)}] {p.category}</span>
                                            <span className={styles.name}>{p.title}</span>
                                        </span>
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                </div>
            </div>

            {/* In <body>, so it covers the menu as well. */}
            {isClient && createPortal(
                <AnimatePresence>
                    {project && detail && (
                        <motion.div
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
                                <motion.div layoutId={`project-${project.title}`} transition={SPRING.ui} className={styles.photo}>
                                    {!project.detail && project.video ? (
                                        <LoadingVideo
                                            src={project.video}
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
                                            loading="eager"
                                            className={styles.image}
                                            style={{ objectPosition: detail.position }}
                                        />
                                    )}
                                </motion.div>

                                <motion.div
                                    className={styles.about}
                                    initial={{ opacity: 0, x: 32 }}
                                    animate={{ opacity: 1, x: 0, transition: { ...SPRING.ui, delay: 0.15 } }}
                                    exit={{ opacity: 0, x: 16, transition: { duration: 0.15 } }}
                                >
                                    <p className={styles.count}>[{number(project)}] {project.category}</p>
                                    <h2 id="project-title" className={styles.title}>{project.title}</h2>
                                    <p className={styles.text}>{project.text}</p>
                                    <p className={styles.hint}>Click anywhere to close</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </LayoutGroup>
    );
}

export default ProjectArchive;

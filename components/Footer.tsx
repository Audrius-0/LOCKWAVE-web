'use client';

import { useEffect, useState } from "react";
import LoadingImage from "./LandingPage/LoadingImage";
import LogoMark from "./LandingPage/LogoMark";
import { PressableLink } from "./motion/Pressable";
import styles from "./Footer.module.css";

// Simple placeholder glyphs; swap for official brand icons when the profiles exist.
const SOCIAL = [
    {
        label: "LinkedIn",
        icon: (
            <>
                <rect x="3" y="9" width="4" height="12" />
                <circle cx="5" cy="4.5" r="2" />
                <path d="M10 9h4v2c.8-1.4 2.2-2.3 4-2.3 2.6 0 4 1.7 4 4.8V21h-4v-7c0-1.4-.6-2.2-1.8-2.2S14 12.6 14 14v7h-4z" />
            </>
        ),
    },
    {
        label: "Instagram",
        icon: (
            <>
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.3" cy="6.7" r="1.2" />
            </>
        ),
    },
    {
        label: "YouTube",
        icon: <path d="M3 7.5C3 5.6 4.6 4 6.5 4h11C19.4 4 21 5.6 21 7.5v9c0 1.9-1.6 3.5-3.5 3.5h-11C4.6 20 3 18.4 3 16.5zM10 8.5v7l6-3.5z" fillRule="evenodd" />,
    },
];

function Footer() {
    const [showPhoto, setShowPhoto] = useState(false);

    /*
     * The footer sits pinned under the page from the first frame, so its photo would
     * download straight away and count as the page's largest paint while nobody can
     * see it. Load it once the reader is within 1.5 screens of the end instead.
     */
    useEffect(() => {
        const nearEnd = () => {
            const remaining = document.documentElement.scrollHeight - window.scrollY - window.innerHeight;
            if (remaining < window.innerHeight * 1.5) {
                setShowPhoto(true);
                window.removeEventListener("scroll", nearEnd);
            }
        };
        const frame = requestAnimationFrame(nearEnd);
        window.addEventListener("scroll", nearEnd, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", nearEnd);
        };
    }, []);

    // Shown beside the logo on phones and under "Get in touch" from tablets; the hidden copy is display: none.
    const social = (
        <>
            <p className={styles.heading}>Social</p>
            <ul className={styles.social}>
                {SOCIAL.map((item) => (
                    <li key={item.label}>
                        <PressableLink href="#" className={styles.socialLink} aria-label={item.label}>
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{item.icon}</svg>
                        </PressableLink>
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.media}>
                    {showPhoto && (
                        <LoadingImage
                            src="/new/DSC_6579.JPG"
                            alt=""
                            fill
                            sizes="90vw"
                            className={styles.mediaImage}
                        />
                    )}
                </div>

                <div className={styles.panel}>
                    <div className={styles.brandColumn}>
                        {/* Phones: the social links sit to the right of the logo. */}
                        <div className={styles.brandRow}>
                            <a href="#top" className={styles.brand} aria-label="Lockwave Systems, back to top">
                                <LogoMark className={styles.brandMark} />
                            </a>
                            <div className={styles.socialNarrow}>{social}</div>
                        </div>

                        <p className={styles.copyright}>© {new Date().getFullYear()} Lockwave Systems</p>
                    </div>

                    <div className={styles.columns}>
                        <div className={styles.column}>
                            <p className={styles.heading}>Email</p>
                            <a href="mailto:lockwave.systems@gmail.com" className={styles.link}>lockwave.systems@gmail.com</a>

                            {/* The incubator we belong to, linking to its official (English) site. */}
                            <div className={`${styles.incubator} ${styles.spaced}`}>
                                <p className={styles.incubatorLabel}>Incubated by</p>
                                <a
                                    href="https://startupspace-en.ktu.edu/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.incubatorLogo}
                                    aria-label="KTU Startup Space (opens in a new tab)"
                                >
                                    {/* A stand-in drawn from the KTU Startup Space logo; swap in the official file when available. */}
                                    <span className={styles.ktuSun} aria-hidden="true" />
                                    <span className={styles.ktuSpark} aria-hidden="true">✦</span>
                                    <span className={styles.ktuWords} aria-hidden="true">
                                        <span className={styles.ktuSmall}>ktu</span>
                                        <span className={styles.ktuBig}>STARTUP</span>
                                        <span className={styles.ktuSpace}>space</span>
                                    </span>
                                </a>
                                <p className={styles.incubatorText}>Member of the KTU Startup Space incubator.</p>
                            </div>
                        </div>

                        <div className={`${styles.column} ${styles.wide}`}>
                            <p className={styles.heading}>Get in touch</p>
                            <p className={styles.text}>
                                Questions about our work or want to work with us? We are happy to talk it through.
                            </p>

                            <div className={`${styles.spaced} ${styles.socialWide}`}>{social}</div>
                        </div>
                    </div>
                </div>
            </footer>

            {/*
              * Target for "Contact us" links. It sits after the footer, not inside it:
              * on tablet and up the footer is fixed, so a link to it would not scroll at all.
              * This marker is always the last thing on the page.
              */}
            <span id="page-end" />
        </>
    );
}

export default Footer;

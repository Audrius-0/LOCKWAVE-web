'use client';

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import Menu from "./Menu";
import Footer from "./Footer";
import styles from "./PageShell.module.css";

/*
 * The frame every page shares: design tokens, menu and the
 * footer that <main> scrolls away to reveal. The page's content goes in children.
 */
function PageShell({ children }: { children: ReactNode }) {
    return (
        // The light `m` components with just the features the pages use (fades, rises,
        // wipes), about 12 KB less than the full `motion` bundle on every page. strict:
        // nothing may pull the full bundle back in. Other Projects adds layout animations.
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <div id="top" className={styles.page}>
                    <Menu />
                    <main className={styles.main}>{children}</main>
                    <Footer />
                </div>
            </MotionConfig>
        </LazyMotion>
    );
}

export default PageShell;

'use client';

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import Menu from "./Menu";
import SideContact from "./SideContact";
import Footer from "./Footer";
import styles from "./PageShell.module.css";

/*
 * The frame every page shares: design tokens, menu, side contact tab and the
 * footer that <main> scrolls away to reveal. The page's content goes in children.
 */
function PageShell({ children }: { children: ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <div id="top" className={styles.page}>
                <Menu />
                <SideContact />
                <main className={styles.main}>{children}</main>
                <Footer />
            </div>
        </MotionConfig>
    );
}

export default PageShell;

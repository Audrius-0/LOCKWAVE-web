'use client';

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import ArrowIcon from "./ArrowIcon";
import { RevealItem } from "./motion/Reveal";
import { SPRING } from "./motion/springs";
import styles from "./Menu.module.css";

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/usecases", label: "Use Cases" },
    { href: "/team", label: "Team" },
];

const SECONDARY_LINKS = [
    { href: "/otherProjects", label: "Other Projects" },
    { href: "/rnd", label: "R&D" },
    { href: "/awards", label: "Awards" },
];

// The contacts in the footer, at the very end of the home page.
const CONTACT_LINK = { href: "/#page-end", label: "Contact us" };

const PHONE_QUERY = "(max-width: 639px)";


const PANEL: Variants = {
    hidden: { opacity: 0, y: -16, transition: SPRING.ui },
    shown: { opacity: 1, y: 0, transition: { ...SPRING.ui, staggerChildren: 0.05, delayChildren: 0.05 } },
};

/*
 * A top-row link's text, one span per letter. On press each letter slides out from the
 * word's centre by its distance from it (--o), so the word spreads evenly to both sides.
 * Only transforms move, so the link keeps its width and the motion stays smooth.
 */
function ItemLabel({ text }: { text: string }) {
    const middle = (text.length - 1) / 2;
    return (
        <span className={styles.itemLabel}>
            {[...text].map((char, i) => (
                <span key={i} className={styles.letter} style={{ "--o": i - middle } as CSSProperties}>
                    {char}
                </span>
            ))}
        </span>
    );
}

function Menu (){
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const burger = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const html = document.documentElement;
        const previousOverflow = html.style.overflow;
        const phone = window.matchMedia(PHONE_QUERY);
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== "Escape") return;
            setOpen(false);
            burger.current?.focus();
        };
        const onResize = () => !phone.matches && setOpen(false);

        // The page behind the open panel should not scroll.
        html.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        phone.addEventListener("change", onResize);
        return () => {
            html.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
            phone.removeEventListener("change", onResize);
        };
    }, [open]);

    /*
     * A link to the page we are already on scrolls here instead of navigating (smooth,
     * from globals.css): to its #hash (Next's Link does not scroll again when the address
     * already ends in it, so a second click on Contact us did nothing), or else back to
     * the top of the page. Waits a frame so the phone panel has released its scroll
     * lock first. Ctrl/Cmd/Shift-clicks (new tab or window) are left to the browser.
     */
    const followLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
        setOpen(false);
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const [path, hash] = href.split("#");
        if (path !== pathname) return;
        event.preventDefault();
        requestAnimationFrame(() => {
            if (hash) document.getElementById(hash)?.scrollIntoView();
            else window.scrollTo({ top: 0 });
        });
    };

    return (
        <nav className={styles.nav} aria-label="Main">
            {/* Tablet and desktop: one row of links, Other Projects included. */}
            <ul className={styles.list}>
                {[...LINKS, ...SECONDARY_LINKS].map((link) => {
                    const current = pathname === link.href;
                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`${styles.item} ${current ? styles.active : ""}`}
                                aria-current={current ? "page" : undefined}
                                onClick={(event) => followLink(event, link.href)}
                            >
                                <ItemLabel text={link.label} />
                            </Link>
                        </li>
                    );
                })}
                <li className={styles.contactItem}>
                    <Link
                        href={CONTACT_LINK.href}
                        className={styles.item}
                        onClick={(event) => followLink(event, CONTACT_LINK.href)}
                    >
                        <ItemLabel text={CONTACT_LINK.label} />
                    </Link>
                    {/* The Lithuanian flag: yellow, green and red stripes, 3:5. */}
                    <svg className={styles.flag} viewBox="0 0 5 3" role="img" aria-label="Lithuania">
                        <rect width="5" height="1" fill="#FDB913" />
                        <rect y="1" width="5" height="1" fill="#006A44" />
                        <rect y="2" width="5" height="1" fill="#C1272D" />
                    </svg>
                </li>
            </ul>

            {/* Phones: a burger button that opens the panel below. */}
            <div className={styles.phoneBar}>
                <button
                    ref={burger}
                    type="button"
                    className={styles.burger}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    aria-controls={open ? "phone-menu" : undefined}
                    data-open={open || undefined}
                    onClick={() => setOpen((value) => !value)}
                >
                    <span className={styles.burgerIcon} aria-hidden="true" />
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="phone-menu"
                        className={styles.panel}
                        variants={PANEL}
                        initial="hidden"
                        animate="shown"
                        exit="hidden"
                    >
                        <ul className={styles.panelList}>
                            {[...LINKS, CONTACT_LINK].map((link) => {
                                const current = pathname === link.href;
                                return (
                                    <RevealItem as="li" key={link.href}>
                                        <Link
                                            href={link.href}
                                            className={`${styles.panelLink} ${current ? styles.active : ""}`}
                                            aria-current={current ? "page" : undefined}
                                            onClick={(event) => followLink(event, link.href)}
                                        >
                                            {link.label}
                                            <ArrowIcon className={styles.panelArrow} />
                                        </Link>
                                    </RevealItem>
                                );
                            })}
                        </ul>
                        <RevealItem className={styles.panelFooter}>
                            {SECONDARY_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={styles.panelCta}
                                    onClick={(event) => followLink(event, link.href)}
                                >
                                    <ArrowIcon className={styles.panelCtaArrow} />
                                    {link.label}
                                </Link>
                            ))}
                        </RevealItem>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Menu;

import type { ReactNode } from "react";
import ArrowIcon from "./ArrowIcon";
import { PressableLink } from "./motion/Pressable";
import section from "./LandingPage/Section.module.css";

interface ArrowLinkProps {
    href: string;
    children: ReactNode;
    // pill: the round filled button; box: the square white button; text: a plain arrow link.
    variant?: "pill" | "box" | "text";
}

const VARIANT_CLASS = {
    pill: section.pill,
    box: section.box,
    text: section.arrowLink,
};

function ArrowLink({ href, children, variant = "text" }: ArrowLinkProps) {
    return (
        <PressableLink href={href} className={VARIANT_CLASS[variant]}>
            <ArrowIcon className={section.arrow} />
            {children}
        </PressableLink>
    );
}

export default ArrowLink;

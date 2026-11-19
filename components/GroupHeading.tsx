import type { ReactNode } from "react";
import { Reveal } from "./motion/Reveal";
import styles from "./GroupHeading.module.css";

interface GroupHeadingProps {
    // Anchor, so a button can jump to the group (e.g. #radios).
    id: string;
    children: ReactNode;
    // Straight after a white-line band, which already gives the space above.
    afterDivider?: boolean;
}

/*
 * A big signpost word in the site's heavy title letters, centred above the group it
 * names (Pulse, RADIOS). The anchor sits on a still wrapper: the word rises in, and a jump
 * measured mid-rise would land it under the menu.
 */
function GroupHeading({ id, children, afterDivider = false }: GroupHeadingProps) {
    return (
        <div id={id} className={styles.anchor}>
            <Reveal as="h2" className={`${styles.heading} ${afterDivider ? styles.afterDivider : ""}`}>
                {children}
            </Reveal>
        </div>
    );
}

export default GroupHeading;

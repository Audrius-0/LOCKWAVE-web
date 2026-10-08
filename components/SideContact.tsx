import { PressableLink } from "./motion/Pressable";
import styles from "./SideContact.module.css";

// Always-visible contact tab on the right edge; the label slides out on hover.
function SideContact() {
    return (
        <PressableLink href="#page-end" className={styles.tab}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <rect x="2.5" y="5" width="19" height="14" />
                <path d="M2.5 5.5l9.5 7.5 9.5-7.5M2.5 18.5l7-6.5M21.5 18.5l-7-6.5" />
            </svg>
            <span className={styles.label}>Contact us</span>
        </PressableLink>
    );
}

export default SideContact;

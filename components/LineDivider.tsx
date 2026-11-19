import { Reveal } from "./motion/Reveal";
import styles from "./LineDivider.module.css";

// A band of page colour with a white line across it, setting one group apart from the next.
function LineDivider() {
    return (
        <div className={styles.divider} aria-hidden="true">
            {/* The line rises in like the site's guide lines. */}
            <Reveal className={styles.line} />
        </div>
    );
}

export default LineDivider;

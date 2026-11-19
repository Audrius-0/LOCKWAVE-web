import { RevealGroup, RevealItem } from "../motion/Reveal";
import section from "../LandingPage/Section.module.css";
import styles from "./Advantages.module.css";

export interface Advantage {
    title: string;
    text: string;
}

interface AdvantagesProps {
    id: string;
    // Small grey label above the title, e.g. the product line.
    label: string;
    title: string;
    lead: string;
    points: Advantage[];
}

// A product line's advantages: a short lead, then the points under green rules.
function Advantages({ id, label, title, lead, points }: AdvantagesProps) {
    return (
        <section id={id} className={`${section.section} ${styles.intro}`} aria-labelledby={`${id}-title`}>
            <div className={section.inner}>
                <RevealGroup className={section.bordered}>
                    <RevealItem as="p" className={styles.label}>{label}</RevealItem>
                    <RevealItem as="h2" id={`${id}-title`} className={section.title}>{title}</RevealItem>
                    <RevealItem as="p" className={`${section.lead} ${styles.lead}`}>{lead}</RevealItem>
                </RevealGroup>

                <RevealGroup as="ul" className={styles.points} stagger={0.1}>
                    {points.map((point) => (
                        <RevealItem as="li" key={point.title} className={styles.point}>
                            <h3 className={styles.pointTitle}>{point.title}</h3>
                            <p className={styles.pointText}>{point.text}</p>
                        </RevealItem>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}

export default Advantages;

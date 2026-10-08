import ArrowLink from "../ArrowLink";
import CurtainImage from "./CurtainImage";
import { RevealGroup, RevealItem } from "../motion/Reveal";
import section from "./Section.module.css";
import styles from "./WhoAreWe.module.css";

// Demo copy: replace with real text before launch.
const FACTS = [
    { label: "Our focus:", text: "resilient, off-grid communication for teams in the field who need reliable audio, text, GPS, sensor data and remote activation in one mesh based system." },
    { label: "Where we are:", text: "Lithuania." },
];

function WhoAreWe() {
    return (
        <section id="about" className={section.section} aria-labelledby="about-title">
            <div className={`${section.inner} ${section.bordered}`}>
                <div className={styles.grid}>
                    <RevealGroup className={styles.intro}>
                        <RevealItem as="h3" id="about-title" className={section.title}>WHO ARE WE?</RevealItem>
                        <RevealItem as="p" className={`${section.lead} ${styles.lead}`}>
                            We are a small hardware team building radios that keep communication running when the usual networks go quiet.
                        </RevealItem>
                    </RevealGroup>

                    <CurtainImage
                        src="/new/DSC_6563.JPG"
                        alt="Anemo mini node standing next to a phone running the Lockwave app"
                        sizes="(max-width: 767px) 100vw, 1280px"
                        className={styles.media}
                        imageClassName={styles.mediaImage}
                    />

                    <RevealGroup className={styles.details} delay={0.1}>
                        <RevealItem className={styles.facts}>
                            {FACTS.map((fact) => (
                                <p key={fact.label} className={section.body}>
                                    <strong className={styles.factLabel}>{fact.label}</strong> {fact.text}
                                </p>
                            ))}
                        </RevealItem>
                        <RevealItem className={styles.action}>
                            <ArrowLink href="/products" variant="pill">Our Products</ArrowLink>
                        </RevealItem>
                    </RevealGroup>
                </div>
            </div>
        </section>
    )
}

export default WhoAreWe;

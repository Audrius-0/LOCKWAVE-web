import ArrowLink from "../ArrowLink";
import { RevealGroup, RevealItem } from "../motion/Reveal";
import section from "./Section.module.css";
import styles from "./Contact.module.css";

function Contact() {
    return (
        <section id="contact" className={section.section} aria-labelledby="contact-title">
            <RevealGroup className={`${section.inner} ${section.bordered} ${section.split}`} stagger={0.15}>
                <RevealItem className={`${section.splitLeft} ${styles.column}`}>
                    <h2 className={`${section.title} ${styles.title} ${styles.accentTitle}`}>Interested in our skills?</h2>
                    <ArrowLink href="/rnd" variant="pill">Explore R&D options with us</ArrowLink>
                </RevealItem>

                <RevealItem className={`${section.splitRight} ${styles.column} ${styles.second}`}>
                    <h2 id="contact-title" className={`${section.title} ${styles.title}`}>Get in touch</h2>
                    <p className={`${section.lead} ${styles.lead}`}>
                        Planning a deployment, looking for a demo unit or just curious? Send us a message and we will get back to you.
                    </p>
                    <ArrowLink href="#page-end" variant="pill">Contact us</ArrowLink>
                </RevealItem>
            </RevealGroup>
        </section>
    );
}

export default Contact;

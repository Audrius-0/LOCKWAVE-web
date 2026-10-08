import ArrowLink from '../ArrowLink';
import { RevealGroup, RevealItem } from '../motion/Reveal';
import { WipeText } from '../motion/WipeText';
import section from './Section.module.css';
import styles from './UseCases.module.css';

function UseCases () {
    return (
        <section id="capabilities" className={section.section} aria-labelledby="capabilities-title">
            <div className={section.inner}>
                <RevealGroup className={`${section.bordered} ${section.split} ${styles.head}`}>
                    <RevealItem className={section.splitRight}>
                        <h3 id="capabilities-title" className={section.title}>WHERE WE ARE RELEVANT?</h3>
                    </RevealItem>
                </RevealGroup>

                <RevealGroup className={section.split}>
                    <div className={`${section.splitLeft} ${styles.spacer}`} aria-hidden="true" />
                    <RevealItem className={section.splitRight}>
                        <p className={`${section.body} ${styles.intro}`}>
                            Special forces, army units, search and rescue teams, and other professionals who need to stay in touch when they <WipeText className={styles.accent}>need more than just standard voice communication</WipeText>. Our radios are designed to be rugged, reliable, and easy to use in the field.
                        </p>
                        <ArrowLink href="/usecases" variant="pill">More about use cases</ArrowLink>
                    </RevealItem>
                </RevealGroup>
            </div>
        </section>
    )
}

export default UseCases;

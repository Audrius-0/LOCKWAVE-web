import LoadingImage from './LoadingImage';
import ScrambleText from './ScrambleText';
import { Reveal } from '../motion/Reveal';
import styles from './MainInfo.module.css';

const SRC = '/new/DSC_6601.JPG';

/*
 * The home page's opening screen: the Honeycomb photo across the whole first screen,
 * green guide lines over it, a short tagline top left and the name in huge black
 * letters along the bottom edge.
 */
function MainInfo () {
    return (
        <section className={styles.hero} aria-labelledby="hero-title">
            <Reveal variant="fade" trigger="load" className={styles.photo}>
                {/* Wide screens: a blurred copy fills the sides around the upright photo. */}
                <div className={styles.backdrop} aria-hidden="true">
                    <LoadingImage src={SRC} alt="" fill sizes="10vw" loading="eager" className={styles.image} />
                </div>
                <div className={styles.front}>
                    <LoadingImage
                        src={SRC}
                        alt="Lockwave Honey Comb node with two antennas against a pale wall"
                        fill
                        sizes="(min-width: 640px) 45vw, 100vw"
                        preload
                        className={styles.image}
                    />
                </div>
            </Reveal>

            <div className={styles.shade} aria-hidden="true" />

            <div className={styles.guides} aria-hidden="true">
                <span /><span /><span /><span /><span />
            </div>

            <Reveal as="p" trigger="load" delay={0.1} className={styles.tagline}>
                Advanced mesh radio hardware.<br />
                Engineered in Lithuania.<br />
                Proven in the field.
            </Reveal>

            {/* No entrance motion: the letters just scramble in where they stand. */}
            <div className={styles.markWrap}>
                <h1 id="hero-title" className={styles.mark}>
                    <span className={styles.srOnly}>Lockwave Systems</span>
                    {/* Your scramble-in and glitch, the flickering letters in white against the black. */}
                    <span className={styles.word} aria-hidden="true">
                        <ScrambleText text="Lockwave" glitchColor="var(--lw-text, #f2f3ec)" />
                    </span>
                    <span className={styles.tm} aria-hidden="true">Systems</span>
                </h1>
            </div>
        </section>
    )
}

export default MainInfo;

import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import SplitHero from "@/components/SplitHero";
import ScrambleText from "@/components/LandingPage/ScrambleText";
import ArrowLink from "@/components/ArrowLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import section from "@/components/LandingPage/Section.module.css";
import hero from "@/components/SplitHero.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "R&D | Lockwave Systems",
};

// The skills we bring to a project, in general terms.
const CAPABILITIES = [
  {
    title: "Electronics & PCB design",
    text: "Schematics, board layout and in-house fabrication, from a first sketch to a working board.",
  },
  {
    title: "Embedded software & apps",
    text: "Firmware for microcontrollers and radios, and the apps that connect people to their hardware and its data.",
  },
  {
    title: "Wireless & mesh networking",
    text: "Radio links, mesh protocols and encryption for systems that keep talking without any infrastructure.",
  },
  {
    title: "Power & electric drives",
    text: "Batteries, power management and motor control for devices and vehicles of any size.",
  },
  {
    title: "Autonomy, AI & sensing",
    text: "Sensors, computer vision and control that let systems understand their surroundings and act on their own.",
  },
  {
    title: "Prototyping & field testing",
    text: "Fast iterations with 3D-printed parts and hand-built boards, then testing outdoors in real conditions.",
  },
];

// The headline, one line each.
const HEADLINE = ["Your idea?", "Our skills.", "Let's build."];

// Only these words glitch now and then; the rest of the headline stays still.
const GLITCHING = new Set(["Your", "skills.", "Let's"]);

function RndPage() {
  return (
    <PageShell>
      <SplitHero
        titleId="rnd-title"
        // public/r&d/Timeline 1.mp4 ("&" and the space written as %26 and %20 in the address)
        src="/r%26d/Timeline%201.mp4"
        video
        alt="A circuit board being cut by a laser"
        label={<>Research<br />&amp;<br />development</>}
        heading={
          <h1 id="rnd-title" className={hero.title}>
            {/* Screen readers get the real headline, not the flickering letters. */}
            <span className={hero.srOnly}>{HEADLINE.join(" ")}</span>
            {/* Rises in with the hero; then now and then a letter of YOUR, SKILLS or LET'S glitches. */}
            <span aria-hidden="true">
              {HEADLINE.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line.split(" ").map((word, j) => (
                    <span key={word}>
                      {j > 0 && " "}
                      {GLITCHING.has(word) ? <ScrambleText text={word} scrambleIn={false} /> : word}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
        }
        note={<>Powered by engineers.<br /></>}
        cta={<ArrowLink href="#page-end" variant="box">Start a project</ArrowLink>}
      />

      <section className={`${section.section} ${styles.capabilities}`} aria-labelledby="capabilities-title">
        <div className={section.inner}>
          <RevealGroup className={section.bordered}>
            <RevealItem as="p" className={styles.sectionLabel}>Capabilities</RevealItem>
            <RevealItem as="h2" id="capabilities-title" className={section.title}>From idea to working hardware</RevealItem>
          </RevealGroup>

          <RevealGroup as="ol" className={styles.list} stagger={0.1}>
            {CAPABILITIES.map((item, i) => (
              <RevealItem as="li" key={item.title} className={styles.item}>
                <div className={styles.itemHead}>
                  <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                </div>
                <p className={section.body}>{item.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className={styles.closing}>
            <ArrowLink href="#page-end" variant="box">Contact us</ArrowLink>
            <ArrowLink href="/otherProjects" variant="box">Our other projects</ArrowLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export default RndPage;

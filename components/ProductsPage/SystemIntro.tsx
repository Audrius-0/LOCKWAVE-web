import { RevealGroup, RevealItem } from "../motion/Reveal";
import section from "../LandingPage/Section.module.css";
import styles from "./SystemIntro.module.css";

const POINTS = [
    {
        title: "Encryption",
        text: "Encryption protects every sent packet, and checks that nothing was altered on the way.",
    },
    {
        title: "Mesh / MANET",
        text: "Every device relays for the others, so coverage grows with the group and holds up in difficult terrain.",
    },
    {
        title: "No infrastructure",
        text: "Works without cell towers or internet, wherever the group goes.",
    },
    {
        title: "Data transmission",
        text: "Voice, GPS coordinates, preset commands, messages and sensor data travel over the same network.",
    },
    {
        title: "Sensors and remote control",
        text: "External sensors connect to the network, and devices can be activated remotely.",
    },
    {
        title: "Phone connection",
        text: "Over Bluetooth, the radio extends the mesh to a phone as a MANET; with a phone, the Mini works as a standard radio.",
    },
];

// What the products have in common, as short advantages: between the Products hero and the two products.
function SystemIntro() {
    return (
        <section id="advantages" className={`${section.section} ${styles.intro}`} aria-labelledby="system-title">
            <div className={section.inner}>
                <RevealGroup className={section.bordered}>
                    <RevealItem as="p" className={styles.label}>The system</RevealItem>
                    <RevealItem as="h2" id="system-title" className={section.title}>Advantages</RevealItem>
                    <RevealItem as="p" className={`${section.lead} ${styles.lead}`}>
                        We are building an infrastructure-free mesh radio system where every device relays for
                        the others, keeping a group connected without cell towers or internet.
                    </RevealItem>
                </RevealGroup>

                <RevealGroup as="ul" className={styles.points} stagger={0.1}>
                    {POINTS.map((point) => (
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

export default SystemIntro;

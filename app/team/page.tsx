import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import TeamGrid from "@/components/TeamGrid";
import type { Member } from "@/components/TeamGrid";
import ArrowLink from "@/components/ArrowLink";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import section from "@/components/LandingPage/Section.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Team | Lockwave Systems",
};

// Top row Kipras, Audrius, Domantas; Aidas and Ugnius below. Add `linkedin: "https://…"` to show a LinkedIn link.
const MEMBERS: Member[] = [
  {
    name: "Kipras Petrauskas",
    email: "kipras@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/kipras-petrauskas-b704a5386/",
    role: "Electronics & hardware",
    bio: "Leads electronics and 3D printing; led the electronics team at ESA CanSat Lithuania.",
    photo: "/team/Kipras.jpg",
  },
  {
    name: "Audrius Raišutis",
    email: "audrius@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/audrius-rai%C5%A1utis-a4a526378/",
    mobileRight: true,
    role: "Software",
    bio: "Builds the encryption, data transmission and web tooling of the mesh.",
    photo: "/team/Audrius.jpg",
  },
  {
    name: "Domantas Valinčius",
    email: "domantas@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/domantas-valin%C4%8Dius-25915a348/",
    role: "Full-stack & telemetry",
    bio: "ESA CanSat 2025 winner; builds the full-stack platform and live telemetry.",
    photo: "/team/Domantas.jpg",
  },
  {
    name: "Aidas Laurišas",
    mobileRight: true,
    email: "aidas@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/aidas-l-35815b379/",
    role: "Mechanical design",
    bio: "3D modelling and mechanical design: enclosures, mounts and prototypes.",
    photo: "/team/Aidas.jpg",
  },
  {
    name: "Ugnius Bartnikas",
    email: "ugnius@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/ugnius-bartnikas-72549b38a/",
    role: "Research & strategy",
    bio: "Market research, cost modelling and the commercial case behind each decision.",
    photo: "/team/Ugnius.jpg",
  },
].map((member) => ({ ...member, alt: `Portrait of ${member.name}` }));

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        id="team-title"
        title="Team"
        titleClassName={styles.heroTitle}
        src="/team/team-video.mp4"
        video
        tone="dark"
        alt="The Lockwave team at work"
      />

      <section className={`${section.section} ${styles.team}`} aria-labelledby="people-title">
        <div className={section.inner}>
          <RevealGroup className={section.bordered}>
            <RevealItem as="p" className={styles.label}>Team</RevealItem>
            <RevealItem as="h2" id="people-title" className={section.title}>The people behind Lockwave</RevealItem>
            <RevealItem as="p" className={`${section.lead} ${styles.intro}`}>
              A small team of engineers from Lithuania, building radios that keep people connected when the usual networks go quiet.
            </RevealItem>
          </RevealGroup>

          <TeamGrid members={MEMBERS} />

          <Reveal className={styles.cta}>
            <h2 className={`${section.title} ${styles.ctaTitle}`}>Want to build with us?</h2>
            <ArrowLink href="#page-end" variant="pill">Contact us</ArrowLink>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}

export default TeamPage;

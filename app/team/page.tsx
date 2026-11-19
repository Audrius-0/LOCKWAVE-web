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
    role: "Electronic engineer",
    bio: "Designs Lockwave's electronics and 3D-printed parts; led the electronics team at ESA CanSat Lithuania.",
    photo: "/team/Kipras.jpg",
  },
  {
    name: "Audrius Raišutis",
    email: "audrius@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/audrius-rai%C5%A1utis-a4a526378/",
    mobileRight: true,
    role: "Firmware & cryptography",
    bio: "Informatics Engineering student at KTU. Works on firmware and embedded C++, wireless communication systems, cryptography and web development.",
    photo: "/team/Audrius.jpg",
  },
  {
    name: "Domantas Valinčius",
    email: "domantas@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/domantas-valin%C4%8Dius-25915a348/",
    role: "Embedded systems & mesh networks",
    bio: "Informatics Engineering student. Works on embedded systems, mesh networking, schematic and hardware prototyping, and software in C++, C# and Python.",
    photo: "/team/Domantas.jpg",
  },
  {
    name: "Aidas Laurišas",
    mobileRight: true,
    email: "aidas@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/aidas-l-35815b379/",
    role: "Senior project manager",
    bio: "Manages Lockwave's projects, keeping each build on plan from the first sketch to the finished prototype.",
    photo: "/team/Aidas.jpg",
  },
  {
    name: "Ugnius Bartnikas",
    email: "ugnius@lockwave.systems",
    linkedin: "https://www.linkedin.com/in/ugnius-bartnikas-72549b38a/",
    role: "3D generalist & video editor",
    bio: "Turns LockWave’s hardware into visuals. Handles 3D modelling, product renders, animation and video editing, making our radios and builds easy to see and understand.",
    photo: "/team/Ugnius2.jpg",
  },
].map((member) => ({ ...member, alt: `Portrait of ${member.name}` }));

function TeamPage() {
  return (
    <PageShell>
      <PageHero
        id="team-title"
        title="Team"
        titleClassName={styles.heroTitle}
        src="/team/team-video-hd.mp4"
        video
        poster="/team/team-video-hd-poster.webp"
        tone="dark"
        alt="The Lockwave team at work"
      />

      <section className={`${section.section} ${styles.team}`} aria-labelledby="people-title">
        <div className={section.inner}>
          <RevealGroup className={section.bordered}>
            <RevealItem as="p" className={styles.label}>Team</RevealItem>
            <RevealItem as="h2" id="people-title" className={section.title}>The people behind Lockwave</RevealItem>
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

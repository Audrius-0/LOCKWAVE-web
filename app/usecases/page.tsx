import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import AlternatingBlocks from "@/components/AlternatingBlocks";
import type { Block } from "@/components/AlternatingBlocks";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Use Cases | Lockwave Systems",
};

// Demo copy for now.
const USE_CASES: Block[] = [
  {
    image: "/usecases/honeycomb_stump_hero.jpg",
    alt: "Anemo Honeycomb node set up in a forest clearing, with a cable plugged in",
    // Keep the node and its antennas in frame when the photo is cropped.
    position: "40% 60%",
    label: "Data relay",
    title: "More than voice",
    text: "Our devices relay a wide range of data: GPS positions, sensor readings, messages and control commands. Leave a node out in the field and everything it gathers or receives travels on through the mesh, device to device, with no network needed.",
  },
  {
    // The same node on a log at night, powered by a different battery pack in each photo.
    image: [1, 2, 3, 4, 5].map((n) => `/usecases/honeycomb_battery_0${n}.jpg`),
    alt: "Anemo Honeycomb node on a log at night, powered by an FPV drone battery",
    // Keep the battery and the node in frame when the photo is cropped.
    position: "50% 60%",
    label: "Power in the field",
    title: "Runs on drone batteries",
    text: "No special charger or battery to carry. In the field you can power the device with the most popular FPV drone batteries, so a spare pack from the drone kit keeps the network running.",
  },
  {
    // The same node on a tree stump, with a different antenna in each photo.
    image: [1, 2, 3, 4, 5, 6].map((n) => `/usecases/honeycomb_antenna_0${n}.jpg`),
    alt: "Anemo Honeycomb node on a tree stump, fitted with a different antenna in each photo",
    // Keep the node and the antenna tips in frame when the photo is cropped.
    position: "45% 40%",
    label: "Range",
    title: "Need more range? No problem.",
    text: "You can easily attach any antenna you need, depending on the situation: a short one to stay compact on the move, a longer one to reach further when it counts.",
  },
  {
    image: "/usecases/honeycomb_backpack_detail.jpg",
    alt: "Anemo Honeycomb node strapped to a backpack, with a cable plugged in",
    // Keep the node and its antennas in frame when the photo is cropped.
    position: "50% 40%",
    label: "Field teams",
    title: "Tactical expeditions",
    text: "A small, light communication device that straps to a backpack and goes wherever the team does. Pair it with a smartphone and it is ready to use: messages hop from person to person with no network needed, and the battery lasts for days in the field.",
  },
];

function UseCasesPage() {
  return (
    <PageShell>
      <PageHero
        id="usecases-title"
        title="Use cases"
        tone="dark"
        src="/usecases/04a_drone_focus.png"
        alt="An Anemo Honeycomb node on a table in the foreground, with a drone flying over the field behind it"
        imageClassName={styles.image}
        titleClassName={styles.title}
        contentClassName={styles.heroContent}
      />
      <AlternatingBlocks blocks={USE_CASES} />
    </PageShell>
  );
}

export default UseCasesPage;

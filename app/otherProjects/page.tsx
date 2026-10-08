import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ProjectArchive from "@/components/ProjectArchive";
import type { Project } from "@/components/ProjectArchive";

export const metadata: Metadata = {
  title: "Other Projects | Lockwave Systems",
};

const DIR = "/other_projects";

/*
 * Each project: the card's photo (`cover`, or the poster of a `video` that plays in the
 * card), and the other photo shown with the text when it is opened (`detail`; without
 * one, the card's video plays again, or its photo shows again).
 */
const PROJECTS: Project[] = [
  {
    title: "Self-driving drift car",
    category: "Vehicles",
    text: "A small RC car that steers itself and holds a controlled drift through the corners, no driver needed. The clip is the view from its own camera.",
    video: `${DIR}/drift-car.mp4`,
    cover: { src: `${DIR}/drift-car-poster.jpg`, alt: "The view from the self-driving car's own camera, low over the pavement" },
    detail: { src: `${DIR}/20260724_171601.jpg`, alt: "The self-driving drift car on a desk, its electronics and wiring open" },
  },
  {
    title: "Electric sled",
    category: "Vehicles",
    text: "A Snow Racer sled with an electric drive of its own, built to pull across the snow on battery power. Here we wire up its controls and the display on the steering wheel.",
    video: `${DIR}/electric-sled.mp4`,
    cover: { src: `${DIR}/electric-sled-poster.jpg`, alt: "Wiring the electric sled's steering wheel and its lit control display on the workbench" },
  },
  {
    title: "AI night-vision goggles",
    category: "Hardware",
    text: "Goggles that use AI to bring out what the eye misses in the dark: infrared cameras on the front, a screen and lenses inside, and buttons on the side to switch modes.",
    cover: { src: `${DIR}/1789682262971.png`, alt: "The AI night-vision goggles from the front: infrared cameras on a screen board in a 3D-printed frame" },
    detail: { src: `${DIR}/1789682263369.png`, alt: "The AI night-vision goggles from behind: the headset lenses, wiring and three control buttons" },
  },
  {
    title: "Electricity management app",
    category: "Software",
    text: "LockWave EnergySmart: an app that tracks electricity use and shows it in euros, not kilowatt-hours and complicated charts. We pitched it at Kaunas Technology Park.",
    cover: { src: `${DIR}/653712829_1608164434651808_5392678024280425232_n.jpg`, alt: "Two team members pitching the electricity app on stage at Kaunas Technology Park" },
    detail: { src: `${DIR}/653714475_1608164397985145_8262817395022697990_n.jpg`, alt: "The LockWave EnergySmart app: sign-in and electricity plan screens" },
  },
  {
    title: "PCB making with a laser",
    category: "Hardware",
    text: "Making our own circuit boards in-house: the laser traces the copper straight from the board layout, so a new board is ready the same day.",
    cover: { src: `${DIR}/laser-pcb.jpg`, alt: "A laser tracing copper tracks on a circuit board inside the cutter", position: "50% 52%" },
    detail: { src: `${DIR}/laser-pcb-layout.jpg`, alt: "The board's track layout on the laser cutter's screen", position: "50% 45%" },
  },
  {
    title: "Electric karting",
    category: "Vehicles",
    text: "Electric karts built in the workshop: a steel frame, a hub motor and our own wiring, then out on the track.",
    video: `${DIR}/kart-build.mp4`,
    cover: { src: `${DIR}/kart-build-poster.jpg`, alt: "A kart frame on the workshop bench with its wheels and hub motor" },
  },
  {
    title: "Mini drift kart",
    category: "Vehicles",
    text: "A small electric drift kart with a rear spoiler, rebuilt with our own electronics and wiring to slide through the corners.",
    cover: { src: `${DIR}/Screenshot 2026-10-08 232921.png`, alt: "The mini electric drift kart with its rear spoiler, seat and steering wheel from above" },
  },
  {
    title: "Mini satellite competition",
    category: "Space",
    text: "A CanSat: a whole satellite's systems packed into the size of a soda can, built for a mini satellite competition.",
    cover: { src: `${DIR}/rc.jpg`, alt: "The CanSat mini satellite, its stacked boards in a black frame", position: "50% 62%" },
  },
];

function OtherProjectsPage() {
  return (
    <PageShell>
      <section aria-labelledby="projects-title">
        <ProjectArchive title="Other projects" titleId="projects-title" projects={PROJECTS} />
      </section>
    </PageShell>
  );
}

export default OtherProjectsPage;

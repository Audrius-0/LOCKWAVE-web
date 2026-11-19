import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ProductsHero from "@/components/ProductsPage/ProductsHero";
import ProductDetails from "@/components/ProductsPage/ProductDetails";
import MonitoringVideo from "@/components/ProductsPage/MonitoringVideo";
import type { MonitoringStep } from "@/components/ProductsPage/MonitoringVideo";
import Advantages from "@/components/ProductsPage/Advantages";
import LineDivider from "@/components/LineDivider";
import GroupHeading from "@/components/GroupHeading";
import type { Advantage } from "@/components/ProductsPage/Advantages";

export const metadata: Metadata = {
  title: "Products | Lockwave Systems",
};

// The bunker video's three parts: antenna on the surface, Honeycomb inside, command screen.
const MONITORING: MonitoringStep[] = [
  { at: 0, text: "An antenna above ground picks up every Pulse in range." },
  { at: 8.5, text: "The signal comes down to the Honeycomb in the bunker." },
  { at: 14, text: "Command sees each fighter's status live, with a log of every event." },
];

const PULSE_ADVANTAGES: Advantage[] = [
  { title: "One-press status", text: "Injured or Dead reaches the command centre at once." },
  { title: "Scheduled check-ins", text: "A press at set times confirms you are well; a missed check-in stands out." },
  { title: "No radio chaos", text: "Status travels as data, so nobody has to shout over the radio." },
  { title: "Gets through", text: "Much more penetration than voice radio, so the status arrives where a call would not." },
  { title: "Worn on the vest", text: "The buttons sit within reach." },
  { title: "Charging case", text: "One case charges and carries a whole team's set." },
];

const RADIO_ADVANTAGES: Advantage[] = [
  { title: "Encryption", text: "Encryption protects every sent packet, and checks that nothing was altered on the way." },
  { title: "Mesh / MANET", text: "Every device relays for the others, so coverage grows with the group and holds up in difficult terrain." },
  { title: "No infrastructure", text: "Works without cell towers or internet, wherever the group goes." },
  { title: "Data transmission", text: "Voice, GPS coordinates, preset commands, messages and sensor data travel over the same network." },
  { title: "Sensors and remote control", text: "External sensors connect to the network, and devices can be activated remotely." },
  {
    title: "Phone connection",
    text: "Over Bluetooth, the radio extends the mesh to a phone as a MANET; with a phone, the Mini works as a standard radio.",
  },
];

/*
 * Two product lines, each under a big centred signpost and followed by its advantages:
 * Pulse (and how its monitoring reaches command), then the Anemo radios.
 */
function ProductsPage() {
  return (
    <PageShell>
      <ProductsHero />

      <GroupHeading id="pulse-line">Pulse</GroupHeading>
      <ProductDetails show={["pulse"]} flush />
      <MonitoringVideo
        title="How Pulse monitoring works"
        src="/products/honeycomb-bunker.mp4"
        poster="/products/honeycomb-bunker-poster.webp"
        alt="An antenna above a bunker, its cable down to a Honeycomb base station and the command screen showing each fighter's status"
        steps={MONITORING}
      />
      <Advantages
        id="pulse-advantages"
        label="Pulse"
        title="Advantages"
        lead="A vest-worn status device that tells the command centre how everyone is doing without a word over the radio."
        points={PULSE_ADVANTAGES}
      />
      {/* Sets the Pulse line apart from the Anemo radios below, as on Use Cases. */}
      <LineDivider />

      <GroupHeading id="radios" afterDivider>
        Radios
      </GroupHeading>
      <ProductDetails show={["anemo-honeycomb", "anemo"]} flush />
      <Advantages
        id="advantages"
        label="Anemo radio line"
        title="Advantages"
        lead="We are building an infrastructure-free mesh radio system where every device relays for the others, keeping a group connected without cell towers or internet."
        points={RADIO_ADVANTAGES}
      />
    </PageShell>
  );
}

export default ProductsPage;

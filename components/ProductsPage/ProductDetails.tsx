import { Fragment } from "react";
import type { ReactNode } from "react";
import ProductAnatomy from "./ProductAnatomy";
import type { Callout } from "./ProductAnatomy";
import { ANEMO, ANEMO_HONEYCOMB, PULSE } from "../products";
import styles from "./ProductDetails.module.css";

/*
 * Pointer spots are in % of each photo (the Anemo ones 2848 × 4288); `text` is the short line
 * beside the photo. The buttons in the hero jump to these sections.
 */
const HONEYCOMB_CALLOUTS: Callout[] = [
    {
        label: "Antenna",
        text: "Sends and receives voice, messages, GPS and sensor data for the group.",
        x: 47, y: 38, side: "right", labelY: 30,
    },
    {
        label: "Telephone",
        text: "Pair a phone and the Mini works as a standard radio.",
        x: 68, y: 60, side: "right", labelY: 56,
    },
    {
        label: "Main body",
        text: "Encryption, mesh routing and gathering in a small, rugged package.",
        x: 36, y: 72, side: "left", labelY: 61,
    },
    {
        label: "Battery connection port",
        text: "Runs with any drone battery, solar panel or handmade from 2s to 6s power pack.",
        x: 26.5, y: 84.5, side: "left", labelY: 90,
    },
];

const ANEMO_CALLOUTS: Callout[] = [
    {
        label: "Antenna",
        text: "Relays voice, messages, GPS and sensor data for the group.",
        x: 55, y: 20, side: "right",
    },
    {
        label: "Screen",
        text: "Channels and nodes in range, no phone needed.",
        x: 42, y: 50, side: "right", labelY: 40,
    },
    {
        label: "PTT button",
        text: "Hold to talk to the group, release to listen.",
        x: 55, y: 50.6, side: "right", labelY: 62,
    },
    {
        label: "Battery",
        text: "Runs for multiple days on wide range of batteries, from 2s to 6s LiPo or Li-ion.",
        x: 61.5, y: 57, side: "right", labelY: 84,
    },
    {
        label: "Control button",
        text: "Steps through channels and settings on the screen.",
        x: 31.5, y: 56.5, side: "left", labelY: 48,
    },
    {
        label: "Speaker",
        text: "Speaker and microphone.",
        x: 33.5, y: 70, side: "left", labelY: 76,
    },
];

/*
 * Pulse's photo is 783 × 940, close on the device. Its three buttons, left to right:
 * Dead on top, the well check-in high on the side, Injured low on the side.
 */
const PULSE_CALLOUTS: Callout[] = [
    {
        label: "Antenna",
        text: "Much more penetration than a voice radio: the status gets through where a call would not.",
        x: 57.5, y: 9, side: "right", labelY: 10,
    },
    {
        label: "Well button",
        text: "Pressed at set times to tell the command centre you are well.",
        x: 70, y: 29.5, side: "right", labelY: 38,
    },
    {
        label: "Injured button",
        text: "One press tells the command centre someone is injured.",
        x: 87, y: 62, side: "right", labelY: 68,
    },
    {
        label: "Dead button",
        text: "One press reports a loss, with no shouting over the radio.",
        x: 41, y: 16, side: "left", labelY: 12,
    },
    {
        label: "Worn on the vest",
        text: "Sits on the plate carrier with its buttons within reach.",
        x: 32, y: 62, side: "left", labelY: 64,
    },
];

// Anemo and the Honeycomb are at the same stage.
const STAGE = { label: "Prototype", value: "TRL 5" };

export type ProductKey = "pulse" | "anemo-honeycomb" | "anemo";

// Each product's section, by key, so the page can place them around other sections.
const SECTIONS: Record<ProductKey, ReactNode> = {
    pulse: (
        <ProductAnatomy
            id={PULSE.id}
            category={PULSE.category}
            name={PULSE.name}
            // The Pulse group heading above already names it.
            showName={false}
            intro="Worn on the vest, Pulse reports each fighter's situation to the command centre at a press. Its two main buttons, Injured and Dead, reach command at once without the chaos of shouting over the radio; a third, pressed at set times, tells command you are well. Its signal has much more penetration than voice radio."
            image="/products/pulse-close.jpg"
            alt="Pulse, a black octagonal Lockwave device with two antennas and metal buttons, worn on a camouflage vest"
            imageSize={{ width: 783, height: 940 }}
            callouts={PULSE_CALLOUTS}
        />
    ),
    "anemo-honeycomb": (
        <ProductAnatomy
            id={ANEMO_HONEYCOMB.id}
            category={ANEMO_HONEYCOMB.category}
            name={ANEMO_HONEYCOMB.name}
            intro="Exactly the Anemo radio, without the microphone, screen and speaker, so a much smaller mesh node. It gathers and relays information remotely, connects external sensors and activates devices from afar, and with a phone's capabilities via Bluetooth it works as a standard radio."
            image="/products/DSC_6622.jpg"
            alt="Anemo Honeycomb node standing in front of a phone running the push-to-talk app"
            callouts={HONEYCOMB_CALLOUTS}
            stage={STAGE}
            // Its lowest pointer (battery port) reaches below the photo's middle band,
            // so the jump lands a little lower to keep that text on screen.
            jumpShift={48}
        />
    ),
    anemo: (
        <ProductAnatomy
            id={ANEMO.id}
            category={ANEMO.category}
            name={ANEMO.name}
            intro="The full radio: a handheld with voice, a screen, a battery, a sensor/initiator port and a one-press button for sending GPS or preset commands. Over Bluetooth it also extends the mesh to a phone as a MANET."
            image="/products/DSC_6678.JPG"
            alt="Anemo handheld radio prototype held in a hand"
            callouts={ANEMO_CALLOUTS}
            stage={STAGE}
        />
    ),
};

// The given products, in the given order. flush: no space above (a group heading gives it).
function ProductDetails({ show, flush = false }: { show: ProductKey[]; flush?: boolean }) {
    return (
        <div className={`${styles.list} ${flush ? styles.flush : ""}`}>
            {show.map((key) => (
                <Fragment key={key}>{SECTIONS[key]}</Fragment>
            ))}
        </div>
    );
}

export default ProductDetails;

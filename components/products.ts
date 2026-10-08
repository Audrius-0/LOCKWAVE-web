// The product lines, shared by the home page and the Products page.
export interface Product {
    // Anchor on the Products page, e.g. /products#anemo
    id: string;
    category: string;
    name: string;
    text: string;
    image: string;
    alt: string;
    // Which part of the photo to keep when it is cropped.
    crop: "upper" | "center";
}

export const ANEMO: Product = {
    id: "anemo",
    category: "Handheld radio",
    name: "Anemo radio module",
    text: "The full radio: a handheld with voice, a screen, a battery, a sensor/initiator port and a one-press button for sending GPS or preset commands. Over USB-C it also extends the mesh to a phone as a MANET.",
    image: "/new/DSC_6742.jpg",
    alt: "Anemo radio module prototype held up in the workshop",
    crop: "upper",
};

export const ANEMO_HONEYCOMB: Product = {
    id: "anemo-honeycomb",
    category: "Mini edition",
    name: "Anemo Honeycomb",
    text: "The Mini edition is the Anemo radio without the microphone, screen and speaker: a much smaller mesh node for remote information gathering and relaying, external sensors and remotely activating devices. With a phone, it works as a standard radio.",
    image: "/new/DSC_6542.jpg",
    alt: "Anemo Honeycomb node held in an open hand",
    crop: "center",
};

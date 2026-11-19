import { Fragment } from "react";
import LoadingImage from "./LandingPage/LoadingImage";
import CyclingPhoto from "./CyclingPhoto";
import GroupHeading from "./GroupHeading";
import LineDivider from "./LineDivider";
import { Reveal } from "./motion/Reveal";
import section from "./LandingPage/Section.module.css";
import styles from "./AlternatingBlocks.module.css";

export interface Block {
    // One photo, or several that crossfade in a loop.
    image: string | string[];
    alt: string;
    // object-position for the crop, so the subject stays in frame (default centred).
    position?: string;
    label: string;
    title: string;
    text: string;
    // A band of space with a white line after this block, setting it apart from the next.
    dividerAfter?: boolean;
    // A big signpost word, centred above the block, naming the group it starts (e.g. Pulse).
    marker?: string;
    // Anchor on the signpost (or the block), so a link can jump to it (e.g. #pulse).
    id?: string;
}

/*
 * A chess table of photo and text halves: each block is a photo filling half the
 * screen and text filling the other half, as tall as the page hero. Blocks alternate
 * sides (the first has its photo on the left) and sit flush, so neighbouring photos
 * touch only at their corners. Phones stack photo and text. A block can be set apart
 * from the ones after it by a band with a white line, and a group of blocks can open
 * with a big centred signpost word.
 */
function AlternatingBlocks({ blocks }: { blocks: Block[] }) {
    return (
        <div>
            {blocks.map((block, i) => (
                <Fragment key={block.title}>
                    {block.marker && (
                        <GroupHeading id={block.id ?? block.marker.toLowerCase()} afterDivider={blocks[i - 1]?.dividerAfter}>
                            {block.marker}
                        </GroupHeading>
                    )}
                    <article id={block.marker ? undefined : block.id} className={`${styles.block} ${i % 2 === 1 ? styles.flip : ""}`}>
                        <div className={styles.photo}>
                            {Array.isArray(block.image) ? (
                                <CyclingPhoto
                                    images={block.image}
                                    alt={block.alt}
                                    sizes="(min-width: 640px) 50vw, 100vw"
                                    className={styles.image}
                                    position={block.position}
                                />
                            ) : (
                                <LoadingImage
                                    src={block.image}
                                    alt={block.alt}
                                    fill
                                    sizes="(min-width: 640px) 50vw, 100vw"
                                    className={styles.image}
                                    style={{ objectPosition: block.position ?? "50% 50%" }}
                                />
                            )}
                        </div>
                        <div className={styles.text}>
                            <Reveal className={styles.copy}>
                                <p className={styles.label}>{block.label}</p>
                                <h2 className={styles.title}>{block.title}</h2>
                                <p className={section.body}>{block.text}</p>
                            </Reveal>
                        </div>
                    </article>
                    {block.dividerAfter && <LineDivider />}
                </Fragment>
            ))}
        </div>
    );
}

export default AlternatingBlocks;

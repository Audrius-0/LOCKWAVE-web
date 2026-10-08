import LoadingImage from "./LandingPage/LoadingImage";
import ArrowLink from "./ArrowLink";
import { Parallax } from "./motion/Parallax";
import { Reveal } from "./motion/Reveal";
import type { Product } from "./products";
import section from "./LandingPage/Section.module.css";
import styles from "./ProductRow.module.css";

interface ProductRowProps {
    product: Product;
    // Photo on the right and card on the left, for alternating rows.
    reverse?: boolean;
    // Anchor id, so a link can jump straight to this product.
    id?: string;
    // Where "Learn more" goes.
    ctaHref: string;
}

const CROP = {
    upper: styles.cropUpper,
    center: styles.cropCenter,
};

// One product: a large photo with a frosted card overlapping it. Put rows in `styles.rows`.
function ProductRow({ product, reverse = false, id, ctaHref }: ProductRowProps) {
    return (
        <article id={id} className={`${styles.row} ${reverse ? styles.reverse : ""}`}>
            <div className={styles.media}>
                <Parallax>
                    <LoadingImage
                        src={product.image}
                        alt={product.alt}
                        fill
                        sizes="(max-width: 767px) 100vw, 64vw"
                        className={`${styles.image} ${CROP[product.crop]}`}
                    />
                </Parallax>
            </div>
            {/* The card slides in from the side it overlaps, towards the photo. */}
            <Reveal variant={reverse ? "fromLeft" : "fromRight"} className={styles.card}>
                <p className={styles.category}>{product.category}</p>
                <div className={styles.cardBody}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={section.body}>{product.text}</p>
                    <ArrowLink href={ctaHref} variant="box">Learn more</ArrowLink>
                </div>
            </Reveal>
        </article>
    );
}

export default ProductRow;

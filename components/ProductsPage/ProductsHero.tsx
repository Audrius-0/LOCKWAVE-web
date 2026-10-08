import PageHero from "../PageHero";
import ArrowLink from "../ArrowLink";
import styles from "./ProductsHero.module.css";

// The Products page's opening photo, with a button per product that jumps to it below.
function ProductsHero() {
    return (
        <PageHero
            id="products-title"
            title="Products"
            src="/products/Cine_04_Vista_1.png"
            alt="Lockwave radio node mounted on a mast above a misty forest at dawn"
            imageClassName={styles.image}
            tone="dark"
        >
            <ArrowLink href="#anemo-honeycomb" variant="pill">ANEMO HONEYCOMB</ArrowLink>
            <ArrowLink href="#anemo" variant="pill">ANEMO</ArrowLink>
        </PageHero>
    );
}

export default ProductsHero;

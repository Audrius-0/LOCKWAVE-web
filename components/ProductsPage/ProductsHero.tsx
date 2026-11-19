import PageHero from "../PageHero";
import ArrowLink from "../ArrowLink";
import styles from "./ProductsHero.module.css";

// The Products page's opening photo, with a row of buttons under the title, one per product, that jump to it below.
function ProductsHero() {
    return (
        <PageHero
            id="products-title"
            title="Products"
            src="/products/products-hero.jpg"
            alt="Lockwave radio node mounted on a mast above a misty forest at dawn"
            imageClassName={styles.image}
            tone="dark"
        >
            <ArrowLink href="#pulse" variant="pill">PULSE</ArrowLink>
            <ArrowLink href="#anemo-honeycomb" variant="pill">ANEMO HONEYCOMB</ArrowLink>
            <ArrowLink href="#anemo" variant="pill">ANEMO</ArrowLink>
        </PageHero>
    );
}

export default ProductsHero;

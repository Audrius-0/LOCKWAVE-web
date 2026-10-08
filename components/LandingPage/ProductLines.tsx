import ProductRow from "../ProductRow";
import { ANEMO, ANEMO_HONEYCOMB } from "../products";
import { RevealGroup, RevealItem } from "../motion/Reveal";
import section from "./Section.module.css";
import rows from "../ProductRow.module.css";
import styles from "./ProductLines.module.css";

const PRODUCTS = [ANEMO, ANEMO_HONEYCOMB];

function ProductLines() {
  return (
    <section id="products" className={section.section} aria-labelledby="products-title">
      <div className={section.inner}>
        <RevealGroup className={section.bordered}>
          <RevealItem as="h3" id="products-title" className={`${section.title} ${styles.title}`}>What we offer</RevealItem>
          <RevealItem as="p" className={`${section.lead} ${styles.intro}`}>
            Two product lines on one infrastructure-free mesh network: the full handheld radio, and the Mini edition, a smaller node for sensors, remote activation or a phone.
          </RevealItem>
        </RevealGroup>

        <div className={rows.rows}>
          {PRODUCTS.map((product, i) => (
            // "Learn more" opens the Products page centred on this product's photo.
            <ProductRow key={product.id} product={product} reverse={i % 2 === 1} ctaHref={`/products#${product.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductLines;

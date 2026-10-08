import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ProductsHero from "@/components/ProductsPage/ProductsHero";
import SystemIntro from "@/components/ProductsPage/SystemIntro";
import ProductDetails from "@/components/ProductsPage/ProductDetails";

export const metadata: Metadata = {
  title: "Products | Lockwave Systems",
};

function ProductsPage() {
  return (
    <PageShell>
      <ProductsHero />
      <SystemIntro />
      <ProductDetails />
    </PageShell>
  );
}

export default ProductsPage;

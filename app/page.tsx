import PageShell from "@/components/PageShell";
import MainInfo from "@/components/LandingPage/MainInfo";
import WhoAreWe from "@/components/LandingPage/WhoAreWe";
import UseCases from "@/components/LandingPage/UseCases";
import ProductLines from "@/components/LandingPage/ProductLines";
import Contact from "@/components/LandingPage/Contact";
import styles from "./page.module.css";

function Home () {
  return (
    <PageShell>
      <MainInfo/>
      <div className={styles.sections}>
        <WhoAreWe/>
        <UseCases/>
        <ProductLines/>
        <Contact/>
      </div>
    </PageShell>
  )
}

export default Home;


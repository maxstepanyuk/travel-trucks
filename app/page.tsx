import Link from "next/link";
import css from "./page.module.css";
import Container from "@/components/Container/Container";
import clsx from "clsx";
import Image from "next/image";
import hero from "@/public/hero.jpg";

// docs: https://image-component.nextjs.gallery/

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.heroImageContainer}>
        <div className={css.heroOverlay}></div>
        <Image
          src={hero}
          className={css.heroImage}
          alt="Camper van in front of a sun set"
          placeholder="blur"
          quality={100}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <Container>
        <div className={css.text}>
          <h1 className={css.title}>Campers of your dreams</h1>
          <p className={css.description}>
            You can find everything you want in our catalog
          </p>
        </div>
        <Link href="/catalog" className={clsx(css.link, "buttonSolid")}>
          View Now
        </Link>
      </Container>
    </section>
  );
}

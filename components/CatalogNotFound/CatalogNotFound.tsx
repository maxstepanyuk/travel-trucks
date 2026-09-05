import Image from "next/image";
import css from "./CatalogNotFound.module.css";

import image from "@/public/catalog-not-found.png";
import clsx from "clsx";

export default function CatalogNotFound() {
  return (
    <div className={css.wrapper}>
      <Image
        className={css.image}
        src={image}
        alt="No campers found icon"
        width={488}
        height={463}
        quality={100}
        sizes="100vw"
      />

      <div className={css.text}>
        <h2 className={css.title}>No campers found</h2>
        <p className={css.description}>
          We couldn`t find any campers that match your filters. <br /> Try
          adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={css.actions}>
        <button
          className={clsx(css.buttonClear, "buttonClear")}
          type="button"
          onClick={() => {}}
        >
          <div className="buttonClearIconWrapper">
            <svg width={12} height={12}>
              <use href="/sprite.svg#close" />
            </svg>
          </div>
          Clear filters
        </button>

        <button className={clsx(css.buttonAll, "buttonSolid")} type="button">
          View all campers
        </button>
      </div>
    </div>
  );
}

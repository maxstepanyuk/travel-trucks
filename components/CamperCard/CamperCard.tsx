import Image from "next/image";
import css from "./CamperCard.module.css";
import clsx from "clsx";
import Link from "next/link";

export default function CamperCard() {
  return (
    <div className={css.card}>
      <Image
        src="https://ac.goit.global/fullstack/career/campers/cruise-america-c-21/cruise-america-c-21-1.jpg"
        alt="The Canyon Alcove 21 ..."
        width="219"
        height="240"
        className={css.image}
      />

      <div className={css.info}>
        <div className={css.textContainer}>
          <div className={css.title}>
            <h2 className={css.name}>Mavericks</h2>
            <p className={css.price}>€8000</p>
          </div>
          <div className={css.details}>
            {/* todo: make icons using ::before ? */}
            <div className={css.reviews}>
              <svg width="16" height="16">
                <use href={"/sprite.svg#rating-star"} />
              </svg>
              <p className={css.reviewsSummary}>4.4(2 Reviews)</p>
            </div>

            <div className={css.location}>
              <svg width="16" height="16">
                <use href={"/sprite.svg#location"} />
              </svg>
              <p className={css.locationName}>Kyiv, Ukraine</p>
            </div>
          </div>
        </div>

        <p className={css.description}>
          Embrace simplicity and freedom with the Mavericks panel truck... Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <ul className={css.badgesList}>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-engine-fuel"} />
            </svg>
            <p className={css.badgeText}>Petrol</p>
          </li>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-transmission"} />
            </svg>
            <p className={css.badgeText}>Automatic</p>
          </li>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-form"} />
            </svg>
            <p className={css.badgeText}>Alcove</p>
          </li>
        </ul>
        <Link href="/catalog/1" className={clsx(css.link, "buttonSolid")}>
          Show more
        </Link>
      </div>
    </div>
  );
}

import Image from "next/image";
import css from "./CamperCard.module.css";
import clsx from "clsx";
import Link from "next/link";
import { CamperListItemDto } from "@/types/camper";

interface CamperCardProps {
  camper: CamperListItemDto;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const reviewsSummary = camper.rating + "(" + camper.totalReviews + ")";

  return (
    <div className={css.card}>
      <Image
        src={camper.coverImage}
        alt={camper.description}
        width="219"
        height="240"
        className={css.image}
      />

      <div className={css.info}>
        <div className={css.textContainer}>
          <div className={css.title}>
            <h2 className={css.name}>{camper.name}</h2>
            <p className={css.price}>€{camper.price}</p>
          </div>
          <div className={css.details}>
            {/* todo: make icons using ::before ? */}
            <div className={css.reviews}>
              <svg width="16" height="16">
                <use href={"/sprite.svg#rating-star"} />
              </svg>
              <p className={css.reviewsSummary}>{reviewsSummary}</p>
            </div>

            <div className={css.location}>
              <svg width="16" height="16">
                <use href={"/sprite.svg#location"} />
              </svg>
              <p className={css.locationName}>{camper.location}</p>
            </div>
          </div>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.badgesList}>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-engine-fuel"} />
            </svg>
            <p className={css.badgeText}>{camper.engine}</p>
          </li>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-transmission"} />
            </svg>
            <p className={css.badgeText}>{camper.transmission}</p>
          </li>
          <li className={clsx(css.badgeItem, "badge")}>
            <svg width="20" height="20" fill="ff0000">
              <use href={"/sprite.svg#badge-form"} />
            </svg>
            <p className={css.badgeText}>{camper.form}</p>
          </li>
        </ul>
        <Link
          href={"/catalog/" + camper.id}
          className={clsx(css.link, "buttonSolid")}
          target="_blank"
        >
          Show more
        </Link>
      </div>
    </div>
  );
}

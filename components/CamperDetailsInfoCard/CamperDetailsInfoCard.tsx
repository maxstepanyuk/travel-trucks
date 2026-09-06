import css from "./CamperDetailsInfoCard.module.css";
import clsx from "clsx";
import { CamperDetailsEntity } from "@/types/camper";
import {
  abbreviationToUpperCase,
  formatApiConsumption,
  formatApiKwh,
  formatApiLiters,
  formatApiMeters,
  formatLabelText,
  toFirstUpperLetter,
} from "@/lib/util";

interface CamperDetailsInfoCardProps {
  camper: CamperDetailsEntity;
}

export default function CamperDetailsInfoCard({
  camper,
}: CamperDetailsInfoCardProps) {
  const reviewsSummary = camper.rating + " (" + camper.totalReviews + " Reviews)";

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <div className={css.info}>
          <div className={css.textContainer}>
            <h1 className={css.name}>{camper.name}</h1>

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
          <p className={css.price}>€{camper.price}</p>

          <p className={css.description}>{camper.description}</p>
        </div>
      </div>

      <div className={css.card}>
        <div className={css.info}>
          <div className={css.title}>
            <h2 className={css.name}>Vehicle details</h2>
          </div>
          <ul className={css.badgesList}>
            {camper.amenities.map((item) => {
              const formatItem = abbreviationToUpperCase(
                toFirstUpperLetter(item),
              );
              return (
                <li key={item} className={clsx(css.badgeItem, "badge")}>
                  <p className={css.badgeText}>{formatItem}</p>
                </li>
              );
            })}
          </ul>

          <hr className={css.detailsLine} />

          <table className={css.detailsTable}>
            <tbody>
              <tr className="visuallyHidden">
                <th>Detail</th>
                <th>Value</th>
              </tr>
              {[
                ["Form", toFirstUpperLetter(formatLabelText(camper.form))],
                ["Length", formatApiMeters(camper.length)],
                ["Width", formatApiMeters(camper.width)],
                ["Height", formatApiMeters(camper.height)],
                ["Tank", formatApiKwh(formatApiLiters(camper.tank))],
                ["Consumption", formatApiConsumption(camper.consumption)],
              ].map(([label, value]) => (
                <tr key={label} className={css.detailsTableRow}>
                  <td className={css.detailsTableTextLeft}>{label}</td>
                  <td className={css.detailsTableTextRight}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

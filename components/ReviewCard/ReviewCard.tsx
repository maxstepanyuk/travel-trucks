import { ReviewEntity } from "@/types/review";

import css from "./ReviewCard.module.css";

interface ReviewCardProps {
  review: ReviewEntity;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const totalStars = 5;
  const fullStars = Math.floor(review.reviewer_rating);
  const offStars = totalStars - fullStars;

  return (
    <div className={css.card}>
      <div className={css.person}>
        <div className={css.avatarLetter}>{review.reviewer_name[0]}</div>
        <div className={css.wrapNameStars}>
          <p className={css.name}>{review.reviewer_name}</p>
          <div className={css.stars}>
            {Array.from({ length: fullStars }).map((_, i) => (
              <svg key={`full-${i}`} width="16" height="16">
                <use href="/sprite.svg#rating-star" />
              </svg>
            ))}
            {Array.from({ length: offStars }).map((_, i) => (
              <svg key={`off-${i}`} width="16" height="16">
                <use href="/sprite.svg#rating-star-off" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className={css.reviewText}>{review.comment}</p>
    </div>
  );
}

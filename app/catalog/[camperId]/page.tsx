"use client";

import Container from "@/components/Container/Container";
import { getCamperById, getCamperReviewsByCamperId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";
import CamperDetailsGallerySwiper from "@/components/CamperDetailsGallerySwiper/CamperDetailsGallerySwiper";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import CamperDetailsInfoCard from "@/components/CamperDetailsInfoCard/CamperDetailsInfoCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";

export default function Details() {
  const { camperId } = useParams<{ camperId: string }>();

  const { data: camper, isFetching: isFetchingCamper } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return getCamperById(camperId);
    },
  });

  const { data: reviews, isFetching: isFetchingReviews } = useQuery({
    queryKey: ["camper-id-reviews", camperId],
    queryFn: () => {
      return getCamperReviewsByCamperId(camperId);
    },
  });

  // todo center LoaderSpinner and error. or error as toast
  if (isFetchingCamper || isFetchingReviews) return <LoaderSpinner />;
  if (!camper) return <p>todo: camper not found</p>;
  if (!reviews) return <p>todo: reviews not found</p>;

  return (
    <Container>
      <section className={css.topSection}>
        <CamperDetailsGallerySwiper gallery={camper?.gallery} />
        <CamperDetailsInfoCard camper={camper} />
      </section>
      <section className={css.reviewsSectionBookingTitleWrap}>
        <h2 className={css.reviewsSectionBookingTitle}>Reviews</h2>
        <div className={css.reviewsSectionBookingWrap}>
          <ul className={css.reviewsSection}>
            {reviews.map((item) => (
              <li key={item.id}>
                <ReviewCard review={item}/>
              </li>
            ))}
          </ul>
          <div className={css.bookForm}>bookForm</div>
        </div>
      </section>
    </Container>
  );
}

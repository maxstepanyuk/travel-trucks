"use client";

import Container from "@/components/Container/Container";
import { getCamperById, getCamperReviewsByCamperId } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";
import CamperDetailsGallerySwiper from "@/components/CamperDetailsGallerySwiper/CamperDetailsGallerySwiper";
import CamperDetailsInfoCard from "@/components/CamperDetailsInfoCard/CamperDetailsInfoCard";
import ReviewCard from "@/components/ReviewCard/ReviewCard";
import CamperDetailsBookingForm from "@/components/CamperDetailsBookingForm/CamperDetailsBookingForm";
import CatalogLoader from "@/components/CatalogLoader/CatalogLoader";
import ModalStatic from "@/components/ModalStatic/ModalStatic";

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

  // todo upd Loader and error. or error as toast
  if (isFetchingCamper || isFetchingReviews) {
    return (
      <ModalStatic>
        <CatalogLoader />
      </ModalStatic>
    );
  }
  if (!camper)
    return (
      <div className={css.center}>
        <h1>Camper not found</h1>
      </div>
    );

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
            {!reviews ? (
              <div className={css.center}>
                <h1>No reviews not found</h1>
              </div>
            ) : (
              reviews.map((item) => (
                <li key={item.id}>
                  <ReviewCard review={item} />
                </li>
              ))
            )}
          </ul>
          <div className={css.bookForm}>
            <CamperDetailsBookingForm camperId={camperId} />
          </div>
        </div>
      </section>
    </Container>
  );
}

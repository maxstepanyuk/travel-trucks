"use client";

import Container from "@/components/Container/Container";
import { getCamperById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";
import CamperDetailsGallerySwiper from "@/components/CamperDetailsGallerySwiper/CamperDetailsGallerySwiper";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";

export default function Details() {
  const { camperId } = useParams<{ camperId: string }>();

  const { data: camper, isFetching } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return getCamperById(camperId);
    },
  });

  // todo center LoaderSpinner 
  if (isFetching) return <LoaderSpinner />;
  if (!camper) return <p>todo: not found</p>;

  return (
    <Container>
      <div className={css.topSection}>
        <CamperDetailsGallerySwiper gallery={camper?.gallery} />
        {/* todo add info container here */}
      </div>
      <div className={css.reviewsSection}></div>
    </Container>
  );
}

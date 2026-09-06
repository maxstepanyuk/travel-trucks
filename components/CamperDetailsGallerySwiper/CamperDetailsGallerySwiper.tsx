import CamperImageEntity from "@/types/camper";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

import css from "./CamperDetailsGallerySwiper.module.css";

interface CamperDetailsGallerySwiperProps {
  gallery: CamperImageEntity[];
}

export default function CamperDetailsGallerySwiper({
  gallery,
}: CamperDetailsGallerySwiperProps) {
  const [slidesPerView] = useState(4);
  const sortedGallery = gallery.toSorted(
    (left, right) => left.order - right.order,
  );

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className={css.container}>
      <Swiper
        className={css.truckSelectedImageSwiper}
        loop={true}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        // className="mySwiper2"
      >
        {sortedGallery.map((img) => (
          <SwiperSlide key={img.id}>
            <Image
              className={css.truckSelectedImageSwiperSlide}
              src={img.original}
              alt=""
              width={638}
              height={505}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className={css.truckAllImagesSwiper}
        // todo fix
        onSwiper={setThumbsSwiper}
        loop={slidesPerView < sortedGallery.length}
        spaceBetween={32}
        slidesPerView={slidesPerView}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {sortedGallery.map((img) => (
          <SwiperSlide key={img.id}>
            <Image
              className={css.truckAllImagesSwiperSlide}
              src={img.original}
              alt=""
              width={136}
              height={144}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

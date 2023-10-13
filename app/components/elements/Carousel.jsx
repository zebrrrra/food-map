import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Carousel = ({ photos }) => {
  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="h-[220px] w-full"
    >
      {photos &&
        photos.map((item, index) => (
          <SwiperSlide className="relative" key={index}>
            <Image
              src={item}
              alt="Picture of the Restaurant"
              fill
              sizes="500px"
              className="mx-auto max-w-full overflow-hidden object-cover"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;

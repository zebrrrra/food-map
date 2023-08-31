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
      className="h-[250px] w-full"
      // className = "h-[56 %] w - full"原本寫法
    >
      {photos &&
        photos.map((item, index) => (
          <SwiperSlide className="h-auto w-full" key={index}>
            <Image
              src={item}
              alt="food"
              width={375}
              height={250}
              className="mx-auto"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;

import React, { useCallback, useRef } from "react";
import Image from "next/image";
// import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";

// import banner1 from "@/assets/images/banner/banner1.jpg";
import data from "@/data/categories.json";

import "swiper/css";

function Banner() {
  const swiperBanner = useRef();

  const handleMouseEnter = useCallback(() => {
    swiperBanner?.current?.swiper?.autoplay?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    swiperBanner?.current?.swiper?.autoplay?.start();
  }, []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Multi Carousel FlashSale */}
      <Swiper
        ref={swiperBanner}
        slidesPerView="auto"
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop
        // loopedSlidesLimit={false}
        // loopedSlides={1}
        modules={[Autoplay, Pagination]}
        className="swiper_banner"
      >
        {data.map((item) => {
          return (
            <SwiperSlide key={item.name}>
              <Link href="/cart" className="max-w-[892px] max-h-[344px]">
                <Image width={1000} height={1000} src="/assets/images/banner/banner1.jpg" alt="..." priority />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;

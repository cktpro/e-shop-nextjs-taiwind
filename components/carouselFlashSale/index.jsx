import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
// import required modules
import { Autoplay } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/pagination";
import "swiper/css/navigation";

import ArrowButtonCarousel from "../buttons/arrowCarousel";
import Card from "../card";

// Import Swiper styles
import "swiper/css";

function FlashSaleCarousel(props) {
  const { flashSales } = props;

  const swiperFlashSale = useRef();

  const handleMouseEnter = useCallback(() => {
    swiperFlashSale?.current?.swiper?.autoplay?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    swiperFlashSale?.current?.swiper?.autoplay?.start();
  }, []);

  const handleNext = useCallback(() => {
    swiperFlashSale?.current?.swiper?.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    swiperFlashSale?.current?.swiper?.slidePrev();
  }, []);

  if (flashSales.length > 0) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cover_carousel_flash_sale"
      >
        <ArrowButtonCarousel prev={handlePrev} next={handleNext} />

        {/* Multi Carousel FlashSale */}
        <Swiper
          // breakpoints={{
          //   0: {
          //     slidesOffsetBefore: 16,
          //   },
          //   1170: {
          //     slidesOffsetBefore: 16,
          //   },
          //   1440: {
          //     slidesOffsetBefore: 135,
          //   },
          // }}
          ref={swiperFlashSale}
          slidesPerView="auto"
          spaceBetween={30}
          // slidesOffsetBefore={120}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop
          // loopedSlidesLimit={false}
          // loopedSlides={1}
          modules={[Autoplay]}
          className="swiper_flash_sale"
        >
          {flashSales.map((item) => {
            return (
              <SwiperSlide key={item.name}>
                <Card product={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="text-center">
      <span className="text-secondary-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
        Internal Server Error
      </span>
    </div>
  );
}

export default FlashSaleCarousel;

FlashSaleCarousel.propTypes = {
  flashSales: PropTypes.instanceOf(Array).isRequired,
};

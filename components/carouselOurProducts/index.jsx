import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { Autoplay, Grid } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/grid";
import "swiper/css/pagination";

import ArrowCategoriesCarousel from "../buttons/arrowCategoriesCarousel";
import Card from "../card";

import "swiper/css";

export default function OurProductsCarousel(props) {
  const { products } = props;

  const swiperOurProducts = useRef();

  const handleMouseEnter = useCallback(() => {
    swiperOurProducts?.current?.swiper?.autoplay?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    swiperOurProducts?.current?.swiper?.autoplay?.start();
  }, []);

  const handleNext = useCallback(() => {
    swiperOurProducts?.current?.swiper?.slideNext();
  }, []);

  const handlePrev = useCallback(() => {
    swiperOurProducts?.current?.swiper?.slidePrev();
  }, []);

  if (products.length > 0) {
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cover_carousel_flash_sale"
      >
        <ArrowCategoriesCarousel prev={handlePrev} next={handleNext} />

        <Swiper
          ref={swiperOurProducts}
          slidesPerView="auto"
          grid={{
            rows: 2,
            fill: "row",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          modules={[Grid, Autoplay]}
          className="swiper_our_products"
        >
          {products.map((item) => {
            return (
              <SwiperSlide key={item.title}>
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

OurProductsCarousel.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
};

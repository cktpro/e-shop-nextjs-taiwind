import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { endOfSale } from "@/constant";
import { useTrans } from "@/helper/chanLang";
import { getTime } from "@/helper/getTime";

import ViewAllProducts from "../buttons/viewAllProduct";
import FlashSaleCarousel from "../carouselFlashSale";
import Rectangle from "../svg/rectangle";
import TimeFlashSale from "../timeFlashSale";

function FlashSale(props) {
  const { products } = props;

  const [timeToEndSale, setTimeToEndSale] = useState(getTime(endOfSale));

  useEffect(() => {
    setTimeToEndSale(getTime(endOfSale));
  }, []);

  return (
    <>
      <div className="container mt-[8.75rem]">
        <div className="lg:flex grid grid-cols-12 items-end lg:gap-[5.4375rem] mb-[2.5rem]">
          <div className="lg:flex col-span-12 max-w-[37.5rem] max-h-[6.4375rem] flex-col items-start gap-[1.5rem]">
            <div className="flex items-center gap-[1rem]">
              <div className="min-w-[1.25rem] min-h-[2.5rem]">
                <Rectangle />
              </div>

              <span className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">
                {useTrans("flashSale.today")}
              </span>
            </div>

            <div className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] whitespace-nowrap">
              {useTrans("flashSale.flashSale")}
            </div>
          </div>

          <TimeFlashSale second={timeToEndSale} />
        </div>
      </div>

      <div className="max-w-[1440px] pl-0 xl:pl-[4rem] 2xl:pl-[8.5rem] mx-auto">
        <FlashSaleCarousel products={products} />
      </div>

      <div className="text-center mt-[3.75rem]">
        <ViewAllProducts />
      </div>

      <div className="container mt-[3.75rem] mb-[4.38rem]">
        <hr className="border-1 border-solid border-black border-opacity-30" />
      </div>
    </>
  );
}

export default FlashSale;

FlashSale.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
};

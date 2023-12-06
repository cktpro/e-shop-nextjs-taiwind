import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import { useTrans } from "@/helper/chanLang";

import ViewAllProducts from "../buttons/viewAllProduct";
import FlashSaleCarousel from "../carouselFlashSale";
import Rectangle from "../svg/rectangle";
import TimeFlashSale from "../timeFlashSale";

function FlashSale(props) {
  const { flashSales } = props;

  const convertFlashSales = flashSales.reduce((prev, item) => {
    prev.push({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      discount: item.discount,
      stock: item.flashsaleStock,
      categoryId: item.product.categoryId,
      supplierId: item.product.supplierId,
      description: item.product.description,
      isDeleted: item.product.isDeleted,
      image: { location: item.product.image.location },
      discountedPrice: (+item.product.price * (100 - +item.discount)) / 100,
    });

    return prev;
  }, []);

  return (
    <div className="container mt-[8.75rem] mb-[5rem] pb-[3.75rem] pt-[1rem] bg-[url('/assets/images/background/2.png')] rounded-[0.25rem]">
      <div className="lg:flex grid grid-cols-12 items-end gap-[2rem] lg:gap-[5.4375rem] mb-[2.5rem]">
        <div className="lg:flex grid col-span-12 max-w-[37.5rem] max-h-[6.4375rem] flex-col items-start gap-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-white font-inter text-[1rem] font-[600] leading-[1.25rem]">
              {useTrans("flashSale.today")}
            </h3>
          </div>

          <h2 className="text-white font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] whitespace-nowrap">
            {useTrans("flashSale.flashSale")}
          </h2>
        </div>

        <TimeFlashSale />
      </div>

      <FlashSaleCarousel flashSales={convertFlashSales} />

      <div className="text-center mt-[3.75rem]">
        <Link href="/all-flashsale">
          <ViewAllProducts text="View All Products" type="button" onClick={() => {}} />
        </Link>
      </div>
    </div>
  );
}

export default FlashSale;

FlashSale.propTypes = {
  flashSales: PropTypes.instanceOf(Array).isRequired,
};

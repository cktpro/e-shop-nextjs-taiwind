import React from "react";
import PropTypes from "prop-types";

import CardFlashsale from "@/components/cardFlashsale";
import Rectangle from "@/components/svg/rectangle";
import TimeFlashSale from "@/components/timeFlashSale";

import { axiosServer } from "@/helper/axios/axiosServer";
import { useTrans } from "@/helper/chanLang";

function AllFlashSalePage(props) {
  const { flashSales } = props;

  const convertFlashSales = flashSales.reduce((prev, item) => {
    prev.push({
      id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      discount: item.discount,
      stock: item.stock,
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
    <div className="bg-[url('/assets/images/background/2.png')] py-[1rem] rounded-[0.25rem] container mt-[5rem]">
      <div className="lg:flex grid grid-cols-12 items-end gap-[2rem] lg:gap-[5.4375rem] mb-[2.5rem]">
        <div className="lg:flex grid col-span-12 max-w-[37.5rem] max-h-[6.4375rem] flex-col items-start gap-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-white font-poppins text-[1rem] font-[600] leading-[1.25rem]">
              {useTrans("flashSale.today")}
            </h3>
          </div>

          <h2 className="text-white font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] whitespace-nowrap">
            {useTrans("flashSale.flashSale")}
          </h2>
        </div>

        <TimeFlashSale />
      </div>

      {convertFlashSales.length > 0 ? (
        <div className="relative flex items-center justify-center">
          <div className="grid grid-cols-12 sm:gap-[1.875rem]">
            {convertFlashSales.map((item) => {
              return (
                <div
                  className="bg-white rounded-[0.25rem] col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-[2.875rem] sm:mb-0"
                  key={item.name}
                >
                  <CardFlashsale product={item} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-secondary-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            Internal Server Error
          </span>
        </div>
      )}
    </div>
  );
}

export default AllFlashSalePage;

AllFlashSalePage.propTypes = {
  flashSales: PropTypes.instanceOf(Array).isRequired,
};

export async function getServerSideProps() {
  try {
    const flashSales = await axiosServer.get("/flashSale");

    return {
      props: {
        flashSales: flashSales.data.payload || [],
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      // notFound: true,
      props: {
        search: [],
      },
    };
  }
}

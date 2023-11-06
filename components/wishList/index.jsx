import React from "react";
import PropTypes from "prop-types";

import CardJustForU from "../cardJustForU";
import CardWishList from "../cardWishList";
import Rectangle from "../svg/rectangle";

function WishList(props) {
  const { wishList } = props;

  return (
    <div className="container flex flex-col items-center justify-center gap-[5rem] mt-[5rem] whitespace-nowrap">
      <div className="flex flex-col items-center gap-[3.75rem]">
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-0 items-center justify-between w-full">
          <span className="text-text-2 text-center font-poppins text-[1.25rem] font-[400] leading-[1.625rem]">
            Wishlist (4)
          </span>

          <button
            type="button"
            className="flex px-[3rem] py-[1rem] h-[3.5rem] rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
          >
            <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Move All To Bag</span>
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-12 sm:gap-[1.875rem]">
            {wishList?.map((item) => (
              <div
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-[1.875rem] sm:mb-0"
                key={item.id}
              >
                <CardWishList product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[3.75rem]">
        <div className="flex items-center flex-col gap-10 sm:flex-row sm:gap-0 justify-between w-full">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[1.25rem] h-[2.5rem]">
              <Rectangle />
            </div>

            <span className="text-text-2 text-center font-poppins text-[1.25rem] font-[400] leading-[1.625rem]">
              Just For You
            </span>
          </div>

          <button
            type="button"
            className="flex px-[3rem] py-[1rem] justify-center items-center gap-[0.625rem rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
          >
            <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">See All</span>
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="grid grid-cols-12 sm:gap-[1.875rem]">
            {wishList?.map((item) => (
              <div
                className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-[1.875rem] sm:mb-0"
                key={item.id}
              >
                <CardJustForU product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishList;

WishList.propTypes = {
  wishList: PropTypes.instanceOf(Array).isRequired,
};

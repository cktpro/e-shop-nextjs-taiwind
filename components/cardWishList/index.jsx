import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import PropTypes from "prop-types";

function CardWishList(props) {
  const { product } = props;

  return (
    <div className="flex flex-col items-start gap-[1rem]">
      <div className="group relative w-[16.875rem] h-[15.625rem] rounded-[0.25rem] bg-secondary-1">
        <div className="absolute top-[0.75rem] left-[0.75rem] inline-flex px-[0.75rem] py-[0.25rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2">
          <span className="text-text-1 font-poppins text-[0.75rem] font-[400] leading-[1.125rem]">-40%</span>
        </div>

        <div className="absolute top-[0.75rem] right-[0.75rem] inline-flex flex-col items-start gap-[0.5rem]">
          <button
            type="button"
            className="flex items-center justify-center bg-white rounded-full w-[2.125rem] h-[2.125rem]"
          >
            <Trash2 />
          </button>
        </div>

        <div className="mx-[2.5rem] my-[2.19rem] px-[0.56rem] py-[0.88rem] box-border w-[11.875rem] h-[11.25rem] flex-shrink-0">
          <Image
            className="w-[10.75rem] h-[9.5rem] object-contain"
            src={product.image}
            alt="..."
            width={172}
            height={152}
            priority
          />
        </div>

        <button
          type="button"
          className="absolute bottom-0 flex w-[16.875rem] h-[2.5625rem] items-center justify-center transition-all duration-300 flex-shrink-0 rounded-b-[0.25rem] bg-text-2"
        >
          <div className="inline-flex items-center gap-[0.5rem]">
            <ShoppingCart className="w-[1.5rem] h-[1.5rem] text-text-1" />

            <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Add To Cart</span>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-start gap-[0.5rem]">
        <div className="text-text-2 max-w-[16.875rem] truncate font-poppins text-[1rem] font-[500] leading-[1.5rem] overflow-hidden">
          {product?.title}
        </div>

        <div className="flex items-start gap-[0.57rem]">
          <div className="text-secondary-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">{product?.price}</div>

          <div className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] line-through opacity-[0.5]">
            {product?.price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardWishList;

CardWishList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

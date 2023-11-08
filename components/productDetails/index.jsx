import React from "react";
import { Heart, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

import Card from "../card";
import Rectangle from "../svg/rectangle";

function ProductDetails(props) {
  const { product, relatedItem } = props;

  return (
    <div className="container mt-[5rem] flex flex-col items-center justify-center">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5]">/</span>

        <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">{product.title}</span>
      </div>

      <div className="min-w-full mt-[5rem] grid grid-cols-12">
        <div className="col-span-2 flex flex-col items-start justify-start gap-[1rem]">
          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product.image}
              alt="..."
              width={270}
              height={250}
            />
          </div>

          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product.image}
              alt="..."
              width={270}
              height={250}
            />
          </div>

          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product.image}
              alt="..."
              width={270}
              height={250}
            />
          </div>

          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product.image}
              alt="..."
              width={270}
              height={250}
            />
          </div>
        </div>

        <div className="col-span-5 pl-[1.4rem]">
          <div className="flex w-[31.25rem] h-[37.5rem] flex-col items-center justify-center">
            <Image
              className="object-contain max-w-[31.25rem] max-h-[37.5rem]"
              src={product.image}
              alt="..."
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="col-span-5 flex flex-col items-start justify-start pl-[5.45rem]">
          <h2 className="max-w-[24rem] whitespace-nowrap overflow-hidden text-ellipsis text-text-2 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
            {product.title}
          </h2>

          <div className="mt-[1rem] max-h-[1.3125rem] flex items-start justify-start">
            <Image
              className="max-w-[6.25rem] max-h-[1.25rem]"
              src="/assets/images/star/FourStar.png"
              alt="..."
              width={500}
              height={200}
            />

            <span className="whitespace-nowrap ml-[0.5rem] max-w-[5.9375rem] max-h-[1.3125rem] text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]">
              (150 Reviews)
            </span>

            <div className="ml-[1rem] mt-[0.1rem] min-h-[1rem] min-w-[0.0625rem] bg-black opacity-[0.5]" />

            <span className="ml-[1rem] opacity-[0.6] text-button-3 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
              In Stock
            </span>
          </div>

          <span className="mt-[1rem] text-text-2 font-inter text-[1.5rem] font-[400] leading-[1.5rem] tracking-[0.045rem]">
            $192.00
          </span>

          <span className="mt-[1.5rem] max-w-[23.3125rem] max-h-[3.9375rem] text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install &
            mess free removal Pressure sensitive.
          </span>

          <hr className="mt-[1.5rem] min-w-[25rem] border-solid border-[1px] border-gray-400" />

          <div className="mt-[1.5rem] inline-flex items-start gap-[1.5rem]">
            <span className="text-text-2 font-inter text-[1.25rem] font-[400] leading-[1.25rem] tracking-[0.0375rem]">
              Colours:
            </span>

            <div className="flex items-start gap-[0.5rem]">
              <Image
                className="max-w-[1.25rem] max-h-[1.25rem]"
                src="/assets/images/color/color1.png"
                alt="..."
                width={20}
                height={20}
              />

              <Image
                className="max-w-[1.25rem] max-h-[1.25rem]"
                src="/assets/images/color/color2.png"
                alt="..."
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="mt-[1.5rem] inline-flex items-center gap-[1.5rem]">
            <span className="text-text-2 font-inter text-[1.25rem] font-[400] leading-[1.25rem] tracking-[0.0375rem]">
              Size:
            </span>

            <ul className="flex items-start gap-[1rem]">
              <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                <span className="min-w-[1.125rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-poppins font-[500] leading-[1.3125rem]">
                  XS
                </span>
              </li>

              <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                <span className="min-w-[0.5rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-poppins font-[500] leading-[1.3125rem]">
                  S
                </span>
              </li>

              <li className="bg-secondary-2 flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                <span className="min-w-[0.75rem] min-h-[1.125rem] flex-shrink-0 text-text-1 font-poppins font-[500] leading-[1.3125rem]">
                  M
                </span>
              </li>

              <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                <span className="min-w-[0.375rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-poppins font-[500] leading-[1.3125rem]">
                  L
                </span>
              </li>

              <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                <span className="min-w-[1rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-poppins font-[500] leading-[1.3125rem]">
                  XL
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-[1.5rem] flex items-center justify-start">
            <div className="flex items-center justify-center min-w-[2.5rem] min-h-[2.75rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)] rounded-tl-[0.25rem] rounded-bl-[0.25rem]">
              <span className="min-w-[1.5rem] min-h-[1.5rem] flex-shrink-0">
                <Minus />
              </span>
            </div>

            <input
              className="flex px-[1rem] text-center max-w-[5rem] min-h-[2.75rem] border-t-[1px] border-b-[1px] border-solid border-[rgba(0,0,0,0.50)] items-center justify-center text-text-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]"
              type="text"
            />

            <div className="rounded-tr-[0.25rem] rounded-br-[0.25rem] flex min-w-[2.5625rem] min-h-[2.75rem] flex-col items-center justify-center bg-secondary-2">
              <Plus className="text-text-1" />
            </div>

            <button
              type="button"
              className="whitespace-nowrap ml-[1rem] inline-flex px-[3rem] py-[0.625rem] items-center justify-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2"
            >
              <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Buy Now</span>
            </button>

            <div className="ml-[1.19rem] flex min-w-[2.5rem] min-h-[2.5rem] p-[0.25rem] items-center justify-center flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.50)]">
              <Heart />
            </div>
          </div>

          <div className="mt-[2.5rem] flex flex-col items-start justify-start min-w-[24.9375rem] min-h-[11.25rem] flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.50)]">
            <div className="mt-[1.5rem] ml-[1rem] inline-flex items-center gap-[1rem]">
              <Image
                className="max-w-[2.5rem] max-h-[2.5rem] object-contain"
                src="/assets/images/services/delivery.png"
                alt="..."
                width={40}
                height={40}
              />

              <div className="flex flex-col items-start gap-[0.5rem]">
                <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Free Delivery</span>

                <span className="text-text-2 font-poppins text-[0.75rem] font-[500] leading-[1.125rem] underline">
                  Enter your postal code for Delivery Availability
                </span>
              </div>
            </div>

            <hr className="mt-[1rem] min-w-full border-solid border-[1px] border-gray-400" />

            <div className="mt-[1rem] ml-[1rem] inline-flex items-center gap-[1rem]">
              <Image
                className="max-w-[2.5rem] max-h-[2.5rem] object-contain"
                src="/assets/images/services/return.png"
                alt="..."
                width={40}
                height={40}
              />

              <div className="flex flex-col items-start gap-[0.5rem]">
                <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                  Return Delivery
                </span>

                <span className="text-text-2 font-poppins text-[0.75rem] font-[500] leading-[1.125rem]">
                  Free 30 Days Delivery Returns. <u>Details</u>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-full mt-[8.75rem] inline-flex flex-col items-start gap-[3.75rem]">
        <div className="flex items-center gap-[1rem]">
          <div className="min-w-[1.25rem] max-h-[2.5rem">
            <Rectangle />
          </div>

          <h3 className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Related Item</h3>
        </div>

        <div className="flex items-start gap-[1.875rem]">
          {relatedItem.map((item) => {
            return (
              <div key={item.title}>
                <Card product={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

ProductDetails.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  relatedItem: PropTypes.instanceOf(Array).isRequired,
};

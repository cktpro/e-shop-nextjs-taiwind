import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CartPage() {
  return (
    <div className="container mt-[5rem]">
      <div className="flex items-center gap-[0.75rem]">
        <Link
          href="./"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5]">/</span>

        <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">CartPage</span>
      </div>

      <div className="inline-flex flex-col items-start gap-[5rem] mt-[5rem]">
        <div className="flex flex-col items-start gap-[1.5rem]">
          <div className="flex flex-col items-start gap-[2.5rem]">
            <div className="flex w-[73.125rem] h-[4.5rem] pt-[1.5rem] pr-[2.4375rem] pb-[1.5rem] pl-[2.5rem]">
              <div className="flex items-center gap-[17.75rem]">
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Product</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Price</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Quantity</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Subtotal</span>
              </div>
            </div>

            <div className="inline-flex items-center justify-start w-[73.125rem] h-[6.375rem] rounded-[0.25rem] bg-primary-1 shadow-custom">
              <Image
                className="w-[3.125rem] h-[2.4375rem] flex-shrink-0 ml-[2.5rem] object-contain"
                src="/assets/images/products/chuotda.webp"
                alt="..."
                width={1000}
                height={1000}
              />

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]">
                LCD Monitor
              </span>

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[11.06rem]">
                $650
              </span>

              <div className="flex w-[4.5rem] h-[2.75rem] px-[0.75rem] py-[0.375rem] justify-center items-center flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.40)] ml-[17.62rem]">
                <div className="flex w-[3rem] items-center gap-[1rem] flex-shrink-0">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">01</span>

                  <div className="flex flex-col items-center justify-center">
                    <button type="button">
                      <ChevronUp />
                    </button>

                    <button type="button">
                      <ChevronDown />
                    </button>
                  </div>
                </div>
              </div>

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[17.65rem]">
                $650
              </span>
            </div>

            <div className="inline-flex items-center justify-start w-[73.125rem] h-[6.375rem] rounded-[0.25rem] bg-primary-1 shadow-custom">
              <Image
                className="w-[3.125rem] h-[2.4375rem] flex-shrink-0 ml-[2.5rem] object-contain"
                src="/assets/images/products/chuotda.webp"
                alt="..."
                width={1000}
                height={1000}
              />

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]">
                LCD Monitor
              </span>

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[11.06rem]">
                $650
              </span>

              <div className="flex w-[4.5rem] h-[2.75rem] px-[0.75rem] py-[0.375rem] justify-center items-center flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.40)] ml-[17.62rem]">
                <div className="flex w-[3rem] items-center gap-[1rem] flex-shrink-0">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">01</span>

                  <div className="flex flex-col items-center justify-center">
                    <button type="button">
                      <ChevronUp />
                    </button>

                    <button type="button">
                      <ChevronDown />
                    </button>
                  </div>
                </div>
              </div>

              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[17.65rem]">
                $650
              </span>
            </div>
          </div>

          <div className="flex items-start gap-[47.3125rem]">
            <button
              type="button"
              className="flex px-[3rem] py-[1rem] h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
            >
              <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] h-[1.5rem] whitespace-nowrap">
                Return To Shop
              </span>
            </button>

            <button
              type="button"
              className="flex px-[3rem] py-[1rem] h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
            >
              <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] h-[1.5rem] whitespace-nowrap">
                Update Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

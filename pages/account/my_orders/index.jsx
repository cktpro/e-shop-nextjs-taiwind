import React from "react";

import { axiosClient } from "@/helper/axios/axiosClient";

import AccountLayout from "../layout";

function MyOrders(props) {
  return (
    <div className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
      <span className="max-w-[9.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
        Your Order
      </span>
      {/* {cartData.cart.map((item, idx) => {
        totalPrice += item.productDetail.price * item.product.quantity;
        return (
          <div
            key={item.product._id}
            className="relative group flex items-center justify-start xl:min-w-[73.125rem] min-h-[6.375rem] rounded-[0.25rem] bg-primary-1 shadow-custom"
          >
            <Image
              title={item.productDetail.name}
              className="max-w-[3.125rem] max-h-[2.4375rem] flex items-center justify-center flex-shrink-0 ml-[2.5rem] object-contain"
              src={item.image.location}
              alt="..."
              width={1000}
              height={1000}
            />

            <button
              onClick={() => handleClickRemoveFromCart(item.product)}
              type="button"
              className="absolute top-[1rem] left-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <CanCel />
            </button>

            <Link
              className="xl:min-w-[16rem] xl:max-w-[16rem] sm:max-w-[6rem] max-w-[0rem] max-h-[1.5rem] overflow-hidden whitespace-nowrap text-ellipsis text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]"
              href={`/${item.productDetail._id}`}
            >
              <span
                title={item.productDetail.name}
                className="xl:min-w-[16rem] xl:max-w-[16rem] sm:max-w-[6rem] max-w-[0rem] max-h-[1.5rem] overflow-hidden whitespace-nowrap text-ellipsis text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]"
              >
                {item.productDetail.name}
              </span>
            </Link>

            <span className="w-[2.5625rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] xl:ml-[1.06rem] sm:ml-[1.5rem] ml-[0.5rem]">
              {formattedMoney(item.productDetail.price)}
            </span>

            <div className="flex min-w-[4.5rem] box-border max-h-[2.75rem] px-[0.75rem] py-[0.375rem] justify-center items-center flex-shrink-0 rounded-[0.25rem] border-[1.5px] border-solid border-[rgba(0,0,0,0.40)] xl:ml-[17.63rem] sm:ml-[7.8rem] ml-[2rem]">
              {isFlashsale ? (
                <span className="cursor-default min-w-[1rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  {item.product.quantity}
                </span>
              ) : (
                <div className="flex max-w-[3rem] max-h-[2rem] items-center gap-[1rem] flex-shrink-0">
                  <span className="min-w-[1rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    <input
                      type="number"
                      name="quantity"
                      id={`quantity${idx}`}
                      className="w-full outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      defaultValue={item.product.quantity}
                      onChange={(e) =>
                        e.target.value
                          ? handleChangeQuantity(e.target.value, idx)
                          : setIsChanged((prev) => ({
                              ...prev,
                              update: true,
                              checkout: true,
                            }))
                      }
                      required
                    />
                  </span>

                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={() => handleClickIncrease(idx)}
                      type="button"
                      className="max-w-[1rem] max-h-[1rem]"
                    >
                      <ChevronUp className="max-w-[1rem] max-h-[1rem]" />
                    </button>

                    <button onClick={() => handleClickReduce(idx)} type="button" className="max-w-[1rem] max-h-[1rem]">
                      <ChevronDown className="max-w-[1rem] max-h-[1rem]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <span className="min-w-[2.5625rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] xl:ml-[17.56rem] sm:ml-[7.7rem] ml-[0.7rem]">
              {formattedMoney((parseInt(item.product.quantity, 10) * parseFloat(item.productDetail.price)).toFixed(2))}
            </span>
          </div>
        );
      })} */}
      <div className="rounded-[0.25rem] w-full border">bbbb</div>
    </div>
  );
}

export default MyOrders;
MyOrders.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};

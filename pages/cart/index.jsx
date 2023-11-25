import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import ViewAllProducts from "@/components/buttons/viewAllProduct";
import CanCel from "@/components/svg/cancel";

import useCartStore from "@/store/cart/useCartStore";
import useNotificationUpdateCart from "@/store/showNotificationUpdateCart";

function CartPage() {
  const [inputCoupon, setInputCoupon] = useState("");

  const OpenNotificationUpdateCart = useNotificationUpdateCart((state) => state.openNotification);

  const CloseNotificationUpdateCart = useNotificationUpdateCart((state) => state.closeNotification);

  const cartData = useCartStore((state) => state);

  const getCart = useCartStore((state) => state.getDetail);

  const increase = useCartStore((state) => state.increase);

  const reduce = useCartStore((state) => state.reduce);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const applyCoupon = useCartStore((state) => state.applyCoupon);

  const timeoutRef = useRef(null);

  useEffect(() => {
    getCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickIncrease = useCallback(
    (product) => {
      increase(product);
    },
    [increase],
  );

  const handleClickReduce = useCallback(
    (product) => {
      reduce(product);
    },
    [reduce],
  );

  const handleClickRemoveFromCart = useCallback(
    (product) => {
      removeFromCart(product);
    },
    [removeFromCart],
  );

  const handleChangeInputCoupon = useCallback((e) => {
    setInputCoupon(e.target.value);
  }, []);

  const handleClickApplyCoupon = useCallback(
    (e) => {
      e.preventDefault();
      applyCoupon(inputCoupon);
    },
    [applyCoupon, inputCoupon],
  );

  const handleClickUpdateCart = useCallback(() => {
    OpenNotificationUpdateCart();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      CloseNotificationUpdateCart();

      clearTimeout(timeoutRef.current);

      timeoutRef.current = null;
    }, 3000);
  }, [CloseNotificationUpdateCart, OpenNotificationUpdateCart]);

  return (
    <div className="container mt-[5rem] flex flex-col items-center justify-center">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">/</span>

        <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">Cart</span>
      </div>

      <div className="inline-flex flex-col items-start gap-[2rem] sm:gap-[5rem] mt-[5rem]">
        <div className="flex flex-col items-start gap-[1.5rem]">
          <div className="xl:flex xl:flex-col items-center xl:gap-[2.5rem]">
            <div className="flex xl:max-w-[73.125rem] max-w-[43.8rem] min-h-[4.5rem] pt-[1.5rem] pr-[2.4375rem] pb-[1.5rem] pl-[2.5rem] rounded-[0.25rem] bg-primary-1 shadow-custom">
              <div className="flex items-center xl:gap-[17.75rem] sm:gap-[8rem]">
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Product</span>

                <span className="text-text-2 ml-[1rem] sm:ml-0 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  Price
                </span>

                <span className="text-text-2 sm:ml-0 ml-[2.2rem] font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  Quantity
                </span>

                <span className="text-text-2 sm:ml-0 ml-[1rem] font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  Subtotal
                </span>
              </div>
            </div>

            {cartData.cart.map((item) => {
              return (
                <div
                  key={item.id || 1}
                  className="relative group flex items-center justify-start xl:min-w-[73.125rem] min-h-[6.375rem] rounded-[0.25rem] bg-primary-1 shadow-custom"
                >
                  <Image
                    className="max-w-[3.125rem] max-h-[2.4375rem] flex items-center justify-center flex-shrink-0 ml-[2.5rem] object-contain"
                    src={item?.product?.image}
                    alt="..."
                    width={1000}
                    height={1000}
                  />

                  <button
                    onClick={() => handleClickRemoveFromCart(item)}
                    type="button"
                    className="absolute top-[1rem] left-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <CanCel />
                  </button>

                  <span className="sm:max-w-[6rem] max-w-[0rem] max-h-[1.5rem] overflow-hidden whitespace-nowrap text-ellipsis text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]">
                    {item?.product?.name}
                  </span>

                  <span className="w-[2.5625rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] xl:ml-[11.06rem] sm:ml-[1.5rem] ml-[0.5rem]">
                    ${item?.price}
                  </span>

                  <div className="flex min-w-[4.5rem] box-border max-h-[2.75rem] px-[0.75rem] py-[0.375rem] justify-center items-center flex-shrink-0 rounded-[0.25rem] border-[1.5px] border-solid border-[rgba(0,0,0,0.40)] xl:ml-[17.63rem] sm:ml-[7.8rem] ml-[2rem]">
                    <div className="flex max-w-[3rem] max-h-[2rem] items-center gap-[1rem] flex-shrink-0">
                      <span className="min-w-[1rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                        {item?.quantity}
                      </span>

                      <div className="flex flex-col items-center justify-center">
                        <button
                          onClick={() => handleClickIncrease(item)}
                          type="button"
                          className="max-w-[1rem] max-h-[1rem]"
                        >
                          <ChevronUp className="max-w-[1rem] max-h-[1rem]" />
                        </button>

                        <button
                          onClick={() => handleClickReduce(item)}
                          type="button"
                          className="max-w-[1rem] max-h-[1rem]"
                        >
                          <ChevronDown className="max-w-[1rem] max-h-[1rem]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="min-w-[2.5625rem] max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] xl:ml-[17.56rem] sm:ml-[7.7rem] ml-[0.7rem]">
                    ${(parseInt(item?.quantity, 10) * parseFloat(item?.price)).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-start xl:gap-[47.3125rem] sm:min-w-[43.8rem] min-w-[20rem] justify-between">
            <button
              onClick={() => {
                window.history.back();
              }}
              type="button"
              className="flex px-[3rem] py-[1rem] h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
            >
              <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] h-[1.5rem] whitespace-nowrap">
                Return To Shop
              </span>
            </button>

            <button
              onClick={() => handleClickUpdateCart()}
              type="button"
              className="min-w-[13.7rem] sm:min-w-fit flex px-[3rem] py-[1rem] h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]"
            >
              <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] h-[1.5rem] whitespace-nowrap">
                Update Cart
              </span>
            </button>
          </div>
        </div>

        <div className="xl:flex grid grid-cols-12 items-start xl:gap-[10.8125rem] min-w-full">
          <div className="flex flex-col col-span-12 items-start justify-start xl:gap-[3rem] xl:mb-0 mb-10">
            <form className="min-w-full sm:min-w-fit flex flex-col sm:flex-row items-start sm:items-center justify-center gap-[1rem]">
              <input
                type="text"
                placeholder="Type freeship or 10%"
                onChange={handleChangeInputCoupon}
                className="min-w-full sm:min-w-[18.75rem] max-h-[3.5rem] box-border px-[1.5rem] py-[1rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] flex items-center rounded-[0.25rem] border-[1px] border-solid border-black"
              />

              <ViewAllProducts text="Apply Coupon" type="submit" onClick={handleClickApplyCoupon} />
            </form>

            <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">{cartData.coupon}</span>
          </div>

          <div className="min-w-full xl:min-w-fit col-span-12 flex justify-end">
            <div className="flex flex-col xl:pt-0 pt-[2rem] col-span-12 items-start justify-center max-w-[29.375rem] max-h-[20.25rem] box-border rounded-[0.25rem] border-[1.5px] border-solid border-black">
              <span className="mt-[2rem] ml-[1.5rem] min-w-[6.25rem] min-h-[1.75rem] text-text-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
                Cart Total
              </span>

              <div className="inline-flex mx-[1.5rem] mt-[1.5rem] items-start min-w-[20rem] sm:min-w-[26.375rem] justify-between">
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Subtotal:</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  ${cartData.subtotal}
                </span>
              </div>

              <hr className="mx-[1.5rem] min-w-[20rem] sm:min-w-[26.375rem] mt-[1rem] border-solid border-[1px] border-gray-400" />

              <div className="inline-flex mx-[1.5rem] mt-[1rem] items-start min-w-[20rem] sm:min-w-[26.375rem] justify-between">
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Shipping:</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  {`$${cartData.shipping}`}
                </span>
              </div>

              <hr className="mx-[1.5rem] min-w-[20rem] sm:min-w-[26.375rem] mt-[1rem] border-solid border-[1px] border-gray-400" />

              <div className="inline-flex mx-[1.5rem] mt-[1rem] mb-[1rem] items-start min-w-[20rem] sm:min-w-[26.375rem] justify-between">
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Total:</span>

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  ${cartData.total}
                </span>
              </div>

              <Link href="/checkout" className="ml-[3.43rem] sm:ml-[5.56rem] mb-[2rem]">
                <ViewAllProducts text="Process to checkout" type="button" onClick={() => {}} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

import React, { useCallback, useEffect, useState } from "react";
import { message } from "antd";
// import { notification } from "antd";
import classNames from "classnames";
import { deleteCookie, getCookie } from "cookies-next";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import PropTypes from "prop-types";

import { axiosClient } from "@/helper/axios/axiosClient";
import { formattedMoney } from "@/helper/formatDocument";
// import { checkTime } from "@/helper/checkTimeFlashSale";
import useCartStore from "@/store/cart/useCartStore";

import Card from "../card";
import Loading from "../svg/loading";
import Rectangle from "../svg/rectangle";

import styles from "./productDetails.module.scss";

function ProductDetails(props) {
  const { product, relatedItem } = props;

  const [coverImg, setCoverImg] = useState(
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vectors%2Fno-picture-vectors&psig=AOvVaw0azVwCrbXOTKbmnnotREZt&ust=1701421028071000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMiPm7Kt64IDFQAAAAAdAAAAABAJ",
  );

  // const [api, contextHolder] = notification.useNotification();

  const [inputQuantity, setInputQuantity] = useState(1);

  const addToCart = useCartStore((state) => state.addToCart);

  const isLoadingAddCart = useCartStore((state) => state.isLoading);

  // const cart = useCartStore((state) => state.cart);

  const [isFlashsale, setIsFlashsale] = useState(false);

  const [stockFlashsale, setStockFlashsale] = useState(0);

  const fnCheckFlashsale = useCallback(async () => {
    const check = await axiosClient.get(`/flashsale/check-flashsale?productId=${product._id}`);

    if (check.data.message === "found") {
      setIsFlashsale(true);
      setStockFlashsale(check.data.flashsaleStock);
    }
  }, [product._id]);

  useEffect(() => {
    if (product._id) {
      fnCheckFlashsale();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product._id]);
  useEffect(() => {
    if (product._id) {
      setCoverImg(product?.image.location);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  // const openNotificationWithIcon = useCallback(
  //   (type, message) => {
  //     switch (type) {
  //       case "error":
  //         api[type]({
  //           message: "ERROR",
  //           description: message,
  //         });
  //         break;

  //       case "success":
  //         api[type]({
  //           message: "SUCCESS",
  //           description: message,
  //         });
  //         break;

  //       default:
  //         break;
  //     }
  //   },
  //   [api],
  // );

  const handleClickAddToCart = useCallback(
    async (item) => {
      const getToken = getCookie("TOKEN");
      const getRefreshToken = getCookie("REFRESH_TOKEN");

      // if (cart.length > 0) {
      //   const checkFlashsale = await axiosClient.get(
      //     `/flashsale/check-flashsale?productId=${cart[0].product.productId}`,
      //   );

      //   if (checkFlashsale.data.message === "found") {
      //     openNotificationWithIcon("error", "The shopping cart contains flash sale products, which cannot be added!!!");

      //     return;
      //   }
      // } else {
      //   const [checkStockFlashsale, getTimeFlashsale] = await Promise.all([
      //     axiosClient.get(`/flashSale/check-flashsale?productId=${item.id}`),
      //     axiosClient.get("/time-flashsale"),
      //   ]);

      //   if (checkStockFlashsale.data.message === "found") {
      //     if (getTimeFlashsale.data.payload.expirationTime) {
      //       let endOfSale = getTimeFlashsale.data.payload.expirationTime.slice(0, 10);

      //       endOfSale += " 23:59:59";

      //       const checkTimeF = checkTime(endOfSale);

      //       if (checkTimeF <= 0) {
      //         openNotificationWithIcon("error", "The flash sale period has ended");

      //         return;
      //       }

      //       if (!getTimeFlashsale.data.payload.isOpenFlashsale) {
      //         openNotificationWithIcon("error", "Flash sale has not opened yet");

      //         return;
      //       }
      //     }

      //     if (checkStockFlashsale.data.flashsaleStock <= 0) {
      //       openNotificationWithIcon("error", "The product has been sold out");

      //       return;
      //     }
      //   }
      // }

      try {
        // const response = await axiosClient.get("/authCustomers/profile");

        if (getToken && getRefreshToken) {
          const data = {
            productId: item.id,
            name: item.name,
            image: item.image.location,
            price: item.price.discountedPrice,
            quantity: parseInt(inputQuantity, 10),
          };

          addToCart(data);

          // openNotificationWithIcon("success", "product added to cart!!!");
        } else {
          deleteCookie("TOKEN");
          deleteCookie("REFRESH_TOKEN");
          deleteCookie("email");
          signOut({ callbackUrl: "/log-in" });
        }
      } catch (error) {
        deleteCookie("TOKEN");
        deleteCookie("REFRESH_TOKEN");
        deleteCookie("email");
        signOut({ callbackUrl: "/log-in" });
      }
    },
    [addToCart, inputQuantity],
  );

  const handleClickPlus = useCallback(
    (quantity) => {
      if (inputQuantity >= quantity) {
        message.error(`The quantity you ordered is too large, only ${quantity} products left`);
        setInputQuantity(quantity);
      } else {
        setInputQuantity((num) => parseInt(num, 10) + 1);
      }
    },
    [inputQuantity],
  );

  const handleClickMinus = useCallback(() => {
    if (inputQuantity <= 1) {
      message.error(`Product quantity must be greater than 0`);
      setInputQuantity(1);
    } else {
      setInputQuantity((num) => parseInt(num, 10) - 1);
    }
  }, [inputQuantity]);

  const handleChangeInputQuantity = useCallback((e, item) => {
    if (parseInt(e.target.value, 10) > parseInt(item?.stock, 10)) {
      message.error(`The quantity you ordered is too large, only ${item?.stock} products left`);
      setInputQuantity(item.stock);
    } else if (parseInt(e.target.value, 2) <= 0) {
      message.error(`Product quantity must be greater than 0`);
      setInputQuantity(1);
    } else {
      setInputQuantity(e.target.value);
    }
  }, []);

  const handleBlurInputQuantity = useCallback((e) => {
    if (!e.target.value || e.target.value <= 0) {
      setInputQuantity(1);
    }
  }, []);
  return (
    <>
      {/* {contextHolder} */}

      {isLoadingAddCart && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

      <div className="container mt-[5rem] flex flex-col items-center justify-center">
        <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
          <Link
            href="/"
            className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Home
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5]">/</span>

          <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">{product?.name}</span>
        </div>

        <div className="min-w-full mt-[5rem] grid grid-cols-12">
          <div className="hidden col-span-12 xl:col-span-2 xl:flex flex-col items-start justify-start gap-[1rem]">
            {product.imageList?.map((item) => {
              return (
                <div key={item.id} className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
                  <Image
                    id={item.id}
                    className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
                    src={item?.location}
                    alt="..."
                    width={1000}
                    height={1000}
                    onClick={() => {
                      setCoverImg(item.location);
                    }}
                    onError={() => {
                      document.getElementById(item.id).style.display = "none";
                    }}
                  />
                </div>
              );
            })}
            {/* <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={coverImg}
              alt="..."
              width={1000}
              height={1000}
            />
          </div> */}

            {/* <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product?.image?.location || product?.imageList[0]}
              alt="..."
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product?.image?.location}
              alt="..."
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex w-[10.625rem] h-[8.625rem] items-center justify-center">
            <Image
              className="object-contain max-w-[7.5625rem] max-h-[7.5625rem]"
              src={product?.image?.location || product?.images[1]}
              alt="..."
              width={1000}
              height={1000}
            />
          </div> */}
          </div>

          <div className="col-span-12 xl:col-span-5 pl-[1.4rem] flex justify-center">
            <div className="relative flex w-[29.25rem] sm:w-[31.25rem] h-[37.5rem] flex-col items-center justify-center">
              {isFlashsale && (
                <div className="absolute top-0 left-0 gap-[1rem] flex flex-col items-center justify-center px-[0.75rem] py-[0.75rem] bg-secondary-2 rounded-[0.25rem]">
                  <span className="text-text-1 font-inter text-[2rem] font-[700] leading-[2rem]">FLASH SALE</span>

                  <span className="text-text-1 font-inter text-[1.5rem] font-[700] leading-[1.5rem]">
                    Stock: {stockFlashsale}
                  </span>
                </div>
              )}

              <Image
                className="object-contain max-w-[29.25rem] sm:max-w-[31.25rem] max-h-[37.5rem]"
                src={coverImg}
                alt="..."
                onError={() => setCoverImg(product.image.location)}
                width={1000}
                height={1000}
              />
            </div>
          </div>

          <div className="col-span-12 xl:col-span-5 flex flex-col items-center xl:items-start justify-start mt-[2rem] xl:mt-0 xl:pl-[5.45rem]">
            <h2 className="max-w-[24rem] whitespace-nowrap overflow-hidden text-ellipsis text-text-2 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
              {product?.name}
            </h2>

            <div className="mt-[1rem] max-h-[1.3125rem] flex items-start justify-start">
              <Image
                className="max-w-[6.25rem] max-h-[1.25rem]"
                src="/assets/images/star/FourStar.png"
                alt="..."
                width={1000}
                height={1000}
              />

              <span className="whitespace-nowrap ml-[0.5rem] max-w-[5.9375rem] max-h-[1.3125rem] text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]">
                ({product?.rateCount} Reviews)
              </span>

              <div className="ml-[1rem] mt-[0.1rem] min-h-[1rem] min-w-[0.0625rem] bg-black opacity-[0.5]" />

              <span className="ml-[1rem] opacity-[0.6] text-[rgb(0,167,111)] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                In Stock
              </span>
            </div>

            <span className="mt-[1rem] text-text-2 font-inter text-[1.5rem] font-[400] leading-[1.5rem] tracking-[0.045rem]">
              {formattedMoney(product?.price)}
            </span>

            <span className="mt-[1.5rem] max-w-[23.3125rem] max-h-[3.9375rem] overflow-hidden text-ellipsis text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
              {product?.description}
            </span>

            <hr className="mt-[1.5rem] min-w-[25rem] border-solid border-[1px] border-gray-400" />

            {/* <div className="mt-[1.5rem] inline-flex items-start gap-[1.5rem]">
              <span className="text-text-2 font-inter text-[1.25rem] font-[400] leading-[1.25rem] tracking-[0.0375rem]">
                Colours:
              </span>

              <div className="flex items-start gap-[0.5rem]">
                <Image
                  className="max-w-[1.25rem] max-h-[1.25rem]"
                  src="/assets/images/color/color1.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />

                <Image
                  className="max-w-[1.25rem] max-h-[1.25rem]"
                  src="/assets/images/color/color2.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </div>
            </div> */}

            {/* <div className="mt-[1.5rem] inline-flex items-center gap-[1.5rem]">
              <span className="text-text-2 font-inter text-[1.25rem] font-[400] leading-[1.25rem] tracking-[0.0375rem]">
                Size:
              </span>

              <ul className="flex items-start gap-[1rem]">
                <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                  <span className="min-w-[1.125rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-inter font-[500] leading-[1.3125rem]">
                    XS
                  </span>
                </li>

                <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                  <span className="min-w-[0.5rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-inter font-[500] leading-[1.3125rem]">
                    S
                  </span>
                </li>

                <li className="bg-secondary-2 flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                  <span className="min-w-[0.75rem] min-h-[1.125rem] flex-shrink-0 text-text-1 font-inter font-[500] leading-[1.3125rem]">
                    M
                  </span>
                </li>

                <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                  <span className="min-w-[0.375rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-inter font-[500] leading-[1.3125rem]">
                    L
                  </span>
                </li>

                <li className="flex min-w-[2rem] min-h-[2rem] items-center justify-center rounded-[0.25rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)]">
                  <span className="min-w-[1rem] min-h-[1.125rem] flex-shrink-0 text-text-2 font-inter font-[500] leading-[1.3125rem]">
                    XL
                  </span>
                </li>
              </ul>
            </div> */}

            <div className="relative mt-[1.5rem] flex items-center justify-start">
              {!isFlashsale && (
                <>
                  <button
                    onClick={() => handleClickMinus()}
                    type="button"
                    className="flex items-center justify-center min-w-[2.5rem] min-h-[2.75rem] border-solid border-[1px] border-[rgba(0,0,0,0.50)] rounded-tl-[0.25rem] rounded-bl-[0.25rem]"
                  >
                    <span className="min-w-[1.5rem] min-h-[1.5rem] flex-shrink-0">
                      <Minus />
                    </span>
                  </button>

                  <input
                    type="number"
                    value={inputQuantity}
                    onBlur={(e) => handleBlurInputQuantity(e)}
                    onChange={(e) => handleChangeInputQuantity(e, product)}
                    className={classNames(
                      "flex px-[1rem] text-center max-w-[5rem] min-h-[2.75rem] border-t-[1px] border-b-[1px] border-solid border-[rgba(0,0,0,0.50)] items-center justify-center text-text-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]",
                      styles.no_arrow_input,
                    )}
                  />

                  <button
                    onClick={() => handleClickPlus(product?.stock)}
                    type="button"
                    className="rounded-tr-[0.25rem] rounded-br-[0.25rem] flex min-w-[2.5625rem] min-h-[2.75rem] flex-col items-center justify-center bg-secondary-2"
                  >
                    <span className="min-w-[1.5rem] min-h-[1.5rem] flex-shrink-0">
                      <Plus className="text-text-1" />
                    </span>
                  </button>
                </>
              )}

              <button
                onClick={() => handleClickAddToCart(product)}
                type="button"
                className="whitespace-nowrap ml-[1rem] inline-flex px-[3rem] py-[0.625rem] items-center justify-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2"
              >
                <span className="text-text-1 font-inter text-[1rem] font-[500] leading-[1.5rem]">Buy Now</span>
              </button>

              {/* <div className="ml-[1.19rem] flex min-w-[2.5rem] min-h-[2.5rem] p-[0.25rem] items-center justify-center flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.50)]">
                <Heart />
              </div> */}
            </div>

            <div className="mt-[2.5rem] flex flex-col items-start justify-start min-w-[24.9375rem] min-h-[11.25rem] flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.50)]">
              <div className="mt-[1.5rem] ml-[1rem] inline-flex items-center gap-[1rem]">
                <Image
                  className="max-w-[2.5rem] max-h-[2.5rem] object-contain"
                  src="/assets/images/services/delivery.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />

                <div className="flex flex-col items-start gap-[0.5rem]">
                  <span className="text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">Free Delivery</span>

                  <span className="text-text-2 font-inter text-[0.75rem] font-[500] leading-[1.125rem] underline">
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
                  width={1000}
                  height={1000}
                />

                <div className="flex flex-col items-start gap-[0.5rem]">
                  <span className="text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                    Return Delivery
                  </span>

                  <span className="text-text-2 font-inter text-[0.75rem] font-[500] leading-[1.125rem]">
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

            <h3 className="text-secondary-2 font-inter text-[1rem] font-[600] leading-[1.25rem]">Related Item</h3>
          </div>

          <div className="min-w-full grid grid-cols-12 xl:flex items-start xl:gap-[1.875rem]">
            {relatedItem.map((item) => {
              return (
                <div
                  className="mb-[3rem] xl:mb-0 col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 flex items-center justify-center"
                  key={item.name}
                >
                  <Card product={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;

ProductDetails.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  relatedItem: PropTypes.instanceOf(Array).isRequired,
};

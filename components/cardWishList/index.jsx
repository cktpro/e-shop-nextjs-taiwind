import React, { useCallback } from "react";
import { notification } from "antd";
import { deleteCookie, getCookie } from "cookies-next";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import PropTypes from "prop-types";

import { axiosClient } from "@/helper/axios/axiosClient";
import useCartStore from "@/store/cart/useCartStore";

function CardWishList(props) {
  const { product } = props;

  const [api, contextHolder] = notification.useNotification();

  const addToCart = useCartStore((state) => state.addToCart);

  const cart = useCartStore((state) => state.cart);

  const openNotificationWithIcon = useCallback(
    (type, message) => {
      switch (type) {
        case "error":
          api[type]({
            message: "ERROR",
            description: message,
          });
          break;

        case "success":
          api[type]({
            message: "SUCCESS",
            description: message,
          });
          break;

        default:
          break;
      }
    },
    [api],
  );

  const handleClickAddToCart = useCallback(
    async (item) => {
      const getToken = getCookie("TOKEN");
      const getRefreshToken = getCookie("REFRESH_TOKEN");

      if (cart.length > 0) {
        const checkFlashsale = await axiosClient.get(
          `/flashsale/check-flashsale?productId=${cart[0].product.productId}`,
        );

        if (checkFlashsale.data.message === "found") {
          openNotificationWithIcon("error", "The shopping cart contains flash sale products, which cannot be added!!!");

          return;
        }
      }

      try {
        const url = "/authCustomers/profile";

        const response = await axiosClient.get(url);

        if (getToken && getRefreshToken && response.data.payload) {
          const data = {
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: 1,
          };

          addToCart(data);

          openNotificationWithIcon("success", "product added to cart!!!");
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
    [addToCart, cart, openNotificationWithIcon],
  );

  return (
    <>
      {contextHolder}

      <div className="h-[22.875rem] w-[16.875rem] flex flex-col items-start gap-[1rem]">
        <div className="group relative flex items-center justify-center min-w-[16.875rem] min-h-[15.625rem] rounded-[0.25rem] bg-primary-1">
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

          <Link href={`/${product.id}`}>
            <Image
              className="max-w-[16.875rem] max-h-[15.625rem] object-contain"
              src={product?.image}
              alt="..."
              width={1000}
              height={1000}
              priority
              style={{ width: "100%", height: "auto" }}
            />
          </Link>

          <button
            onClick={() => handleClickAddToCart(product)}
            type="button"
            className="absolute bottom-0 flex w-[16.875rem] h-[2.5625rem] items-center justify-center transition-all duration-300 flex-shrink-0 bg-text-2"
          >
            <div className="inline-flex items-center gap-[0.5rem]">
              <ShoppingCart className="w-[1.5rem] h-[1.5rem] text-text-1" />

              <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Add To Cart</span>
            </div>
          </button>
        </div>

        <div className="pl-[0.5rem] pb-[0.5rem] flex flex-col items-start gap-[0.5rem]">
          <h4 className="text-text-2 max-w-[16.875rem] truncate font-poppins text-[1rem] font-[500] leading-[1.5rem] overflow-hidden">
            <Link href={`/${product.id}`}>{product?.name}</Link>
          </h4>

          <div className="flex items-start gap-[0.57rem]">
            <div className="text-secondary-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
              ${product?.price}
            </div>

            <div className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem] line-through opacity-[0.5]">
              ${product?.price}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardWishList;

CardWishList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

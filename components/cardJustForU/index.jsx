import React, { useCallback, useRef } from "react";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { axiosClient } from "@/helper/axios/axiosClient";
import { renderStars } from "@/helper/renderStar";
import useCartStore from "@/store/cart/useCartStore";
import useScaleCart from "@/store/isScaleCart";
import useNotification from "@/store/showNotification";

function CardJustForU(props) {
  const { product } = props;

  const timeoutNotificationRef = useRef(null);

  const timeoutScaleRef = useRef(null);

  const router = useRouter();

  const addToCart = useCartStore((state) => state.addToCart);

  const openNotification = useNotification((state) => state.openNotification);

  const closeNotification = useNotification((state) => state.closeNotification);

  const openScaleCart = useScaleCart((state) => state.openScaleCart);

  const closeScaleCart = useScaleCart((state) => state.closeScaleCart);

  const handleClickAddToCart = useCallback(
    async (item) => {
      try {
        const url = "/authEmployee/profile";

        const response = await axiosClient.get(url);

        if (response.data.payload) {
          const data = {
            id: item.id,
            name: item.title,
            image: item?.image || item?.images[0],
            price: item.price,
            quantity: 1,
          };

          addToCart(data);

          openScaleCart();

          if (timeoutScaleRef.current) {
            clearTimeout(timeoutScaleRef.current);
          }

          timeoutScaleRef.current = setTimeout(() => {
            closeScaleCart();

            clearTimeout(timeoutScaleRef.current);

            timeoutScaleRef.current = null;
          }, 100);

          openNotification();

          if (timeoutNotificationRef.current) {
            clearTimeout(timeoutNotificationRef.current);
          }

          timeoutNotificationRef.current = setTimeout(() => {
            closeNotification();

            clearTimeout(timeoutNotificationRef.current);

            timeoutNotificationRef.current = null;
          }, 3000);
        }
      } catch (error) {
        router.push("/log-in");
      }
    },
    [addToCart, closeNotification, closeScaleCart, openNotification, openScaleCart, router],
  );

  return (
    <div className="flex flex-col items-start gap-[1rem]">
      <div className="group relative flex items-center justify-center min-w-[16.875rem] min-h-[15.625rem] rounded-[0.25rem] bg-primary-1">
        <div className="absolute top-[0.75rem] left-[0.75rem] inline-flex px-[0.75rem] py-[0.25rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2">
          <span className="text-text-1 font-poppins text-[0.75rem] font-[400] leading-[1.125rem]">-40%</span>
        </div>

        <div className="absolute top-[0.75rem] right-[0.75rem] inline-flex flex-col items-start gap-[0.5rem]">
          <Link
            href={`/${product.id}`}
            className="flex items-center justify-center bg-white rounded-full w-[2.125rem] h-[2.125rem]"
          >
            <Eye />
          </Link>
        </div>

        <Image
          className="max-w-[16.875rem] max-h-[15.625rem] object-contain"
          src={product?.image || product?.images[0]}
          alt="..."
          width={172}
          height={152}
          priority
          style={{ width: "100%", height: "auto" }}
        />

        <button
          onClick={() => handleClickAddToCart(product)}
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

        <div className="flex items-start gap-[0.5rem]">
          <div className="flex items-start">{renderStars(product?.rating?.rate || 4.5)}</div>

          <div className="w-[2rem] h-[1.25rem] text-text-2 text-[0.875rem] font-[600] leading-[1.3125rem] opacity-[0.5]">
            {product?.rating?.count || 99}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardJustForU;

CardJustForU.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

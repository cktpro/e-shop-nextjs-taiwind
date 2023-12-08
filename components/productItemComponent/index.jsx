import React, { useCallback } from "react";
// import { Eye, Heart } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import PropTypes from "prop-types";

// import { axiosClient } from "@/helper/axios/axiosClient";
import { formattedDiscount, formattedDiscountPrice, formattedMoney } from "@/helper/formatDocument";
import { renderStars } from "@/helper/renderStar";
import useCartStore from "@/store/cart/useCartStore";

import Loading from "../svg/loading";
// import useCartStore from "@/store/cart/useCartStore";
// import useScaleCart from "@/store/isScaleCart";
// import useNotification from "@/store/showNotification";

function ProductItemComponent(props) {
  const { product } = props;
  const addCart = useCartStore((state) => state.addToCart);

  const isLoadingAddCart = useCartStore((state) => state.isLoading);
  // const timeoutNotificationRef = useRef(null);

  // const timeoutScaleRef = useRef(null);

  // const router = useRouter();

  // const addToCart = useCartStore((state) => state.addToCart);

  // const openNotification = useNotification((state) => state.openNotification);

  // const closeNotification = useNotification((state) => state.closeNotification);

  // const openScaleCart = useScaleCart((state) => state.openScaleCart);

  // const closeScaleCart = useScaleCart((state) => state.closeScaleCart);

  const handleClickAddToCart = useCallback(
    async (item) => {
      const data = {
        productId: item.id,
        quantity: 1,
      };
      addCart(data);
    },
    [addCart],
  );
  return (
    <div className="flex flex-col items-start gap-[1rem] border">
      <div className="group relative flex items-center justify-center min-w-full min-h-[15.625rem] rounded-[0.25rem] bg-primary-1">
        <div className="absolute top-[0.75rem] left-[0.75rem] inline-flex px-[0.75rem] py-[0.25rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-secondary-2">
          <span className="text-text-1 font-inter text-[0.75rem] font-[400] leading-[1.125rem]">
            {formattedDiscount(product.discount)}
          </span>
        </div>

        {isLoadingAddCart && (
          <div className="absolute top-[6rem] left-[6.25rem]">
            <Loading />
          </div>
        )}

        {/* <div className="absolute top-[0.75rem] right-[0.75rem] inline-flex flex-col items-start gap-[0.5rem]">
          <button
            type="button"
            className="flex items-center justify-center bg-white rounded-full min-w-[2.125rem] min-h-[2.125rem]"
          >
            <Heart />
          </button>

          <Link
            href={`/${product.id}`}
            className="flex items-center justify-center bg-white rounded-full min-w-[2.125rem] min-h-[2.125rem]"
          >
            <Eye />
          </Link>
        </div> */}

        <Image
          // className="max-w-[18.875rem] max-h-[17.625rem] object-contain"
          className="max-w-full max-h-full object-contain"
          src={product?.image?.location || product?.imageList[0]?.location}
          alt="..."
          width={1000}
          height={1000}
          priority
          style={{ width: "100%", height: "auto" }}
        />

        <button
          onClick={() => handleClickAddToCart(product)}
          type="button"
          className="absolute bottom-0 flex min-w-full min-h-[2.5625rem] items-center justify-center transition-all opacity-0 duration-300 group-hover:opacity-100 flex-shrink-0 rounded-b-[0.25rem] bg-text-2"
        >
          <span className="text-text-1 font-inter text-[1rem] font-[500] leading-[1.5rem]">Add To Cart</span>
        </button>
      </div>

      <div className="flex flex-col items-start gap-[0.5rem]">
        <h4 className="text-text-2 max-w-[16.875rem] truncate font-inter text-[1rem] font-[500] leading-[1.5rem] overflow-hidden">
          {product?.name}
        </h4>

        <div className="flex items-start gap-[0.57rem]">
          <div className="text-secondary-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
            {formattedDiscountPrice(product?.price, product?.discount)}
          </div>

          <div className="text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem] line-through opacity-[0.5]">
            {formattedMoney(product?.price)}
          </div>
        </div>

        <div className="flex items-start gap-[0.5rem]">
          <div className="flex items-start">{renderStars(product?.rating?.rate || 4.5)}</div>

          <div className="min-w-[2rem] min-h-[1.25rem] text-text-2 font-inter text-[0.875rem] font-[600] leading-[1.3125rem] opacity-[0.5]">
            ({product?.rating?.count || 99})
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItemComponent;

ProductItemComponent.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

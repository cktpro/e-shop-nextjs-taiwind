import React, { useCallback, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import CanCel from "@/components/svg/cancel";

import useCartStore from "@/store/cart/useCartStore";

function CartPage() {
  const router = useRouter();

  const [isHaveToken, setIsHaveToken] = useState(false);

  const cartData = useCartStore((state) => state.cart);

  // const totalPrice = useCartStore((state) => state.totalPrice);

  const increase = useCartStore((state) => state.increase);

  const reduce = useCartStore((state) => state.reduce);

  const addToCart = useCartStore((state) => state.addToCart);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    const getToken = getCookie("TOKEN");

    if (!getToken) {
      router.push("/logIn");
    } else {
      setIsHaveToken(true);
    }
  }, [router]);

  const handleClickAddToCart = useCallback(() => {
    const product = {
      id: 1,
      name: "product 1",
      price: 500,
      quantity: 1,
    };

    addToCart(product);
  }, [addToCart]);

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

  return isHaveToken ? (
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

            {cartData.map((item) => {
              return (
                <div
                  key={item.id || 1}
                  className="relative group inline-flex items-center justify-start w-[73.125rem] h-[6.375rem] rounded-[0.25rem] bg-primary-1 shadow-custom"
                >
                  <Image
                    className="w-[3.125rem] h-[2.4375rem] flex-shrink-0 ml-[2.5rem] object-contain"
                    src={item.image}
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

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[1.25rem]">
                    {item.name}
                  </span>

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[11.06rem]">
                    ${item.price}
                  </span>

                  <div className="flex w-[4.5rem] h-[2.75rem] px-[0.75rem] py-[0.375rem] justify-center items-center flex-shrink-0 rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.40)] ml-[17.62rem]">
                    <div className="flex w-[3rem] items-center gap-[1rem] flex-shrink-0">
                      <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                        {item.quantity}
                      </span>

                      <div className="flex flex-col items-center justify-center">
                        <button onClick={() => handleClickIncrease(item)} type="button">
                          <ChevronUp />
                        </button>

                        <button onClick={() => handleClickReduce(item)} type="button">
                          <ChevronDown />
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] ml-[17.65rem]">
                    ${parseInt(item.quantity, 10) * parseInt(item.price, 10)}
                  </span>
                </div>
              );
            })}
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
              onClick={() => handleClickAddToCart()}
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
  ) : null;
}

export default CartPage;

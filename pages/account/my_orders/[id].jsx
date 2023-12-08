import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import RePayment from "@/components/buttons/rePayment";
import Loading from "@/components/svg/loading";

import { axiosServer } from "@/helper/axios/axiosServer";
import { formattedMoney } from "@/helper/formatDocument";
import useFetchCheckout from "@/store/checkout";

function OrderDetails(props) {
  const { orderDetail } = props;

  const router = useRouter();

  const [isDisable, setIsDisable] = useState(true);

  const fetchCheckout = useFetchCheckout((state) => state.fetch);

  const urlVnpay = useFetchCheckout((state) => state.payload.url);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (urlVnpay) {
      router.push(urlVnpay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlVnpay]);

  useEffect(() => {
    if (
      orderDetail?.status === "WAITING" &&
      orderDetail?.paymentType === "CREDIT_CARD" &&
      orderDetail?.buyType === "ONLINE"
    ) {
      setIsDisable(false);
    }
  }, [orderDetail?.buyType, orderDetail?.paymentType, orderDetail?.status]);

  const renderStatus = (status) => {
    switch (status.toString()) {
      case "WAITING":
        return "bg-yellow-200";
      case "COMPLETED":
        return "bg-green-200";
      case "REJECT":
        return "bg-red-200";
      case "CANCELED":
        return "bg-gred-200";
      case "DELIVERING":
        return "bg-blue-200";
      default:
        return "bg-gray-200";
    }
  };

  const onClick = useCallback((finalTotal) => {
    setIsloading(true);

    setCookie("orderId", orderDetail?._id);

    const data = {
      amount: finalTotal * 24000,
      bankCode: "NCB",
      language: "en",
      returnUrl: process.env.NEXT_PUBLIC_VNPAY_RETURN_URL,
    };

    fetchCheckout(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}
      <div className="container mt-[5rem]">
        <div className="min-w-[20rem] min-h-fit bg-text-1 shadow-md rounded-sm px-[2rem] py-[2rem] whitespace-nowrap">
          <div className="cover_order_detail overflow-x-auto">
            <div className="py-[0.5rem] mb-[1rem] flex items-center justify-start">
              <span className="pl-[0.5rem] min-w-[14.5rem] max-w-[14.5rem] sm:min-w-[19.5rem] sm:max-w-[19.5rem] md:min-w-[24.5rem] md:max-w-[24.5rem] lg:min-w-[33.5rem] lg:max-w-[33.5rem] font-inter text-[1rem] font-[700] leading-[1rem]">
                Product
              </span>
              <span className="min-w-[7rem] max-w-[7rem] font-inter text-[1rem] font-[700] leading-[1rem]">
                Quantity
              </span>
              <span className="min-w-[7.5rem] max-w-[7.5rem] font-inter text-[1rem] font-[700] leading-[1rem]">
                Discount
              </span>
              <span className="min-w-[10rem] max-w-[10rem] font-inter text-[1rem] font-[700] leading-[1rem]">
                Price
              </span>
              <span className="min-w-[8rem] max-w-[8rem] font-inter text-[1rem] font-[700] leading-[1rem]">
                Sub Total
              </span>
            </div>

            {orderDetail?.orderDetails?.map((item) => {
              return (
                <div key={item.productId} className="py-[0.5rem] flex items-center justify-start">
                  <Link
                    title={item?.product?.name}
                    className="flex items-center justify-start"
                    href={`/${item.productId}`}
                  >
                    <Image
                      className="max-w-[4rem] max-h-[4rem] mr-[0.5rem]"
                      src={item?.product?.image?.location}
                      alt="..."
                      width={1000}
                      height={1000}
                    />

                    <span className="mr-[1.75rem] sm:mr-[1.75rem] md:mr-0 min-w-[8.5rem] max-w-[8.5rem] sm:min-w-[13.5rem] sm:max-w-[13.5rem] md:min-w-[20.5rem] md:max-w-[20.5rem] lg:min-w-[29.5rem] lg:max-w-[29.5rem] truncate font-inter text-[1rem] font-[400] leading-[1rem]">
                      {item?.product?.name}
                    </span>
                  </Link>

                  <span className="min-w-[7rem] max-w-[7rem] font-inter text-[1rem] font-[400] leading-[1rem]">
                    {item?.quantity}
                  </span>

                  <span className="min-w-[7rem] max-w-[7rem] font-inter text-[1rem] font-[400] leading-[1rem]">
                    {item?.discount}%
                  </span>

                  <span className="min-w-[10rem] max-w-[10rem] font-inter text-[1rem] font-[400] leading-[1rem]">
                    {formattedMoney(item?.price)}
                  </span>

                  <span className="min-w-[10rem] max-w-[10rem] font-inter text-[1rem] font-[400] leading-[1rem]">
                    {formattedMoney(
                      (parseFloat(item?.quantity) * (parseFloat(item?.price) * (100 - parseInt(item?.discount, 10)))) /
                        100,
                    )}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col items-start justify-center mt-[2rem]">
            <span className="font-inter text-[1rem] font-[500] leading-[2rem]">
              Shipping:{" "}
              <span className="px-[0.5rem] py-[0.2rem] rounded-md bg-yellow-300 text-text-2">
                {formattedMoney(orderDetail?.shippingFee)}
              </span>
            </span>

            <span className="font-inter text-[1rem] font-[500] leading-[2rem]">
              Total:{" "}
              <span className="px-[0.5rem] py-[0.2rem] rounded-md bg-green-600 text-text-1">
                {formattedMoney(parseFloat(orderDetail?.totalPrice) + parseFloat(orderDetail?.shippingFee))}
              </span>
            </span>

            <span className="font-inter text-[1rem] font-[500] leading-[2rem]">
              Status:{" "}
              <span className={classNames("px-[0.5rem] py-[0.2rem] rounded-md", renderStatus(orderDetail?.status))}>
                {orderDetail?.status}
              </span>
            </span>

            <span className="font-inter text-[1rem] font-[500] leading-[2rem]">
              Payment type: <span>{orderDetail?.paymentType}</span>
            </span>

            <span className="font-inter text-[1rem] font-[500] leading-[2rem]">
              Buy type: <span>{orderDetail?.buyType}</span>
            </span>
          </div>
          <div className="mt-[2rem]">
            <RePayment
              disabled={isDisable}
              text="Repayment"
              type="button"
              onClick={() => onClick(orderDetail?.totalPrice)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  orderDetail: PropTypes.instanceOf(Object).isRequired,
};

export async function getServerSideProps(req) {
  try {
    const { params } = req;

    const response = await axiosServer.get(`/orders-admin/${params.id}`);

    return {
      props: {
        orderDetail: response.data.payload || {},
      },
    };
  } catch (error) {
    return {
      // notFound: true,
      props: {
        product: {},
        relatedItem: [],
      },
    };
  }
}

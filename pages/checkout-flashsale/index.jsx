import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notification } from "antd";
// import { Form, Input, message } from "antd";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import { axiosClient } from "@/helper/axios/axiosClient";
import { checkTime } from "@/helper/checkTimeFlashSale";
import { formattedMoney } from "@/helper/formatDocument";
import useCartStore from "@/store/cart/useCartStore";
import useCartStoreFlashsale from "@/store/cart/useCartStoreFlashsale";
import useFetchCheckout from "@/store/checkout";
import { useShippingStore } from "@/store/checkout/shipping";

function CheckoutFlashsale() {
  const [api, contextHolder] = notification.useNotification();

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const [address, setAddress] = useState([]);
  const [districtId, setDistrictId] = useState("");
  // const totalPrice = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const shipping = useShippingStore((state) => state);
  const { data: session, status } = useSession();
  const router = useRouter();

  const cartData = useCartStore((state) => state);

  const cartDataFlashsale = useCartStoreFlashsale((state) => state);

  const fetchCheckout = useFetchCheckout((state) => state.fetch);

  const urlVnpay = useFetchCheckout((state) => state.payload.url);

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

  const handleChangeFee = async (e) => {
    const addressShip = {
      districtId,
      wardId: e.target.value.toString(),
    };
    // setTimeout(() => console.log("◀◀◀ address ▶▶▶", address), 2000);
    shipping.getFee(addressShip, cartData.cart);
  };
  useEffect(() => {
    if (urlVnpay) {
      router.push(urlVnpay);
    }
  }, [router, urlVnpay]);
  useEffect(() => {
    cartDataFlashsale.getListCartFlashSale();
    shipping.getProvince();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === "authenticated" && cartData.cart.length > 0) {
      shipping.getFee(session.user.address[0], cartData.cart);
      setAddress(session.user.address[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData.cart, status]);

  const handlePlaceOrder = useCallback(
    (finalTotal) => {
      const data = {
        amount: finalTotal * 24000,
        bankCode: "NCB",
        language: "en",
        returnUrl: process.env.NEXT_PUBLIC_VNPAY_RETURN_URL,
      };

      fetchCheckout(data);
    },
    [fetchCheckout],
  );

  const onSubmit = async (data) => {
    const [checkStockFlashsale, getTimeFlashsale] = await Promise.all([
      axiosClient.get(`/flashSale/check-flashsale?productId=${cartData.cart[0].product.productId}`),
      axiosClient.get("/time-flashsale"),
    ]);

    if (getTimeFlashsale.data.payload.expirationTime) {
      let endOfSale = getTimeFlashsale.data.payload.expirationTime.slice(0, 10);

      endOfSale += " 23:59:59";

      const checkTimeF = checkTime(endOfSale);

      if (checkTimeF <= 0) {
        openNotificationWithIcon("error", "The flash sale period has ended");

        return;
      }

      if (!getTimeFlashsale.data.payload.isOpenFlashsale) {
        openNotificationWithIcon("error", "Flash sale has not opened yet");

        return;
      }
    }

    if (checkStockFlashsale.data.stock <= 0) {
      openNotificationWithIcon("error", "The product has been sold out");

      return;
    }

    const dayShip = new Date();
    dayShip.setDate(dayShip.getDate() + 3);
    const shipFee = (shipping.feeShip / 24000).toFixed(2);
    const finalTotal = (parseFloat(totalPrice) + parseFloat(shipFee)).toFixed(2);
    const shipAddress = `${address.address} - ${address.wardName} - ${address.districtName} - ${address.provinceName}`;
    const orderDetails = cartData.cart.map((item) => {
      return {
        productId: item.product.productId,
        quantity: item.product.quantity,
        discount: item.productDetail.discount,
        price: item.productDetail.price,
      };
    });
    const order = {
      customerId: session.user.id,
      shippedDate: dayShip,
      status: "WAITING",
      shippingFee: shipFee,
      totalPrice,
      shippingAddress: shipAddress,
      paymentType: data.paymentType,
      orderDetails,
    };
    try {
      const result = await axiosClient.post("orders", order);
      if (result) {
        setCookie("orderId", result?.data?.payload?._id);

        cartData.resetCart();
        handlePlaceOrder(finalTotal);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("◀◀◀ error ▶▶▶", error);
    }

    // data.feeShip = (shipping.feeShip / 24000).toFixed(2);
  };

  useEffect(() => {
    let subTotal = 0;
    cartDataFlashsale.cart.forEach((item) => {
      if (item.flashsales) {
        subTotal += ((item.productDetail.price * (100 - item.flashsales.discount)) / 100) * item.product.quantity;
      }
    });
    setTotalPrice(subTotal);
  }, [cartDataFlashsale.cart]);

  return (
    <>
      {contextHolder}

      <div className="container mt-[5rem]">
        <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
          <Link
            href="/"
            className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Home
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <Link
            href="/cart"
            className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Cart
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">Checkout</span>
        </div>

        <h2 className="max-w-[15.75rem] mt-[5rem] text-text-2 font-inter text-[2.25rem] font-[500] leading-[1.875rem] tracking-[0.09rem] whitespace-nowrap">
          Billing Details
        </h2>

        {status === "authenticated" ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-w-full grid grid-cols-12 lg:flex items-start justify-between"
          >
            <div className="mt-[3rem] col-span-12 inline-flex flex-col items-center gap-[1.5rem]">
              <div className="flex flex-col items-start gap-[2rem]">
                <label htmlFor="firstName" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div className="max-h-[1.5rem]">
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      First Name
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>
                  {/* <Form.Item name="firstName" initialValue={session?.user?.firstName || 0}>
                  <Input className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]" />
                </Form.Item> */}
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.firstName || null}
                    {...register("firstName")}
                  />
                </label>

                <label htmlFor="companyName" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <span className="max-h-[1.5rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                    Last Name
                  </span>

                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.lastName || null}
                    {...register("lastName")}
                  />
                </label>

                <label htmlFor="streetAddress" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Street Address
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>

                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.address[0]?.address}
                    {...register("streetAddress", { required: true })}
                  />
                </label>

                <label htmlFor="apartment" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                    Province
                  </span>
                  <select
                    className=" min-w-full sm:min-w-[29.375rem] min-h-[3.125rem]  rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    // onChange={(e) => shipping.getDistrict(e.target.value)}
                    name="province"
                    defaultValue={session?.user?.address[0]?.provinceId}
                    {...register("province", {
                      onChange: (e) => {
                        document.getElementById("streetAddress").value = null;
                        setAddress((prev) => ({
                          ...prev,
                          provinceId: e.target.value,
                          provinceName: e.target.options[e.target.options.selectedIndex].text,
                        }));
                        shipping.getDistrict(e.target.value);
                      },
                    })}
                  >
                    {shipping?.isProvince === true &&
                      shipping?.provinceList?.map((item) => {
                        if (item.ProvinceID.toString() === session?.user?.address[0]?.provinceId.toString()) {
                          return (
                            <option value={item.ProvinceID} key={item.ProvinceID} selected>
                              {item.ProvinceName}{" "}
                            </option>
                          );
                        }
                        return (
                          <option value={item.ProvinceID} key={item.ProvinceID}>
                            {item.ProvinceName}{" "}
                          </option>
                        );
                      })}
                  </select>
                  {/* <input
                type="text"
                id="apartment"
                name="apartment"
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                </label>

                <label htmlFor="city" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      District
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>
                  <select
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    // onChange={(e) => {
                    //   setDistrictId(e.target.value);
                    //   shipping.getWard(e.target.value);
                    // }}
                    // defaultValue={session?.user?.address[0]?.districtId}
                    id="district"
                    name="district"
                    {...register(
                      "district",
                      {
                        onChange: (e) => {
                          setAddress((prev) => ({
                            ...prev,
                            districtId: e.target.value,
                            districtName: e.target.options[e.target.options.selectedIndex].text,
                          }));
                          setDistrictId(e.target.value);
                          shipping.getWard(e.target.value);
                        },
                      },
                      { required: true },
                    )}
                  >
                    {shipping?.districtList?.length > 0 ? (
                      shipping.districtList.map((item) => {
                        if (item.DistrictID.toString() === session?.user?.address[0]?.districtName.toString()) {
                          return (
                            <option value={item.DistrictID} key={item.DistrictID}>
                              {item.item.DistrictName}{" "}
                            </option>
                          );
                        }
                        return (
                          <option value={item.DistrictID} key={item.DistrictID}>
                            {item.DistrictName}{" "}
                          </option>
                        );
                      })
                    ) : (
                      <>
                        <option value={session?.user?.address[0]?.districtId} hidden>
                          {session?.user?.address[0]?.districtName}{" "}
                        </option>
                        <option value="" disabled>
                          Please choose province
                        </option>
                      </>
                    )}
                  </select>
                  {/* <input
                type="text"
                id="city"
                name="city"
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                </label>

                <label htmlFor="phoneNumber" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Ward
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>
                  <select
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    name="distric"
                    // onChange={async (e) => {
                    //   setAddress((prev) => ({
                    //     ...prev,
                    //     wardIdId: e.target.value,
                    //     wardName: e.target.options[e.target.options.selectedIndex].text,
                    //   }));
                    //   handleChangeFee(e);
                    // }}
                    defaultValue={session?.user?.address[0]?.wardId}
                    {...register("ward", {
                      onChange: (e) => {
                        setAddress((prev) => ({
                          ...prev,
                          wardId: e.target.value,
                          wardName: e.target.options[e.target.options.selectedIndex].text,
                        }));
                        handleChangeFee(e);
                      },
                    })}
                  >
                    {shipping?.wardList?.length > 0 ? (
                      shipping.wardList.map((item) => {
                        return (
                          <option value={item.WardCode} key={item.WardCode}>
                            {item.WardName}{" "}
                          </option>
                        );
                      })
                    ) : (
                      <>
                        <option value={session?.user?.address[0]?.wardId} hidden>
                          {session?.user?.address[0]?.wardName}
                        </option>
                        <option value="" disabled>
                          Please choose distict
                        </option>
                      </>
                    )}
                  </select>
                  {/* <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                </label>

                <label htmlFor="phoneNumber" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Phone Number
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>

                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.phoneNumber}
                    {...register("phoneNumber")}
                  />
                </label>

                <label htmlFor="emailAddress" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Email Address
                    </span>

                    <span className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>

                  <input
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.email}
                    {...register("email")}
                  />
                </label>
              </div>

              <label
                htmlFor="saveInfo"
                className="max-w-[20rem] sm:max-w-fit lg:min-w-full transition-opacity max-h-[1.5rem] flex items-center justify-start gap-[1rem]"
              >
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  className="min-w-[1.5rem] min-h-[1.5rem] accent-secondary-2"
                />
                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  Save this information for faster check-out next time
                </span>
              </label>
            </div>

            <div className="mt-[5rem] col-span-12 inline-flex flex-col items-center lg:items-start gap-[2rem]">
              {cartDataFlashsale.cart.map((item) => {
                return (
                  <div key={item.product._id} className="flex items-center gap-[1.5rem]">
                    <Image
                      className="max-w-[3.375rem] max-h-[3.375rem] object-contain"
                      src={item.image.location}
                      alt={item.productDetail.name}
                      width={1000}
                      height={1000}
                    />

                    <div className="min-w-[15rem] sm:min-w-[21.6875rem] flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                          {item.productDetail.name}
                        </span>
                        <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                          Quantity: {item.product.quantity}
                        </span>
                      </div>

                      <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                        {formattedMoney((item.productDetail.price * (100 - item.flashsales.discount)) / 100)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col items-start gap-[1rem]">
                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Subtotal: </span>

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    {formattedMoney(totalPrice)}
                  </span>
                </div>

                <hr className="min-w-[20rem] sm:min-w-[26.375rem] border-solid border-gray-400 border-[1px]" />

                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Shipping:</span>

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    {formattedMoney(parseInt(shipping?.feeShip, 10) / 24000 || 0)}
                  </span>
                </div>

                <hr className="min-w-[20rem] sm:min-w-[26.375rem] border-solid border-gray-400 border-[1px]" />

                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Total:</span>

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    {formattedMoney(parseInt(shipping?.feeShip, 10) / 24000 + totalPrice)}
                  </span>
                </div>
              </div>

              <div className="min-w-[20rem] sm:min-w-[26.6875rem] flex items-center justify-between">
                <label htmlFor="bank" className="transition-opacity flex items-center justify-center gap-[1rem]">
                  <input
                    className="min-w-[1.5rem] min-h-[1.5rem] accent-secondary-2"
                    type="radio"
                    id="bank"
                    name="bank-cash"
                    value="CREDIT_CARD"
                    checked
                    {...register("paymentType")}
                  />

                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Bank</span>
                </label>

                <div className="flex items-start gap-[0.5rem]">
                  <div className="flex min-w-[2.625rem] min-h-[1.75rem] px-[0.13125rem] py-[0.35rem] justify-center items-center">
                    <Image
                      className="max-w-[2.3625rem] max-h-[1.05rem] flex-shrink-0"
                      src="/assets/images/banks/bk.png"
                      width={1200}
                      height={800}
                      priority
                      alt="..."
                    />
                  </div>

                  <div className="flex min-w-[2.625rem] min-h-[1.75rem] px-[0.13125rem] py-[0.525rem]">
                    <Image
                      className="max-w-[2.3625rem] max-h-[0.7rem] flex-shrink-0"
                      src="/assets/images/banks/visa.png"
                      width={4096}
                      height={1256}
                      priority
                      alt="..."
                    />
                  </div>

                  <div className="flex min-w-[2.625rem] min-h-[1.75rem] p-[0.0875rem] items-center justify-center">
                    <Image
                      className="max-w-[2.45rem] max-h-[1.575rem] flex-shrink-0"
                      src="/assets/images/banks/master.png"
                      width={1280}
                      height={764}
                      priority
                      alt="..."
                    />
                  </div>

                  <div className="flex min-w-[2.625rem] min-h-[1.75rem] px-[0.0875rem] py-[0.30625rem items-center justify-center]">
                    <Image
                      className="max-w-[2.45rem] max-h-[1.575rem] flex-shrink-0"
                      src="/assets/images/banks/o.png"
                      width={3000}
                      height={2000}
                      priority
                      alt="..."
                    />
                  </div>
                </div>
              </div>

              <label
                htmlFor="cash"
                className="min-w-[20rem] sm:min-w-[26.6rem] transition-opacity flex items-center justify-start gap-[1rem]"
              >
                <input
                  className="min-w-[1.5rem] min-h-[1.5rem] accent-secondary-2"
                  type="radio"
                  id="cash"
                  name="bank-cash"
                  value="CASH"
                  {...register("paymentType")}
                />

                <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                  Cash on delivery
                </span>
              </label>

              <div className="sm:flex items-end gap-[1rem]">
                <input
                  className="mb-[1rem] sm:mb-0 py-[1rem] px-[1.5rem] rounded-[0.25rem] border-solid border-black border-[1px] max-h-[3.5rem] min-w-full sm:min-w-[18.75rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
                  type="text"
                  placeholder="Coupon Code"
                />

                <ViewAllProducts text="Apply Coupon" type="button" onClick={() => {}} />
              </div>

              <ViewAllProducts text="Place Order" type="submit" onClick={() => {}} />
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default CheckoutFlashsale;

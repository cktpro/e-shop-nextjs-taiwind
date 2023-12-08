import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { Form, Input, message } from "antd";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import ViewAllProducts from "@/components/buttons/viewAllProduct";
import Loading from "@/components/svg/loading";

import { axiosClient } from "@/helper/axios/axiosClient";
import { formattedMoney } from "@/helper/formatDocument";
import useAuthUser from "@/store/authUser";
import useCartStore from "@/store/cart/useCartStore";
import useFetchCheckout from "@/store/checkout";
import { useShippingStore } from "@/store/checkout/shipping";

function Checkout() {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm();
  const [address, setAddress] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({});
  const [districtId, setDistrictId] = useState("");
  let totalPrice = 0;
  const shipping = useShippingStore((state) => state);
  const { data: session, status } = useSession();
  const router = useRouter();
  const profile = useAuthUser((state) => state.profile);
  const cartData = useCartStore((state) => state);

  const [isLoading, setIsloading] = useState(false);

  const fetchCheckout = useFetchCheckout((state) => state.fetch);

  const urlVnpay = useFetchCheckout((state) => state.payload.url);
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
    cartData.getListCart();
    shipping.getProvince();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const profile = useAuthUser((state) => state.profile);
  // const getProfile = useAuthUser((state) => state.fetchAuthUser());
  useEffect(() => {
    if (status === "authenticated" && cartData.cart.length > 0) {
      shipping.getFee(profile?.address[0], cartData.cart);
      setAddress(profile?.address);
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
    setIsloading(true);
    const dayShip = new Date();
    dayShip.setDate(dayShip.getDate() + 3);
    const shipFee = (shipping.feeShip / 24000).toFixed(2);
    const finalTotal = (parseFloat(totalPrice) + parseFloat(shipFee)).toFixed(2);
    const orderDetails = cartData.cart.map((item) => {
      return {
        productId: item.product.productId,
        quantity: item.product.quantity,
        discount: item.productDetail.discount,
        price: item.productDetail.price,
      };
    });
    const order = {
      customerId: profile.id,
      shippedDate: dayShip,
      status: "WAITING",
      shippingFee: shipFee,
      totalPrice,
      shippingAddress: `${data.phoneNumber} - ${shippingAddress?.streetAddress} - ${shippingAddress?.wardName} - ${shippingAddress?.districtName} - ${shippingAddress?.provinceName}`,
      paymentType: data.paymentType,
      orderDetails,
    };
    try {
      const result = await axiosClient.post("orders", order);
      if (result) {
        setCookie("orderId", result?.data?.payload?._id);

        cartData.resetCart();

        if (data.paymentType === "CREDIT_CARD") {
          handlePlaceOrder(finalTotal);
        } else {
          router.push("/order-success");
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

      <div className="container mt-[5rem]">
        <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
          <Link
            href="/"
            className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Home
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <Link
            href="/cart"
            className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Cart
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">Checkout</span>
        </div>

        <h2 className="max-w-[15.75rem] mt-[5rem] text-text-2 font-inter text-[2.25rem] font-[500] leading-[1.875rem] tracking-[0.09rem] whitespace-nowrap">
          Billing Details
        </h2>

        {profile ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-w-full grid grid-cols-12 lg:flex items-start justify-between"
          >
            <div className="mt-[3rem] col-span-12 inline-flex flex-col items-center gap-[1.5rem]">
              <div className="flex flex-col items-start gap-[2rem]">
                <label htmlFor="firstName" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div className="max-h-[1.5rem]">
                    <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      First Name
                    </span>

                    <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>
                  {/* <Form.Item name="firstName" initialValue={session?.user?.firstName || 0}>
                  <Input className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]" />
                </Form.Item> */}
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={profile?.firstName || null}
                    {...register("firstName")}
                  />
                </label>

                <label htmlFor="companyName" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <span className="max-h-[1.5rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                    Last Name
                  </span>

                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={profile?.lastName || null}
                    {...register("lastName")}
                  />
                </label>
                {address.length > 0 && (
                  <label htmlFor="apartment" className="max-h-[full] flex flex-col items-start gap-[0.5rem]">
                    <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Your Address
                    </span>
                    {address.length > 0 &&
                      address.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className="flex justify-between items-center sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] p-[1rem]"
                          >
                            <span className=" max-w-[25rem] ">
                              {item?.streetAddress} - {item.wardName} - {item.districtName} <br /> - {item.provinceName}
                            </span>
                            <input
                              onClick={() => {
                                setShippingAddress(item);
                                shipping.getFee(item, cartData.cart);
                              }}
                              className="min-w-[1.5rem] min-h-[1.5rem] accent-secondary-2"
                              type="radio"
                              name="addressShipping"
                            />
                          </div>
                        );
                      })}
                    {/* <input
                type="text"
                id="apartment"
                name="apartment"
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                  </label>
                )}

                {address?.length <= 0 && (
                  <div className="flex flex-col items-start gap-[2rem]">
                    <label htmlFor="streetAddress" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                      <div>
                        <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                          Street Address
                        </span>

                        <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                      </div>

                      <input
                        required
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                        {...register("streetAddress", {
                          required: true,
                          onChange: (e) =>
                            setShippingAddress((prev) => ({
                              ...prev,
                              streetAddress: e.target.value,
                            })),
                        })}
                      />
                    </label>

                    <label htmlFor="apartment" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                      <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                        Province
                      </span>
                      <select
                        required
                        className=" min-w-full sm:min-w-[29.375rem] min-h-[3.125rem]  rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                        // onChange={(e) => shipping.getDistrict(e.target.value)}
                        name="province"
                        {...register("province", {
                          onChange: (e) => {
                            setShippingAddress((prev) => ({
                              ...prev,
                              provinceId: e.target.value,
                              provinceName: e.target.options[e.target.options.selectedIndex].text,
                            }));
                            shipping.getDistrict(e.target.value);
                          },
                        })}
                      >
                        <option value={null}>Select province</option>
                        {shipping?.isProvince === true &&
                          shipping?.provinceList?.map((item) => {
                            // if (item.ProvinceID.toString() === session?.user?.address[0]?.provinceId.toString()) {
                            //   return (
                            //     <option value={item.ProvinceID} key={item.ProvinceID} selected>
                            //       {item.ProvinceName}{" "}
                            //     </option>
                            //   );
                            // }
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
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                    </label>

                    <label htmlFor="city" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                      <div>
                        <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                          District
                        </span>

                        <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                      </div>
                      <select
                        className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
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
                              setShippingAddress((prev) => ({
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
                            // if (item.DistrictID.toString() === session?.user?.address[0]?.districtName.toString()) {
                            //   return (
                            //     <option value={item.DistrictID} key={item.DistrictID}>
                            //       {item.item.DistrictName}{" "}
                            //     </option>
                            //   );
                            // }
                            return (
                              <option value={item.DistrictID} key={item.DistrictID}>
                                {item.DistrictName}{" "}
                              </option>
                            );
                          })
                        ) : (
                          <>
                            {/* <option value={session?.user?.address[0]?.districtId} hidden>
                              {session?.user?.address[0]?.districtName}{" "}
                            </option> */}
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
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                    </label>

                    <label htmlFor="phoneNumber" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                      <div>
                        <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                          Ward
                        </span>

                        <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                      </div>
                      <select
                        className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                        name="distric"
                        // onChange={async (e) => {
                        //   setAddress((prev) => ({
                        //     ...prev,
                        //     wardIdId: e.target.value,
                        //     wardName: e.target.options[e.target.options.selectedIndex].text,
                        //   }));
                        //   handleChangeFee(e);
                        // }}
                        // defaultValue={session?.user?.address[0]?.wardId}
                        {...register("ward", {
                          onChange: (e) => {
                            setShippingAddress((prev) => ({
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
                            {/* <option value={session?.user?.address[0]?.wardId} hidden>
                              {session?.user?.address[0]?.wardName}
                            </option> */}
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
                className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
              /> */}
                    </label>
                  </div>
                )}

                <label htmlFor="phoneNumber" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Phone Number
                    </span>

                    <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>

                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
                    defaultValue={session?.user?.phoneNumber}
                    {...register("phoneNumber", { required: true })}
                  />
                </label>

                <label htmlFor="emailAddress" className="max-h-[5.125rem] flex flex-col items-start gap-[0.5rem]">
                  <div>
                    <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.4]">
                      Email Address
                    </span>

                    <span className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">*</span>
                  </div>

                  <input
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    className="min-w-full sm:min-w-[29.375rem] min-h-[3.125rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] px-[1rem]"
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
                  {...register("save")}
                />
                <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                  Save this information for faster check-out next time
                </span>
              </label>
            </div>

            <div className="mt-[5rem] col-span-12 inline-flex flex-col items-center lg:items-start gap-[2rem]">
              {/* <div className="flex items-center gap-[1.5rem]">
            <Image
              className="max-w-[3.375rem] max-h-[3.375rem] object-contain"
              src="/assets/images/products/banphimda.webp"
              alt="..."
              width={1000}
              height={1000}
            />

            <div className="min-w-[15rem] sm:min-w-[21.6875rem] flex items-center justify-between">
              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">LCD Monitor</span>

              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">$650</span>
            </div>
          </div> */}

              {cartData?.cart?.map((item) => {
                totalPrice +=
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ((item?.productDetail?.price * (100 - item?.productDetail?.discount)) / 100) *
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  item?.product?.quantity;
                return (
                  <div key={item.product._id} className="flex items-center gap-[1.5rem]">
                    <Image
                      className="max-w-[3.375rem] max-h-[3.375rem] object-contain"
                      // src="/assets/images/products/banphimda.webp"
                      src={item?.image?.location}
                      alt={item?.productDetail?.name}
                      width={1000}
                      height={1000}
                    />

                    <div className="min-w-[15rem] sm:min-w-[21.6875rem] flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="max-w-[12rem] sm:max-w-[18rem] truncate text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                          {item?.productDetail?.name}
                        </span>
                        <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                          Quantity: {item?.product.quantity}
                        </span>
                      </div>

                      <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                        {formattedMoney(item?.productDetail?.price)}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col items-start gap-[1rem]">
                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Subtotal: </span>

                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                    {formattedMoney(totalPrice)}
                  </span>
                </div>

                <hr className="min-w-[20rem] sm:min-w-[26.375rem] border-solid border-gray-400 border-[1px]" />

                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Shipping:</span>

                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                    {formattedMoney(parseInt(shipping?.feeShip, 10) / 24000 || 0)}
                  </span>
                </div>

                <hr className="min-w-[20rem] sm:min-w-[26.375rem] border-solid border-gray-400 border-[1px]" />

                <div className="flex items-start justify-between min-w-[20rem] sm:min-w-[26.375rem]">
                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Total:</span>

                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                    {/* {shipping.isLoading === false
                  ? formattedMoney(parseInt(shipping?.feeShip, 10) / 24000 + totalPrice)
                  : "Loading"} */}
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
                    {...register("paymentType")}
                    required
                  />

                  <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Bank</span>
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

                <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Cash on delivery</span>
              </label>

              <div className="sm:flex items-end gap-[1rem]">
                <input
                  className="mb-[1rem] sm:mb-0 py-[1rem] px-[1.5rem] rounded-[0.25rem] border-solid border-black border-[1px] max-h-[3.5rem] min-w-full sm:min-w-[18.75rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
                  type="text"
                  placeholder="Coupon Code"
                />

                <ViewAllProducts text="Apply Coupon" type="button" onClick={() => {}} />
              </div>

              <ViewAllProducts text="Place Order" type="submit" onClick={() => {}} />
            </div>
          </form>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default Checkout;

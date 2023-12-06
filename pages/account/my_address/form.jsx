import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import { axiosClient } from "@/helper/axios/axiosClient";
import { useShippingStore } from "@/store/checkout/shipping";

function FormAddress(props) {
  const { addressItem, onOk } = props;
  const shipping = useShippingStore((state) => state);
  const [newAddress, setNewAddress] = useState(addressItem);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = newAddress;
    console.log("◀◀◀ data ▶▶▶", data);
    try {
      const res = await axiosClient.put(`/customers/address/${addressItem.id}`, data);
      console.log("◀◀◀ res ▶▶▶", res);
      onOk();
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  useEffect(() => {
    shipping.getProvince();
    if (addressItem) {
      shipping.getDistrict(addressItem.ProvinceId);
      shipping.getWard(addressItem.districtId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-[1.5rem] px-[2.5rem]  py-[2.5rem] flex flex-col items-start justify-center max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom"
    >
      <span className="max-w-[12.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
        Edit Your Address
      </span>

      <div className="mt-[1rem] min-w-full flex flex-col items-start gap-[3.125rem]">
        <label htmlFor="firtsName" className="w-full flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Province</span>

          {/* <input
            defaultValue={address?.provinceName}
            autoComplete="off"
            type="text"
            id="firtsName"
            name="firtsName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
          <select
            className=" px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full max-h-[10rem]  min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            // onChange={(e) => shipping.getDistrict(e.target.value)}
            name="province"
            // defaultValue={session?.user?.address[0]?.provinceId || ""}
            // {...register("province", {
            onChange={(e) => {
              setNewAddress((prev) => ({
                ...prev,
                provinceId: e.target.value,
                provinceName: e.target.options[e.target.options.selectedIndex].text,
              }));
              shipping.getDistrict(e.target.value);
            }}
            // })}
          >
            {shipping?.isProvince === true &&
              shipping?.provinceList?.map((item) => {
                if (item.ProvinceID.toString() === addressItem.provinceId.toString()) {
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
        </label>

        <label htmlFor="lastName" className="w-full mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">District</span>

          {/* <input
            defaultValue={address?.districtName}
            autoComplete="off"
            type="text"
            id="lastName"
            name="lastName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
          <select
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full  min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            // onChange={(e) => shipping.getDistrict(e.target.value)}
            name="province"
            // defaultValue={session?.user?.address[0]?.provinceId || ""}
            // defaultValue={addressItem.provinceId}
            // {...register("province", {
            onChange={(e) => {
              setNewAddress((prev) => ({
                ...prev,
                districtId: e.target.value,
                districtName: e.target.options[e.target.options.selectedIndex].text,
              }));
              shipping.getWard(e.target.value);
            }}
            // })}
          >
            {shipping?.districtList?.length > 0 ? (
              shipping.districtList.map((item) => {
                if (item.DistrictID.toString() === addressItem.districtId.toString()) {
                  return (
                    <option value={item.DistrictID} key={item.DistrictID} selected>
                      {item.DistrictName}{" "}
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
              <option value="" disabled>
                Please choose province
              </option>
            )}
          </select>
        </label>

        <label htmlFor="email" className="w-full flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Ward</span>

          {/* <input
            defaultValue={address?.wardName}
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
          <select
            required
            autoComplete="off"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full  min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            name="distric"
            onChange={async (e) => {
              setNewAddress((prev) => ({
                ...prev,
                wardId: e.target.value,
                wardName: e.target.options[e.target.options.selectedIndex].text,
              }));
            }}
          >
            {shipping?.wardList?.length > 0 ? (
              shipping.wardList.map((item) => {
                if (item.WardCode.toString() === addressItem.wardId.toString()) {
                  return (
                    <option value={item.WardCode} key={item.WardCode} selected>
                      {item.WardName}{" "}
                    </option>
                  );
                }
                return (
                  <option value={item.WardCode} key={item.WardCode}>
                    {item.WardName}{" "}
                  </option>
                );
              })
            ) : (
              <option value="" disabled>
                Please choose distict
              </option>
            )}
          </select>
        </label>

        <label htmlFor="address" className="w-full mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Street Address</span>

          <input
            required
            autoComplete="off"
            defaultValue={addressItem?.streetAddress}
            type="text"
            id="address"
            name="address"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            onChange={(e) =>
              setNewAddress((prev) => ({
                ...prev,
                streetAddress: e.target.value,
              }))
            }
          />
        </label>
      </div>

      {/* <div className="mt-[1.5rem] min-w-full inline-flex flex-col items-start gap-[1rem]">
        <label htmlFor="currentPassword" className="min-w-full flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span>

          <div className="min-w-full flex flex-col items-start gap-[1rem]">
            <input
              defaultValue={address?.password}
              autoComplete="new-password"
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
            />

            <input
              id="NewPasswod"
              name="NewPasswod"
              type="password"
              placeholder="New Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
            />

            <input
              id="confirmNewPasswod"
              name="confirmNewPasswod"
              type="password"
              placeholder="Confirm New Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
            />
          </div>
        </label>
      </div> */}

      <div className="min-w-full flex items-center justify-end">
        <div className="mt-[1.5rem] inline-flex items-center gap-[2rem]">
          <button type="button" className="text font-poppins text-[1rem] font-[400] leading-[1.5rem]">
            Cancel
          </button>

          <ViewAllProducts text="Save Changes" type="submit" onClick={() => {}} />
        </div>
      </div>
    </form>
  );
}

export default FormAddress;
FormAddress.propTypes = {
  addressItem: PropTypes.instanceOf(Object).isRequired,
  onOk: PropTypes.func.isRequired,
};

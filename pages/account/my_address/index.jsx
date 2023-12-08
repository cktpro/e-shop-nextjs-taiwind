/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from "react";
import { message, Modal } from "antd";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import { axiosClient } from "@/helper/axios/axiosClient";
import { useShippingStore } from "@/store/checkout/shipping";

import AccountLayout from "../layout";

import FormAddress from "./form";

function MyAccount() {
  const [profile, setProfile] = useState({});
  const [address, setAddress] = useState([]);
  const [newAddress, setNewAddress] = useState({});
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const shipping = useShippingStore((state) => state);
  const getProfile = useCallback(async () => {
    try {
      const res = await axiosClient.get("/authCustomers/profile");
      setProfile(res?.data?.payload);
      setAddress(res?.data?.payload?.address);
    } catch (error) {
      setProfile(error?.response?.data || {});
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = newAddress;
    data.customerId = profile?.id;
    try {
      const res = await axiosClient.post("/customers/address", data);
      console.log("◀◀◀ res ▶▶▶", res);
      message.open({
        key: "update",
        type: "success",
        content: "Add address success",
      });
      getProfile();
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  const handleUpdate = async () => {
    message.open({
      key: "update",
      type: "success",
      content: "Update address success",
    });
    setOpen(false);
    getProfile();
    // data.customerId = profile?.id;
    // try {
    //   const res = await axiosClient.post("/customers/address", data);
    //   console.log("◀◀◀ res ▶▶▶", res);
    //   message.open({
    //     key: "update",
    //     type: "success",
    //     content: "Add address success",
    //   });
    // } catch (error) {
    //   console.log("◀◀◀ error ▶▶▶", error);
    // }
  };
  const handleDelete = async (id) => {
    console.log("◀◀◀ id ▶▶▶", id);
    try {
      const res = await axiosClient.delete(`/customers/address/${id}`);
      console.log("◀◀◀ res ▶▶▶", res);
      message.open({
        key: "update",
        type: "success",
        content: "Delete address success",
      });
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      message.open({
        key: "update",
        type: "error",
        content: "Delete address failed",
      });
    }

    getProfile();
    // data.customerId = profile?.id;
    // try {
    //   const res = await axiosClient.post("/customers/address", data);
    //   console.log("◀◀◀ res ▶▶▶", res);
    //   message.open({
    //     key: "update",
    //     type: "success",
    //     content: "Add address success",
    //   });
    // } catch (error) {
    //   console.log("◀◀◀ error ▶▶▶", error);
    // }
  };
  useEffect(() => {
    getProfile();
    shipping.getProvince();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom gap-[1rem]">
        <span className="max-w-[12.6875rem] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          Your Address
        </span>
        {address?.map((item) => {
          if (item.isDeleted === true) {
            return null;
          }
          return (
            <div
              key={item.id}
              className="w-full flex justify-between px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            >
              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                {item.streetAddress} - {item.wardName} - {item.districtName} - {item.provinceName}
              </span>{" "}
              <div className="flex gap-2">
                <button type="button" onClick={() => setOpen(true)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <Modal open={open} onCancel={() => setOpen(false)} footer>
                <FormAddress addressItem={item} onOk={handleUpdate} />
              </Modal>
            </div>
          );
        })}
        <ViewAllProducts
          text={!showForm ? "Add New Address" : "Close"}
          type="button"
          onClick={() => {
            setShowForm((prev) => !prev);
          }}
        />
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex-col items-start justify-center max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom ${
          showForm ? "flex" : "hidden"
        } `}
      >
        <span className="max-w-[12.6875rem] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          Add New Address
        </span>

        <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <label htmlFor="firtsName" className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Province</span>

            {/* <input
            defaultValue={address?.provinceName}
            autoComplete="off"
            type="text"
            id="firtsName"
            name="firtsName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
            <select
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
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
                  return (
                    <option value={item.ProvinceID} key={item.ProvinceID}>
                      {item.ProvinceName}{" "}
                    </option>
                  );
                })}
            </select>
          </label>

          <label htmlFor="lastName" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">District</span>

            {/* <input
            defaultValue={address?.districtName}
            autoComplete="off"
            type="text"
            id="lastName"
            name="lastName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
            <select
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
              // onChange={(e) => shipping.getDistrict(e.target.value)}
              name="province"
              // defaultValue={session?.user?.address[0]?.provinceId || ""}
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
        </div>

        <div className="mt-[1.5rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <label htmlFor="email" className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Ward</span>

            {/* <input
            defaultValue={address?.wardName}
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          /> */}
            <select
              required
              autoComplete="off"
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
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

          <label htmlFor="address" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Street Address</span>

            <input
              required
              autoComplete="off"
              type="text"
              id="address"
              name="address"
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
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
          <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span>

          <div className="min-w-full flex flex-col items-start gap-[1rem]">
            <input
              defaultValue={address?.password}
              autoComplete="new-password"
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="Current Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
            />

            <input
              id="NewPasswod"
              name="NewPasswod"
              type="password"
              placeholder="New Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
            />

            <input
              id="confirmNewPasswod"
              name="confirmNewPasswod"
              type="password"
              placeholder="Confirm New Passwod"
              className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
            />
          </div>
        </label>
      </div> */}

        <div className="min-w-full flex items-center justify-end">
          <div className="mt-[1.5rem] inline-flex items-center gap-[2rem]">
            <button type="button" className="text font-inter text-[1rem] font-[400] leading-[1.5rem]">
              Cancel
            </button>

            <ViewAllProducts text="Save Changes" type="submit" onClick={() => {}} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default MyAccount;
MyAccount.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};

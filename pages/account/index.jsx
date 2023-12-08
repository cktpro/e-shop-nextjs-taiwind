/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from "react";
import { Form, Input } from "antd";

import ViewAllProducts from "@/components/buttons/viewAllProduct";
import Loading from "@/components/svg/loading";

import { axiosClient } from "@/helper/axios/axiosClient";

import AccountLayout from "./layout";

function AccountPage() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const getProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/authCustomers/profile");
      setProfile(res?.data?.payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setProfile(error?.response?.data || {});
    }
  }, []);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (values) => {
    setComponentDisabled(true);
    setIsChanged(false);
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      birthday: values.birthday,
    };
    try {
      const res = await axiosClient.put(`/customers/${profile.id}`, data);
      console.log("◀◀◀ res ▶▶▶", res);
      setComponentDisabled(false);
      setIsChanged(false);
    } catch (error) {
      setComponentDisabled(false);
      setIsChanged(false);
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  if (!loading) {
    return profile?.isGoogle ? (
      <form className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
        <span className="max-w-[9.6875rem] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          Edit Your Profile
        </span>

        <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <label htmlFor="firtsName" className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">First Name</span>

            <input
              defaultValue={profile?.firstName}
              autoComplete="off"
              type="text"
              id="firtsName"
              name="firtsName"
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            />
          </label>

          <label htmlFor="lastName" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Last Name</span>

            <input
              defaultValue={profile?.lastName}
              autoComplete="off"
              type="text"
              id="lastName"
              name="lastName"
              className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
            />
          </label>
        </div>

        <div className="min-w-full flex items-center justify-end">
          <div className="mt-[1.5rem] inline-flex items-center gap-[2rem]">
            <button type="button" className="text font-inter text-[1rem] font-[400] leading-[1.5rem]">
              Cancel
            </button>

            <ViewAllProducts text="Save Changes" type="submit" onClick={() => {}} />
          </div>
        </div>
      </form>
    ) : (
      <Form
        onChange={() => setIsChanged(true)}
        disabled={componentDisabled}
        layout="vertical"
        onFinish={handleSubmit}
        className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom"
      >
        <span className="max-w-[9.6875rem] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          Edit Your Profile
        </span>

        <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">First Name</span>

            <Form.Item
              name="firstName"
              initialValue={profile?.firstName}
              rules={[
                {
                  required: true,
                  message: "Firstname is required",
                },
              ]}
            >
              <Input className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1" />
            </Form.Item>
          </div>

          <div className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Last Name</span>

            <Form.Item
              name="lastName"
              initialValue={profile?.lastName}
              rules={[
                {
                  required: true,
                  message: "Lastname is required",
                },
              ]}
            >
              <Input className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1" />
            </Form.Item>
          </div>
        </div>

        <div className="mt-[1.5rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Email</span>

            <Form.Item
              name="email"
              initialValue={profile?.email}
              rules={[
                {
                  type: "email",
                  message: "Email not valid",
                },
                {
                  required: true,
                  message: "Lastname is required",
                },
              ]}
            >
              <Input className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1" />
            </Form.Item>
          </div>

          <div className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Phone Number</span>

            <Form.Item
              name="phoneNumber"
              initialValue={profile?.phoneNumber}
              rules={[
                {
                  required: true,
                  message: "Phonenumber is required",
                },
              ]}
            >
              <Input className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1" />
            </Form.Item>
          </div>
        </div>
        <div className="mt-[1.5rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Birthday</span>

            <Form.Item
              name="birthday"
              initialValue={new Date(profile?.birthday).toLocaleDateString("eu-ES")}
              rules={[
                {
                  type: "date",
                  message: "Birthday is not valid",
                },
                {
                  required: true,
                  message: "Birthday is required",
                },
              ]}
            >
              <Input className="px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1" />
            </Form.Item>
          </div>
        </div>

        {/* <div className="mt-[1.5rem] min-w-full inline-flex flex-col items-start gap-[1rem]">
          <label htmlFor="currentPassword" className="min-w-full flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span>
  
            <div className="min-w-full flex flex-col items-start gap-[1rem]">
              <input
                defaultValue={profile?.password}
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
            <button
              type="button"
              className="text font-inter text-[1rem] font-[400] leading-[1.5rem]"
              disabled={componentDisabled}
            >
              Cancel
            </button>

            <button
              // eslint-disable-next-line react/button-has-type
              type="submit"
              className="disabled:opacity-50 inline-flex px-[3rem] py-[1rem] min-h-[3.5rem] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-button-2"
              disabled={!isChanged}
            >
              <span className="min-h-[1.5rem] text-text-1 font-inter text-[1rem] font[500] leading-[1.5rem] whitespace-nowrap">
                Save Changes
              </span>
            </button>
            {/* <button type="submit">Save change</button> */}
          </div>
        </div>
      </Form>
    );
  }
  return (
    <div className="w-full flex justify-center items-center">
      <Loading />
    </div>
  );
}

export default AccountPage;
AccountPage.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};

import React, { useCallback, useEffect, useState } from "react";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import { axiosClient } from "@/helper/axios/axiosClient";

import AccountLayout from "./layout";

function AccountPage() {
  const [profile, setProfile] = useState({});

  const getProfile = useCallback(async () => {
    try {
      const res = await axiosClient.get("/authCustomers/profile");
      setProfile(res?.data?.payload);
    } catch (error) {
      setProfile(error?.response?.data || {});
    }
  }, []);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return profile?.isGoogle ? (
    <form className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
      <span className="max-w-[9.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
        Edit Your Profile
      </span>

      <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
        <label htmlFor="firtsName" className="flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">First Name</span>

          <input
            defaultValue={profile?.firstName}
            autoComplete="off"
            type="text"
            id="firtsName"
            name="firtsName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>

        <label htmlFor="lastName" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Last Name</span>

          <input
            defaultValue={profile?.lastName}
            autoComplete="off"
            type="text"
            id="lastName"
            name="lastName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>
      </div>

      <div className="mt-[1.5rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
        {/* <label htmlFor="email" className="flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Email</span>

          <input
            defaultValue={profile?.email}
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label> */}

        {/* <label htmlFor="address" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Address</span>

          <input
            defaultValue={profile?.address}
            autoComplete="off"
            type="text"
            id="address"
            name="address"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label> */}
      </div>

      {/* <div className="mt-[1.5rem] min-w-full inline-flex flex-col items-start gap-[1rem]">
        <label htmlFor="currentPassword" className="min-w-full flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span>

          <div className="min-w-full flex flex-col items-start gap-[1rem]">
            <input
              defaultValue={profile?.password}
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
  ) : (
    <form className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
      <span className="max-w-[9.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
        Edit Your Profile
      </span>

      <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
        <label htmlFor="firtsName" className="flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">First Name</span>

          <input
            defaultValue={profile?.firstName}
            autoComplete="off"
            type="text"
            id="firtsName"
            name="firtsName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>

        <label htmlFor="lastName" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Last Name</span>

          <input
            defaultValue={profile?.lastName}
            autoComplete="off"
            type="text"
            id="lastName"
            name="lastName"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>
      </div>

      <div className="mt-[1.5rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
        <label htmlFor="email" className="flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Email</span>

          <input
            defaultValue={profile?.email}
            autoComplete="off"
            type="text"
            id="email"
            name="email"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>

        <label htmlFor="address" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Address</span>

          <input
            defaultValue={profile?.address}
            autoComplete="off"
            type="text"
            id="address"
            name="address"
            className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
          />
        </label>
      </div>

      <div className="mt-[1.5rem] min-w-full inline-flex flex-col items-start gap-[1rem]">
        <label htmlFor="currentPassword" className="min-w-full flex flex-col items-start gap-[0.5rem]">
          <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span>

          <div className="min-w-full flex flex-col items-start gap-[1rem]">
            <input
              defaultValue={profile?.password}
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
      </div>

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

export default AccountPage;
AccountPage.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};

import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, message } from "antd";

import Loading from "@/components/svg/loading";

import { axiosClient } from "@/helper/axios/axiosClient";

import AccountLayout from "../layout";

function ChangePass() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
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
    try {
      await axiosClient.post(`/customers/change-password/${profile.id}`, values);
      message.success("Change password success");
      setComponentDisabled(false);
    } catch (error) {
      if (error.response.status === 412) message.error("Current password not match");
      setComponentDisabled(false);
    }
  };
  if (!loading) {
    return profile?.isGoogle ? (
      <form className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
        <span className="max-w-[full] text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          The password change function cannot be performed with a google account
        </span>

        {/* <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
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
        </div> */}
      </form>
    ) : (
      <Form
        disabled={componentDisabled}
        layout="vertical"
        onFinish={handleSubmit}
        className="w-full px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center  max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom"
      >
        <span className="max-w-full text-secondary-2 font-inter text-[1.25rem] font-[500] leading-[1.75rem]">
          Change you password
        </span>

        {/* <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
          <div className="flex flex-col items-start gap-[0.5rem]">
            <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Cu</span>

            <Form.Item
              name="currentPass"
              rules={[
                {
                  required: true,
                  message: "Current password is required",
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
              initialValue={new Date(profile?.birthday).toLocaleDateString()}
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
        </div> */}

        <div className="mt-[1.5rem] min-w-full inline-flex flex-col items-start gap-[1rem]">
          <div htmlFor="currentPassword" className="min-w-full flex flex-col items-start gap-[0.5rem]">
            {/* <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Password Changes</span> */}

            <div className="min-w-full flex flex-col items-start gap-[1rem]">
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                // hasFeedback
              >
                <Input.Password
                  placeholder="Current Password"
                  visibilityToggle={false}
                  className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                dependencies={["currentPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please input new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("currentPassword") !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The new password must not be the same as the old password!"));
                    },
                  }),
                ]}
                // hasFeedback
              >
                <Input.Password
                  placeholder="New Password"
                  visibilityToggle={false}
                  className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={["newPassword"]}
                // hasFeedback

                rules={[
                  {
                    required: true,
                    message: "Please confirm new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("The new password that you entered do not match!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  visibilityToggle={false}
                  className="min-w-full md:min-w-[44.375rem] min-h-[3.125rem] flex-shrink-0 rounded-[0.25rem] bg-secondary-1 px-[1rem] py-[0.81rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]"
                />
              </Form.Item>
              {/* <input
                // defaultValue={profile?.password}
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
              /> */}
            </div>
          </div>
        </div>

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
              disabled={componentDisabled}
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

export default ChangePass;
ChangePass.getLayout = function getLayout(page) {
  return <AccountLayout>{page}</AccountLayout>;
};

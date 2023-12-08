import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import BtnOk from "@/components/buttons/btnOk";
import Loading from "@/components/svg/loading";
import LogoGoogle from "@/components/svg/logoGoogle";

import createUser from "@/store/createUser";

import styles from "./signUp.module.scss";

function SignUp() {
  const createCustomer = createUser((state) => state);

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validation = {
    firstName: {
      ...register("firstName", { required: { value: true, message: "First name is required" } }),
    },

    lastName: {
      ...register("lastName", { required: { value: true, message: "Last name is required" } }),
    },

    email: {
      ...register("email", {
        required: { value: true, message: "Email is required" },
        // eslint-disable-next-line no-useless-escape
        pattern: { value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Invalid email format" },
      }),
    },

    phoneNumber: {
      ...register("phoneNumber", {
        required: { value: true, message: "Phone number is required" },
        // eslint-disable-next-line no-useless-escape
        pattern: {
          value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
          message: "Invalid Phone number format",
        },
      }),
    },

    password: {
      ...register("password", {
        required: { value: true, message: "Password is required" },
        validate: (fieldValue) => {
          return (fieldValue.length >= 6 && fieldValue.length <= 16) || "Password must be between 6 and 16 characters";
        },
      }),
    },
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = useCallback(
    (data) => {
      createCustomer.post(data);
    },
    [createCustomer],
  );

  useEffect(() => {
    if (createCustomer?.payload?.message !== "") {
      if (createCustomer?.payload?.statusCode === 400) {
        openNotificationWithIcon("error", createCustomer?.payload?.message);

        createCustomer.reset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCustomer.payload]);

  const handleClickOk = useCallback(() => {
    createCustomer.reset();

    router.push("/log-in");
  }, [createCustomer, router]);

  return (
    <>
      {contextHolder}

      {createCustomer.isLoading && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

      <div
        className={classNames(
          createCustomer?.payload?.statusCode === 200
            ? "fixed top-0 z-[9999] w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-50"
            : "fixed top-0 opacity-0 transition-all duration-300 z-[-9999] w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-50",
        )}
      >
        <div
          className={classNames(
            createCustomer?.payload?.statusCode === 200
              ? "min-w-[20rem] min-h-[10rem] scale-100 transition-all duration-300 flex flex-col py-[3rem] items-center justify-center gap-[2rem] bg-white rounded-[1rem]"
              : "min-w-[20rem] min-h-[10rem] scale-0 transition-all duration-300 flex flex-col py-[3rem] items-center justify-center gap-[2rem] bg-white rounded-[1rem]",
          )}
        >
          <span className="text-text-2 font-inter text-[1rem] font-[600] leading-[1.5rem]">
            Create account successful
          </span>

          <BtnOk handleClickOk={handleClickOk} />
        </div>
      </div>

      {isClient && (
        <div className="container mt-[3.75rem] max-w-[1480px] flex justify-center 2xl:justify-start items-center gap-[8.0625rem]">
          <div className="hidden 2xl:flex w-[50.3125rem] h-[48.8125rem] pt-[75px] justify-end items-center rounded-tl-0 rounded-tr-0.25rem rounded-br-0.25rem rounded-bl-0 bg-[#CBE4E8]">
            <div className={classNames("w-[57.4375rem] h-[44.125rem]", styles.left_banner)} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center 2xl:items-start gap-[3rem]">
            <div className="flex flex-col items-start gap-[1.5rem]">
              <span className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[1.875rem] tracking-[0.09rem]">
                Create an account
              </span>

              <span className="text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                Enter your details below
              </span>
            </div>

            <div className="flex flex-col items-center gap-[2.5rem]">
              <div className="flex flex-col items-start gap-[2.5rem]">
                <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                  <input
                    {...validation.firstName}
                    className={classNames(
                      "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                      errors.firstName && "border-solid border-secondary-2 border-[2px]",
                    )}
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                  />

                  {errors.firstName && (
                    <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                  <input
                    {...validation.lastName}
                    className={classNames(
                      "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                      errors.lastName && "border-solid border-secondary-2 border-[2px]",
                    )}
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />

                  {errors.lastName && (
                    <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                  <input
                    {...validation.email}
                    className={classNames(
                      "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                      errors.email && "border-solid border-secondary-2 border-[2px]",
                    )}
                    type="text"
                    name="email"
                    placeholder="Email"
                  />

                  {errors.email && (
                    <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                  <input
                    {...validation.phoneNumber}
                    className={classNames(
                      "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                      errors.phoneNumber && "border-solid border-secondary-2 border-[2px]",
                    )}
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                  />

                  {errors.phoneNumber && (
                    <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                  <input
                    {...validation.password}
                    className={classNames(
                      "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                      errors.password && "border-solid border-secondary-2 border-[2px]",
                    )}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />

                  {errors.password && (
                    <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start gap-[1rem]">
                <button
                  type="submit"
                  className="flex px-[7.625rem] h-[3.5rem] py-[1rem ] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-button-2"
                >
                  <span className="text-text-1 font-inter text-[1rem] font-[500] leading-[1.5rem]">Create Account</span>
                </button>

                <div className="flex flex-col items-center gap-[2rem]">
                  <button
                    onClick={() => signIn("google")}
                    // onClick={() => signIn("facebook")}
                    type="button"
                    className="h-[3.5rem] w-[23.1875rem] flex flex-col px-[5.375rem] py[1rem] items-center justify-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-black whitespace-nowrap"
                  >
                    <div className="flex items-start gap-[1rem]">
                      <LogoGoogle />

                      <span className="flex items-center justify-center text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                        Sign up with Google
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-[1rem]">
                    <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem] opacity-[0.7]">
                      Already have account?
                    </span>

                    <Link
                      href="./log-in"
                      className="flex items-start h-[1.65rem] border-solid border-b-black border-b-[1px] border-opacity-50 text-text-2 font-inter text-[1rem] font-[600] leading-[1.5rem] opacity-[0.7]"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default SignUp;

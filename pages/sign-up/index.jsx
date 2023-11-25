import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";
import { signIn } from "next-auth/react";

import LogoGoogle from "@/components/svg/logoGoogle";

import styles from "./signUp.module.scss";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validation = {
    name: {
      ...register("name", { required: { value: true, message: "Name is required" } }),
    },

    email: {
      ...register("email", {
        required: { value: true, message: "Email is required" },
        // eslint-disable-next-line no-useless-escape
        pattern: { value: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, message: "Invalid email format" },
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

  const onSubmit = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log("««««« data »»»»»", data);
  }, []);

  return (
    isClient && (
      <div className="container mt-[3.75rem] max-w-[1480px] flex justify-center 2xl:justify-start items-center gap-[8.0625rem]">
        <div className="hidden 2xl:flex w-[50.3125rem] h-[48.8125rem] pt-[75px] justify-end items-center rounded-tl-0 rounded-tr-0.25rem rounded-br-0.25rem rounded-bl-0 bg-[#CBE4E8]">
          <div className={classNames("w-[57.4375rem] h-[44.125rem]", styles.left_banner)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center 2xl:items-start gap-[3rem]">
          <div className="flex flex-col items-start gap-[1.5rem]">
            <span className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[1.875rem] tracking-[0.09rem]">
              Create an account
            </span>

            <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
              Enter your details below
            </span>
          </div>

          <div className="flex flex-col items-center gap-[2.5rem]">
            <div className="flex flex-col items-start gap-[2.5rem]">
              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  {...validation.name}
                  className={classNames(
                    "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]",
                    errors.name && "border-solid border-secondary-2 border-[2px]",
                  )}
                  type="text"
                  name="name"
                  placeholder="Name"
                />

                {errors.name && (
                  <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  {...validation.email}
                  className={classNames(
                    "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]",
                    errors.email && "border-solid border-secondary-2 border-[2px]",
                  )}
                  type="text"
                  name="email"
                  placeholder="Email or Phone Number"
                />

                {errors.email && (
                  <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  {...validation.password}
                  className={classNames(
                    "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]",
                    errors.password && "border-solid border-secondary-2 border-[2px]",
                  )}
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                {errors.password && (
                  <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
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
                <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Create Account</span>
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

                    <span className="flex items-center justify-center text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                      Sign up with Google
                    </span>
                  </div>
                </button>

                <div className="flex items-center gap-[1rem]">
                  <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] opacity-[0.7]">
                    Already have account?
                  </span>

                  <Link
                    href="./log-in"
                    className="flex items-start h-[1.65rem] border-solid border-b-black border-b-[1px] border-opacity-50 text-text-2 font-poppins text-[1rem] font-[600] leading-[1.5rem] opacity-[0.7]"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  );
}

export default SignUp;

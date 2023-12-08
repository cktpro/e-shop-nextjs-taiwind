import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Link from "next/link";
import { signIn } from "next-auth/react";

import BtnOk from "@/components/buttons/btnOk";
import Loading from "@/components/svg/loading";
import LogoGoogle from "@/components/svg/logoGoogle";

import useCartStore from "@/store/cart/useCartStore";

import styles from "./logIn.module.scss";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validation = {
    username: { ...register("username", { required: true }) },
    password: { ...register("password", { required: true }) },
  };

  const [isLoading, setIsLoading] = useState(false);

  const [isHaveError, setIsHaveError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const resetCartItem = useCartStore((state) => state.resetCart);

  useEffect(() => {
    resetCartItem();
  }, [resetCartItem]);

  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: data.username,
        password: data.password,
        redirect: false,
      });

      if (res.error) {
        setIsLoading(false);
        setErrorMessage("Unauthorized");
        setIsHaveError(true);
        return;
      }

      window.location.reload();
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error);
      setIsHaveError(true);
    }
  }, []);

  const handleClickOk = useCallback(() => {
    setIsHaveError(false);
  }, []);

  useEffect(() => {
    const blockEnterKey = (event) => {
      if (event.keyCode === 13 && (isLoading || isHaveError)) {
        event.preventDefault();
      }
    };

    document.addEventListener("keypress", blockEnterKey);

    return () => {
      document.removeEventListener("keypress", blockEnterKey);
    };
  }, [isHaveError, isLoading]);

  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.3)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

      <div
        className={classNames(
          isHaveError
            ? "fixed top-0 z-[9999] w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-50"
            : "fixed top-0 opacity-0 transition-all duration-300 z-[-9999] w-screen h-screen flex items-center justify-center bg-gray-400 bg-opacity-50",
        )}
      >
        <div
          className={classNames(
            isHaveError
              ? "min-w-[20rem] min-h-[10rem] scale-100 transition-all duration-300 flex flex-col py-[3rem] items-center justify-center gap-[2rem] bg-white rounded-[1rem]"
              : "min-w-[20rem] min-h-[10rem] scale-0 transition-all duration-300 flex flex-col py-[3rem] items-center justify-center gap-[2rem] bg-white rounded-[1rem]",
          )}
        >
          <span className="text-text-2 font-inter text-[1rem] font-[600] leading-[1.5rem]">{errorMessage}</span>

          <BtnOk handleClickOk={handleClickOk} />
        </div>
      </div>

      <div className="container mt-[3.75rem] max-w-[1480px] flex justify-center 2xl:justify-start items-center gap-[8.0625rem]">
        <div className="hidden 2xl:flex w-[50.3125rem] h-[48.8125rem] pt-[75px] justify-end items-center rounded-tl-0 rounded-tr-0.25rem rounded-br-0.25rem rounded-bl-0 bg-[#CBE4E8]">
          <div className={classNames("w-[57.4375rem] h-[44.125rem]", styles.left_banner)} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center 2xl:items-start gap-[3rem]">
          <div className="flex flex-col items-start gap-[1.5rem]">
            <span className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[1.875rem] tracking-[0.09rem]">
              Log in to E-Shop
            </span>

            <span className="text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
              Enter your details below
            </span>
          </div>

          <div className="flex flex-col items-center gap-[2.5rem]">
            <div className="flex flex-col items-start gap-[2.5rem]">
              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  {...validation.username}
                  className={classNames(
                    "pl-[0.5rem] w-[23.125rem] h-[2rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]",
                    errors.username && "border-solid border-secondary-2 border-[2px]",
                  )}
                  type="text"
                  name="username"
                  placeholder="Email"
                />

                {errors.username && (
                  <p className="w-[23.125rem] h-[2rem] text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                    Username is required.
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
                    Password is required.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-[5.4375rem]">
              <button
                type="submit"
                className="flex px-[3rem] h-[3.5rem]  py-[1rem ] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-button-2"
              >
                <span className="text-text-1 font-inter text-[1rem] font-[500] leading-[1.5rem]">Log In</span>
              </button>

              <Link href="/" className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Forget Password?
              </Link>
            </div>

            <button
              onClick={() => signIn("google")}
              // onClick={() => signIn("facebook")}
              type="button"
              className="h-[3.5rem] w-[23.1875rem] flex flex-col px-[5.375rem] py[1rem] items-center justify-center gap-[0.625rem] rounded-[0.25rem] border-solid border-[1px] border-black whitespace-nowrap"
            >
              <div className="flex items-start gap-[1rem]">
                <LogoGoogle />

                <span className="flex items-center justify-center text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                  Log in with Google
                </span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;

"use client";

import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import { signIn } from "next-auth/react";

import BtnOk from "@/components/buttons/btnOk";
import Loading from "@/components/svg/loading";

import withAuth from "@/helper/wraperLogged";

import styles from "./logIn.module.scss";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const [isHaveError, setIsHaveError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const username = e.target.username.value;
      const password = e.target.password.value;

      const res = await signIn("credentials", {
        email: username,
        password,
        redirect: false,
      });

      if (res.error) {
        setIsLoading(false);
        setErrorMessage("Unauthorized");
        setIsHaveError(true);
      }
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
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.9)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
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
          <span className="text-text-2 font-poppins text-[1rem] font-[600] leading-[1.5rem]">{errorMessage}</span>

          <BtnOk handleClickOk={handleClickOk} />
        </div>
      </div>

      <div className="container mt-[3.75rem] max-w-[1480px] flex justify-center 2xl:justify-start items-center gap-[8.0625rem]">
        <div className="hidden 2xl:flex w-[50.3125rem] h-[48.8125rem] pt-[75px] justify-end items-center rounded-tl-0 rounded-tr-0.25rem rounded-br-0.25rem rounded-bl-0 bg-[#CBE4E8]">
          <div className={classNames("w-[57.4375rem] h-[44.125rem]", styles.left_banner)} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center 2xl:items-start gap-[3rem]">
          <div className="flex flex-col items-start gap-[1.5rem]">
            <span className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[1.875rem] tracking-[0.09rem]">
              Log in to Exclusive
            </span>

            <span className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
              Enter your details below
            </span>
          </div>

          <div className="flex flex-col items-center gap-[2.5rem]">
            <div className="flex flex-col items-start gap-[2.5rem]">
              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  className="w-[23.125rem] h-[2rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
                  type="text"
                  name="username"
                  placeholder="Email or Phone Number"
                />
              </div>

              <div className="flex flex-col items-start gap-[0.5rem] text-text-2 border-solid border-b-black border-b-[1px] border-opacity-50">
                <input
                  className="w-[23.125rem] h-[2rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center gap-[5.4375rem]">
              <button
                type="submit"
                className="flex px-[3rem] h-[3.5rem]  py-[1rem ] justify-center items-center gap-[0.625rem] rounded-[0.25rem] bg-button-2"
              >
                <span className="text-text-1 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Log In</span>
              </button>

              <Link href="./" className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                Forget Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default withAuth(Login);

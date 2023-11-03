import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Loading from "@/components/svg/loading";

import styles from "./logIn.module.scss";

function LogIn() {
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const getToken = getCookie("TOKEN");

  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getToken);
  }, [getToken]);

  useEffect(() => {
    if (token) {
      push("/");
    }
  }, [push, token]);

  const handleSubmit = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        setIsLoading(true);

        const username = e.target.username.value;
        const password = e.target.password.value;

        const data = {
          username,
          password,
        };

        const responsive = await axios.post("https://fakestoreapi.com/auth/login", data);

        setCookie("TOKEN", responsive.data.token);

        // setIsLoading(false);

        push("/");
      } catch (error) {
        setIsLoading(false);
      }
    },
    [push],
  );

  return (
    <>
      {(isLoading || token) && (
        <div className="h-screen w-screen bg-[rgba(255,255,255,0.9)] fixed top-0 flex items-center justify-center cursor-default z-[9999]">
          <Loading />
        </div>
      )}

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

export default LogIn;

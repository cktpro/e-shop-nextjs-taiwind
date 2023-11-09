import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import { MenuSquare, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import { useOutsideLeftDrawderClick } from "@/helper/clickOutsideElement";

import styles from "./account.module.scss";

function AccountPage() {
  const router = useRouter();

  const [isHaveToken, setIsHaveToken] = useState(false);

  const [isOpenDrawderLeft, setIsOpenDrawderLeft] = useState(false);

  const openDrawerLeft = useCallback(() => setIsOpenDrawderLeft(true), []);

  const closeDrawerLeft = useCallback(() => setIsOpenDrawderLeft(false), []);

  const leftDrawderRef = useOutsideLeftDrawderClick(openDrawerLeft, closeDrawerLeft, isOpenDrawderLeft);

  useEffect(() => {
    const getToken = getCookie("TOKEN");

    if (!getToken) {
      router.push("/log-in");
    } else {
      setIsHaveToken(true);
    }
  }, [router]);

  return isHaveToken ? (
    <div className="container relative mt-[5rem] flex flex-col items-center justify-center">
      <div
        ref={isOpenDrawderLeft ? leftDrawderRef : null}
        className={classNames(
          styles.left_drawder,
          "fixed top-[7rem] left-0 h-screen min-w-fit shadow-md bg-text-1 z-[2]",
          !isOpenDrawderLeft && "hidden",
        )}
      >
        <button
          type="button"
          onClick={closeDrawerLeft}
          className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-20 right-3"
        >
          <XCircle />
        </button>

        <ul className="mt-[10rem] ml-[3rem] mr-[2rem] flex flex-col items-start justify-center">
          <li className="flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[10.375rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                Manage My Account
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account">
                  My Profile
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  Address Book
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Payment Options
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1.5rem] flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[5.125rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                My Orders
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Returns
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Cancellations
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1rem]">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/wish-list">
              <span className="max-w-[5.8125rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                My WishList
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <button
        ref={!isOpenDrawderLeft ? leftDrawderRef : null}
        type="button"
        className="xl:hidden absolute top-[4rem] left-10"
      >
        <MenuSquare />
      </button>

      <div className="flex items-center justify-between min-w-full">
        <div className="whitespace-nowrap flex items-center gap-[0.75rem] max-h-[1.3125rem] max-w-[9.6875rem]">
          <Link
            href="/"
            className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Home
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">My Account</span>
        </div>

        <span className="min-w-[8.6875rem] whitespace-nowrap text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
          Welcome!{" "}
          <span className="text-secondary-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">Md Rimel</span>
        </span>
      </div>

      <div className="mt-[5rem] flex items-start justify-center lg:gap-[6.25rem]">
        <ul className="hidden xl:flex flex-col items-start justify-center">
          <li className="flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[10.375rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                Manage My Account
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="text-secondary-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account">
                  My Profile
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  Address Book
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Payment Options
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1.5rem] flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[5.125rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                My Orders
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Returns
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
                  My Cancellations
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1rem]">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/wish-list">
              <span className="max-w-[5.8125rem] text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">
                My WishList
              </span>
            </Link>
          </li>
        </ul>

        <form className="px-[2.5rem] sm:px-[5rem] py-[2.5rem] flex flex-col items-start justify-center max-w-[54.375rem] sm:max-h-[39.375rem] flex-shrink-0 rounded-[0.25rem] bg-primary-1 shadow-custom">
          <span className="max-w-[9.6875rem] text-secondary-2 font-poppins text-[1.25rem] font-[500] leading-[1.75rem]">
            Edit Your Profile
          </span>

          <div className="mt-[1rem] min-w-full sm:inline-flex items-start gap-[3.125rem]">
            <label htmlFor="firtsName" className="flex flex-col items-start gap-[0.5rem]">
              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">First Name</span>

              <input
                type="text"
                id="firtsName"
                name="firtsName"
                className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
              />
            </label>

            <label htmlFor="lastName" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Last Name</span>

              <input
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
                type="text"
                id="email"
                name="email"
                className="px-[1rem] py-[0.81rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem] min-w-full md:min-w-[20.625rem] min-h-[3.125rem] flex-shrink-0-s rounded-[0.25rem] bg-secondary-1"
              />
            </label>

            <label htmlFor="address" className="mt-[1.5rem] sm:mt-0 flex flex-col items-start gap-[0.5rem]">
              <span className="text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem]">Address</span>

              <input
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
      </div>
    </div>
  ) : null;
}

export default AccountPage;

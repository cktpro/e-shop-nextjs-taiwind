import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { MenuSquare, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { axiosClient } from "@/helper/axios/axiosClient";
import { useOutsideLeftDrawderClick } from "@/helper/clickOutsideElement";

import styles from "./account.module.scss";

function AccountLayout({ children }) {
  const router = useRouter();
  const [isOpenDrawderLeft, setIsOpenDrawderLeft] = useState(false);

  const openDrawerLeft = useCallback(() => setIsOpenDrawderLeft(true), []);

  const closeDrawerLeft = useCallback(() => setIsOpenDrawderLeft(false), []);

  const leftDrawderRef = useOutsideLeftDrawderClick(openDrawerLeft, closeDrawerLeft, isOpenDrawderLeft);

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
  return (
    <div className="container relative mt-[5rem] flex flex-col items-start justify-center">
      {/* Mobile */}
      <div
        ref={isOpenDrawderLeft ? leftDrawderRef : null}
        className={classNames(
          styles.left_drawder,
          "fixed top-[7rem] left-0 h-screen min-w-fit bg-white shadow-md z-[2]",
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
              <span className="max-w-[10.375rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                Manage My Account
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="text-secondary-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account">
                  My Profile
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account/my_address">
                  Address Book
                </Link>
              </li>

              <li className="opacity-50 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account/change_password">
                  Change Password
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1.5rem] flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[5.125rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                My Orders
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li className="opacity-50 text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                <Link
                  className="hover:opacity-50"
                  onClick={closeDrawerLeft}
                  href={`/account/my_orders?customerId=${profile.id}`}
                >
                  Order List
                </Link>
              </li>
            </ul>
          </li>

          {/* <li className="mt-[1rem]">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/wish-list">
              <span className="max-w-[5.8125rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                My WishList
              </span>
            </Link>
          </li> */}
        </ul>
      </div>

      <button
        ref={!isOpenDrawderLeft ? leftDrawderRef : null}
        type="button"
        className="xl:hidden absolute top-[4rem] left-10"
      >
        <MenuSquare />
      </button>
      {/* Desktop */}
      <div className="flex items-center justify-between min-w-full">
        <div className="whitespace-nowrap flex items-center gap-[0.75rem] max-h-[1.3125rem] max-w-[9.6875rem]">
          <Link
            href="/"
            className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
          >
            Home
          </Link>

          <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">
            /
          </span>

          <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">My Account</span>
        </div>

        <span className="min-w-[8.6875rem] whitespace-nowrap text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
          Welcome!{" "}
          <span className="text-secondary-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
            {profile?.fullName}
          </span>
        </span>
      </div>

      <div className="mt-[5rem] flex items-start w-full justify-start lg:gap-[6.25rem]">
        <ul className="hidden xl:flex flex-col items-start justify-center">
          <li className="flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[10.375rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                Manage My Account
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li
                className={`${
                  router.pathname === "/account" ? "text-secondary-2 " : `text-text-2 opacity-50`
                } font-inter text-[1rem] font-[400] leading-[1.5rem]`}
              >
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account">
                  My Profile
                </Link>
              </li>

              <li
                className={`${
                  router.pathname === "/account/my_address" ? "text-secondary-2 " : `text-text-2 opacity-50`
                } font-inter text-[1rem] font-[400] leading-[1.5rem]`}
              >
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account/my_address">
                  Address Book
                </Link>
              </li>

              <li
                className={`${
                  router.pathname === "/account/change_password" ? "text-secondary-2 " : `text-text-2 opacity-50`
                } font-inter text-[1rem] font-[400] leading-[1.5rem]`}
              >
                <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/account/change_password">
                  Change Password
                </Link>
              </li>
            </ul>
          </li>

          <li className="mt-[1.5rem] flex flex-col items-start justify-center">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/">
              <span className="max-w-[5.125rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                My Orders
              </span>
            </Link>

            <ul className="mt-[1rem] ml-[2.19rem] inline-flex flex-col items-start gap-[0.5rem]">
              <li
                className={`${
                  router.pathname === "/account/my_orders" ? "text-secondary-2 " : `text-text-2 opacity-50`
                } font-inter text-[1rem] font-[400] leading-[1.5rem]`}
              >
                <Link
                  className="hover:opacity-50"
                  onClick={closeDrawerLeft}
                  href={`/account/my_orders?customerId=${profile.id}`}
                >
                  Order List
                </Link>
              </li>
            </ul>
          </li>

          {/* <li className="mt-[1rem]">
            <Link className="hover:opacity-50" onClick={closeDrawerLeft} href="/wish-list">
              <span className="max-w-[5.8125rem] text-text-2 font-inter text-[1rem] font-[500] leading-[1.5rem]">
                My WishList
              </span>
            </Link>
          </li> */}
        </ul>
        {children}
      </div>
    </div>
  );
}

export default AccountLayout;
AccountLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import {
  AlignJustify,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

import { useTrans } from "@/helper/chanLang";
import { useOutsideClick, useOutsideDrawderClick } from "@/helper/clickOutsideElement";

import DropDown from "../svg/dropDown";

import styles from "./header.module.scss";

function Header() {
  const router = useRouter();

  const pathname = usePathname();

  const [isActiveNavbar, setIsActiveNavbar] = useState(pathname);

  const [token, setToken] = useState(false);

  const [isOpenDrawderRight, setIsOpenDrawderRight] = useState(false);

  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const [isOpenLanguageOnDrawder, setIsOpenLanguageOnDrawder] = useState(false);

  const [isOpenUserSetting, setIsOpenUserSetting] = useState(false);

  const [isOpenUserSettingOnDrawder, setIsOpenUserSettingOnDrawder] = useState(false);

  const openDrawerRight = useCallback(() => setIsOpenDrawderRight(true), []);

  const closeDrawerRight = useCallback(() => setIsOpenDrawderRight(false), []);

  const openSelectLanguage = useCallback(() => setIsOpenLanguage(true), []);

  const openSelectLanguageInDrawder = useCallback(() => setIsOpenLanguageOnDrawder(true), []);

  const openUserSettingMenu = useCallback(() => setIsOpenUserSetting(true), []);

  const openUserSettingMenuOnDrawder = useCallback(() => setIsOpenUserSettingOnDrawder(true), []);

  const refClickDrawder = useOutsideDrawderClick(openDrawerRight, closeDrawerRight, isOpenDrawderRight);

  const handleClickOutsideLanguage = useCallback(() => {
    setIsOpenLanguage(false);
  }, []);

  const refClickLanguage = useOutsideClick(handleClickOutsideLanguage);

  const handleClickOutsideLanguageInDrawder = useCallback(() => {
    setIsOpenLanguageOnDrawder(false);
  }, []);

  const refClickLanguageInDrawder = useOutsideClick(handleClickOutsideLanguageInDrawder);

  const handleClickOutsideUser = useCallback(() => {
    setIsOpenUserSetting(false);
  }, []);

  const refClickUser = useOutsideClick(handleClickOutsideUser);

  const handleClickOutsideUserOnDrawder = useCallback(() => {
    setIsOpenUserSettingOnDrawder(false);
  }, []);

  const refClickUserOnDrawder = useOutsideClick(handleClickOutsideUserOnDrawder);

  useEffect(() => {
    const getToken = localStorage.getItem("TOKEN");

    setToken(getToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("TOKEN");

    setIsOpenUserSetting(false);
  }, []);

  const changeLang = useCallback(
    (lang) => {
      router.push("/", "/", { locale: lang });
    },
    [router],
  );

  useEffect(() => {
    setIsActiveNavbar(pathname);
  }, [pathname]);

  return (
    <>
      <section className="bg-black z-[1] font-poppins text-text-1 text-[0.875rem] leading-[1.3125rem] py-3">
        <div className="container grid grid-cols-12 gap-2">
          <div className="hidden lg:block col-span-2" />

          <div className="col-span-12 md:col-span-10: lg:col-span-8 md:flex items-center md:justify-start lg:justify-center text-center">
            <span className="mr-2">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</span>

            <Link className="font-[600] underline" href="/products">
              {useTrans("shopNow")}
            </Link>
          </div>

          <div className="hidden col-span-2 lg:flex justify-end relative">
            <button
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center justify-between gap-1",
                isOpenLanguage && "opacity-50",
              )}
              type="button"
              ref={refClickLanguage}
              onClick={openSelectLanguage}
            >
              <span className="font-[400]">{useTrans("navBar.lang")}</span>

              <DropDown />
            </button>

            <ul
              className={classNames(
                "absolute !z-[4] rounded-lg top-10 px-3 py-2 right-1 flex flex-col justify-start bg-black",
                !isOpenLanguage && "hidden",
              )}
            >
              <li className="cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-300">
                <button type="button" onClick={() => changeLang("en")} className="w-full text-left px-1 py-1">
                  English
                </button>
              </li>

              <li className="cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-300">
                <button type="button" onClick={() => changeLang("vi")} className="w-full text-left px-1 py-1">
                  Tiếng Việt
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <header className="sticky top-0 z-[3] text-black bg-white border-b-gray-400 border-b-[1px]">
        <div className="container pt-[40px] pb-[16px] flex items-center">
          <Link href="/" className="font-inter font-[700] text-[1.5rem] leading-[1.5rem] tracking-[0.045rem] mr-auto">
            <h1>Exclusive</h1>
          </Link>

          <div className="hidden lg:flex items-start gap-[3rem]">
            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/"
            >
              {useTrans("navBar.home")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[4.125rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/contact" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/contact"
            >
              {useTrans("navBar.contact")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/about" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/about"
            >
              {useTrans("navBar.about")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3.8125rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/signUp" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/signUp"
            >
              {useTrans("navBar.signup")}
            </Link>
          </div>

          <div className="relative hidden ml-[8.12rem] md:flex items-center justify-center">
            <form className="relative min-w-[15.1875rem] max-h-[2.375rem]">
              <input
                type="text"
                placeholder={useTrans("navBar.inputSearch")}
                className="min-w-[15.1875rem] min-h-[2.375rem] bg-secondary-1 py-[0.3475rem] px-[0.75rem] pr-[2rem]"
              />

              <button
                type="submit"
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-2 right-1"
              >
                <Search />
              </button>
            </form>

            <Link
              className="group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] ml-[1.5rem] mr-[1rem] flex justify-center items-center"
              href="/wishList"
            >
              <Heart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />
            </Link>

            <Link
              className="group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] flex items-center justify-center"
              href="/cart"
            >
              <ShoppingCart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />
            </Link>

            <button
              ref={refClickUser}
              onClick={openUserSettingMenu}
              type="button"
              className={classNames(
                "group flex items-center justify-center w-[2rem] h-[2rem] ml-[1rem] rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300",
                isOpenUserSetting && "bg-secondary-2",
              )}
            >
              <User
                className={classNames(
                  "group-hover:text-text-1 transition-colors ease-in-out duration-300",
                  isOpenUserSetting && "text-text-1",
                )}
              />
            </button>

            <div
              className={classNames(
                "absolute right-0 top-[2.5rem] w-[14rem] bg- flex pt-[1.125rem] pr-[0.75rem] pb-[0.625rem] pl-[1.25rem] justify-end items-center backdrop-blur-sm bg-[rgba(0,0,0,0.8)] rounded-[0.25rem]",
                !isOpenUserSetting && "hidden",
              )}
            >
              {token ? (
                <div className="flex flex-col items-start gap-[0.8125rem]">
                  <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <User className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Manage My Account
                    </span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <ShoppingBag className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Order
                    </span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <XCircle className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Cancellations
                    </span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <Star className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Reviews
                    </span>
                  </Link>

                  <Link
                    href="/logIn"
                    onClick={handleLogout}
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <LogOut className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Logout
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-[0.8125rem]">
                  <Link
                    href="/logIn"
                    onClick={handleLogout}
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <LogIn className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Login
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button ref={!isOpenDrawderRight ? refClickDrawder : null} className="lg:hidden ml-5" type="button">
            <AlignJustify />
          </button>
        </div>

        <div
          className={classNames(
            "h-screen w-screen bg-opacity-50 fixed top-0 backdrop-blur-sm cursor-default",
            !isOpenDrawderRight && "hidden",
          )}
        />

        <div
          ref={isOpenDrawderRight ? refClickDrawder : null}
          className={classNames(
            "h-screen w-fit shadow-2xl fixed flex flex-col items-center !p-[2rem] top-0 right-0 z-[9999] bg-white",
            !isOpenDrawderRight && "hidden",
            styles.drawder,
          )}
        >
          <button
            type="button"
            onClick={closeDrawerRight}
            className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-3 left-3"
          >
            <XCircle />
          </button>

          <div className="lg:hidden flex justify-center relative">
            <button
              className="group px-2 py-1 mt-5 rounded-lg bg-black text-text-1 flex items-center justify-between gap-1"
              type="button"
              ref={refClickLanguageInDrawder}
              onClick={openSelectLanguageInDrawder}
            >
              <span
                className={classNames(
                  "group-hover:opacity-50 transition-opacity ease-in-out duration-300 font-[400]",
                  isOpenLanguageOnDrawder && "opacity-50",
                )}
              >
                {useTrans("navBar.lang")}
              </span>

              <ChevronDown
                className={classNames(
                  "group-hover:opacity-50 transition-opacity ease-in-out duration-300",
                  isOpenLanguageOnDrawder && "opacity-50",
                )}
              />
            </button>

            <ul
              className={classNames(
                "absolute rounded-lg z-[4] text-text-1 top-[3.5rem] px-2 py-2 right-30 flex flex-col justify-start bg-black",
                !isOpenLanguageOnDrawder && "hidden",
              )}
            >
              <li className="cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-300">
                <button
                  type="button"
                  onClick={() => changeLang("en")}
                  className="w-full text-left px-1 py-1 !whitespace-nowrap"
                >
                  English
                </button>
              </li>

              <li className="cursor-pointer hover:opacity-50 transition-opacity ease-in-out duration-300">
                <button
                  type="button"
                  onClick={() => changeLang("vi")}
                  className="w-full text-left px-1 py-1 !whitespace-nowrap"
                >
                  Tiếng Việt
                </button>
              </li>
            </ul>
          </div>

          <div className="md:hidden ml-auto flex flex-col items-center">
            <form className="relative mt-5 w-[15.1875rem] h-[2.375rem]">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="h-10 w-full bg-secondary-1 py-[0.3475rem] px-[0.75rem] pr-[2rem]"
              />

              <button
                type="submit"
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-2 right-1"
              >
                <Search />
              </button>
            </form>

            <div className="relative flex mt-[2rem] gap-1">
              <Link
                className="group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] flex items-center justify-center"
                href="/wishList"
              >
                <Heart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />
              </Link>

              <Link
                className="group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] flex items-center justify-center ml-[1rem]"
                href="/cart"
              >
                <ShoppingCart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />
              </Link>

              <button
                onClick={openUserSettingMenuOnDrawder}
                ref={refClickUserOnDrawder}
                type="button"
                className={classNames(
                  "group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] ml-[1rem] flex items-center justify-center",
                  isOpenUserSettingOnDrawder && "bg-secondary-2",
                )}
              >
                <User
                  className={classNames(
                    "group-hover:text-text-1 transition-colors ease-in-out duration-300",
                    isOpenUserSettingOnDrawder && "text-text-1",
                  )}
                />
              </button>

              <div
                className={classNames(
                  "absolute right-[-3rem] top-[2.5rem] w-[14rem] bg- flex pt-[1.125rem] pr-[0.75rem] pb-[0.625rem] pl-[1.25rem] justify-end items-center backdrop-blur-sm bg-[rgba(0,0,0,0.8)] rounded-[0.25rem]",
                  !isOpenUserSettingOnDrawder && "hidden",
                )}
              >
                {token ? (
                  <div className="flex flex-col items-start gap-[0.8125rem]">
                    <Link
                      href="/"
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <User className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        Manage My Account
                      </span>
                    </Link>

                    <Link
                      href="/"
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <ShoppingBag className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        My Order
                      </span>
                    </Link>

                    <Link
                      href="/"
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <XCircle className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        My Cancellations
                      </span>
                    </Link>

                    <Link
                      href="/"
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <Star className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        My Reviews
                      </span>
                    </Link>

                    <Link
                      href="/logIn"
                      onClick={handleLogout}
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <LogOut className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        Logout
                      </span>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-[0.8125rem]">
                    <Link
                      href="/logIn"
                      onClick={handleLogout}
                      className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                    >
                      <LogIn className="w-[2rem] h-[2rem] text-text-1" />

                      <span className="text-text-1 flex items-center justify-start w-[9rem] font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        Login
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-[3rem] w-full flex flex-col items-start gap-[2rem] text-[1rem] font-[400] leading-[1.5rem]">
            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/"
            >
              {useTrans("navBar.home")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[4.125rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/contact" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/contact"
            >
              {useTrans("navBar.contact")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/about" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/about"
            >
              {useTrans("navBar.about")}
            </Link>

            <Link
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3.8125rem] max-h-[1.5rem] text-text-2 text-center text-[1rem] font-poppins font-[400] leading-[1.5rem]",
                isActiveNavbar === "/signUp" && "border-b-gray-400 border-b-[2px]",
              )}
              href="/signUp"
            >
              {useTrans("navBar.signup")}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { deleteCookie, getCookie } from "cookies-next";
import {
  AlignJustify,
  ChevronDown,
  LogIn,
  LogOut,
  Search,
  ShoppingBag,
  ShoppingCart,
  // Star,
  User,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

import { useTrans } from "@/helper/chanLang";
import {
  useOutsideClick,
  useOutsideDrawderClick,
  useOutsideSuggestClick,
  useOutsideSuggestDrawderClick,
} from "@/helper/clickOutsideElement";
import { fuzzySearch } from "@/helper/fuzzySearch";
import useAuthUser from "@/store/authUser";
import useCartStore from "@/store/cart/useCartStore";
import useKeySuggest from "@/store/keySuggest/useKeySuggest";
import useNotificationUpdateCart from "@/store/showNotificationUpdateCart";

import DropDown from "../svg/dropDown";

import styles from "./header.module.scss";

function Header() {
  const getListCart = useCartStore((state) => state.getListCart);
  const router = useRouter();

  const inputSearchRef = useRef(null);

  const searchParams = useSearchParams();

  const [keySearch, setKeySearch] = useState(searchParams.get("key") || "");

  const pathname = usePathname();

  const [inputSearch, setInputSearch] = useState("");

  const [filterKeySearch, setFilterKeySearch] = useState([]);

  const [isOpenSuggest, setIsOpenSuggest] = useState(false);

  const [isOpenSuggestOnDrawder, setIsOpenSuggestOnDrawder] = useState(false);

  const [isActiveNavbar, setIsActiveNavbar] = useState(pathname);

  const [isOpenDrawderRight, setIsOpenDrawderRight] = useState(false);

  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const [isOpenLanguageOnDrawder, setIsOpenLanguageOnDrawder] = useState(false);

  const [isOpenUserSetting, setIsOpenUserSetting] = useState(false);

  // const [isOpenUserSettingOnDrawder, setIsOpenUserSettingOnDrawder] = useState(false);

  const keySuggest = useKeySuggest((state) => state.keySuggest);

  const isOpenNotificationUpdateCart = useNotificationUpdateCart((state) => state.isOpenNotification);

  const totalCartItem = useCartStore((state) => state.totalItem);

  const resetCartItem = useCartStore((state) => state.resetCart);

  const openDrawerRight = useCallback(() => setIsOpenDrawderRight(true), []);

  const closeDrawerRight = useCallback(() => setIsOpenDrawderRight(false), []);

  const openSelectLanguage = useCallback(() => setIsOpenLanguage(true), []);

  const openSelectLanguageInDrawder = useCallback(() => setIsOpenLanguageOnDrawder(true), []);

  const openUserSettingMenu = useCallback(() => setIsOpenUserSetting(true), []);

  // const openUserSettingMenuOnDrawder = useCallback(() => setIsOpenUserSettingOnDrawder(true), []);

  const handleClickOutsideSuggestOnDrawder = useCallback(() => {
    setIsOpenSuggestOnDrawder(false);
  }, []);

  const handleClickOutsideSuggest = useCallback(() => {
    setIsOpenSuggest(false);
  }, []);

  const refClickSuggestOnDrawder = useOutsideSuggestDrawderClick(handleClickOutsideSuggestOnDrawder);

  const refClickSuggest = useOutsideSuggestClick(handleClickOutsideSuggest);

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

  // const handleClickOutsideUserOnDrawder = useCallback(() => {
  //   setIsOpenUserSettingOnDrawder(false);
  // }, []);

  // const refClickUserOnDrawder = useOutsideClick(handleClickOutsideUserOnDrawder);

  const doAuthUser = useAuthUser((state) => state.fetchAuthUser);

  const isLogin = useAuthUser((state) => state.isAuthenticated);

  useEffect(() => {
    doAuthUser();

    if (pathname === "/log-in" || pathname === "/sign-up") {
      const getToken = getCookie("TOKEN");
      const getRefreshToken = getCookie("REFRESH_TOKEN");

      if (getToken && !getRefreshToken) {
        resetCartItem();

        deleteCookie("TOKEN");
        deleteCookie("REFRESH_TOKEN");
        deleteCookie("email");

        // signOut({ callbackUrl: "/log-in" });
        signOut();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (searchParams.get("key")) {
      setKeySearch(searchParams.get("key"));
    }
  }, [searchParams]);

  useEffect(() => {
    setInputSearch(keySearch);
  }, [keySearch]);

  const handleLogout = useCallback(async () => {
    resetCartItem();

    deleteCookie("TOKEN");
    deleteCookie("REFRESH_TOKEN");
    deleteCookie("email");

    setIsOpenUserSetting(false);

    // signOut({ callbackUrl: "/log-in" });
    signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();

      setIsOpenSuggest(false);
      setIsOpenSuggestOnDrawder(false);
      router.push(`/search-products?key=${inputSearch}`);
    },
    [inputSearch, router],
  );

  useEffect(() => {
    if (!inputSearch) {
      setFilterKeySearch([]);
    }

    if (inputSearch) {
      const filterKey = keySuggest.filter((item) => {
        const keySearchRegex = fuzzySearch(inputSearch);
        return keySearchRegex.test(item.name);
      });

      setFilterKeySearch(filterKey);
    }
  }, [inputSearch, keySuggest]);

  useEffect(() => {
    getListCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <section className="bg-black z-[1] font-inter text-text-1 text-[0.875rem] leading-[1.3125rem] py-3">
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
        <div
          className={classNames(
            isOpenNotificationUpdateCart
              ? "absolute top-[7rem] right-[1rem] scale-100 opacity-100 transition-all duration-300 max-w-[20rem] max-h-[20rem] bg-secondary-2 rounded-md shadow-md flex items-center justify-center p-[2rem]"
              : "absolute top-[7rem] right-[1rem] z-[-10] scale-0 opacity-0 transition-all duration-300 max-w-[20rem] max-h-[20rem] bg-secondary-2 rounded-md shadow-md flex items-center justify-center p-[2rem]",
          )}
        >
          <span className="text-text-1 font-inter text-[1rem] font-[500] leading-[1.5rem] cursor-default">
            The shopping cart has been updated!!!
          </span>
        </div>

        <div className="container pt-[40px] pb-[16px] flex items-center">
          <Link href="/" className="font-inter font-[700] text-[1.5rem] leading-[1.5rem] tracking-[0.045rem] mr-auto">
            <h1 className="whitespace-nowrap">E-Shop</h1>
          </Link>

          <ul className="hidden lg:flex items-start gap-[3rem]">
            <li>
              <Link
                className={classNames(
                  "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                  isActiveNavbar === "/" && "border-b-text-2 border-b-[2px]",
                )}
                href="/"
              >
                {useTrans("navBar.home")}
              </Link>
            </li>

            <li>
              <Link
                className={classNames(
                  "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[4.125rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                  isActiveNavbar === "/contact" && "border-b-text-2 border-b-[2px]",
                )}
                href="/contact"
              >
                {useTrans("navBar.contact")}
              </Link>
            </li>

            <li>
              <Link
                className={classNames(
                  "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                  isActiveNavbar === "/about" && "border-b-text-2 border-b-[2px]",
                )}
                href="/about"
              >
                {useTrans("navBar.about")}
              </Link>
            </li>

            <li>
              <Link
                className={classNames(
                  "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3.8125rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                  isActiveNavbar === "/sign-up" && "border-b-text-2 border-b-[2px]",
                )}
                href="/sign-up"
              >
                {useTrans("navBar.signup")}
              </Link>
            </li>
          </ul>

          <div className="relative ml-[8.12rem] flex items-center justify-center">
            <form
              ref={refClickSuggest}
              onSubmit={handleSubmitSearch}
              className="relative hidden md:block min-w-[15.1875rem] max-h-[2.375rem]"
            >
              <input
                ref={inputSearchRef}
                name="inputSearch"
                type="text"
                autoComplete="off"
                onFocus={() => {
                  setIsOpenSuggest(true);
                }}
                value={inputSearch}
                placeholder={useTrans("navBar.inputSearch")}
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  setIsOpenSuggest(true);
                }}
                className="min-w-[15.1875rem] min-h-[2.375rem] bg-secondary-1 py-[0.3475rem] pl-[0.75rem] pr-[2.5rem]"
              />

              {isOpenSuggest && filterKeySearch.length > 0 && filterKeySearch.length <= 8 && (
                <ul
                  className={classNames(
                    "absolute top-11 flex flex-col items-start justify-center gap-[1rem] max-w-[30rem] min-h-fit max-h-[40rem] overflow-y-auto bg-white p-[1.5rem] rounded-lg shadow-lg",
                    styles.suggest,
                  )}
                >
                  {filterKeySearch?.map((item) => {
                    return (
                      <li
                        key={item.name}
                        className="hover:opacity-50 transition-opacity inline-flex items-center justify-start whitespace-nowrap max-w-[16rem] min-h-[2rem] overflow-x-hidden text-ellipsis text-text-2 font-inter text-[1rem] font-[400] leading-[1.125rem]"
                      >
                        <Link
                          onClick={() => {
                            setIsOpenSuggest(false);
                          }}
                          href={`/search-products?key=${item.name}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <button
                title="search"
                type="submit"
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-[5px] lg:top-[7px] right-[12px]"
              >
                <Search />
              </button>
            </form>

            {/* <Link
              title="wish list"
              className="group rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] ml-[1.5rem] mr-[1rem] flex justify-center items-center"
              href="/wish-list"
            >
              <Heart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />
            </Link> */}

            <Link
              className="ml-[1.5rem] group relative rounded-full hover:bg-secondary-2 transition-colors ease-in-out duration-300 w-[2rem] h-[2rem] flex items-center justify-center"
              href="/cart"
            >
              <ShoppingCart className="group-hover:text-text-1 transition-colors ease-in-out duration-300" />

              <div className="absolute top-[-0.5rem] right-[-0.5rem] w-[1.5rem] h-[1.5rem] bg-button-2 flex items-center justify-center rounded-[5rem]">
                <span className="flex-shrink-0 text-text-1 text-center font-inter text-[0.75rem] font-[400] leading-[1.125rem] flex items-center justify-center">
                  {totalCartItem || 0}
                </span>
              </div>
            </Link>

            <button
              title="user"
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
                "absolute right-0 top-[2.5rem] max-w-[14rem] bg- flex pt-[1.125rem] pr-[0.75rem] pb-[0.625rem] pl-[1.25rem] justify-end items-center backdrop-blur-sm bg-[rgba(0,0,0,0.8)] rounded-[0.25rem]",
                !isOpenUserSetting && "hidden",
              )}
            >
              {isLogin ? (
                <div className="whitespace-nowrap flex flex-col items-start gap-[0.8125rem]">
                  <Link
                    href="/account"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <User className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Manage My Account
                    </span>
                  </Link>

                  <Link
                    href="/account/my_orders"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <ShoppingBag className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Order
                    </span>
                  </Link>

                  {/* <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <XCircle className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Cancellations
                    </span>
                  </Link>

                  <Link
                    href="/"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <Star className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                      My Reviews
                    </span>
                  </Link> */}

                  <button
                    type="button"
                    onClick={() => handleLogout()}
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <LogOut className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Logout
                    </span>
                  </button>
                </div>
              ) : (
                <div className="whitespace-nowrap flex flex-col items-start gap-[0.8125rem]">
                  <Link
                    href="/log-in"
                    className="flex items-center gap-[1rem] hover:opacity-50 transition-opacity ease-in-out duration-300"
                  >
                    <LogIn className="w-[2rem] h-[2rem] text-text-1" />

                    <span className="text-text-1 flex items-center justify-start max-w-[9rem] font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
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
            "h-screen w-screen bg-opacity-50 fixed top-0 bg-gray-400",
            !isOpenDrawderRight && "hidden",
          )}
        />

        <div
          ref={isOpenDrawderRight ? refClickDrawder : null}
          className={classNames(
            "h-screen w-fit shadow-2xl fixed flex flex-col items-center !p-[2rem] top-0 right-0 !z-[9999] bg-white",
            !isOpenDrawderRight && "hidden",
            styles.drawder,
          )}
        >
          <button
            title="cancel"
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
            <form
              ref={refClickSuggestOnDrawder}
              onSubmit={handleSubmitSearch}
              className="relative mt-5 min-w-[15.1875rem] max-h-[2.375rem]"
            >
              <input
                ref={inputSearchRef}
                name="inputSearch"
                type="text"
                autoComplete="off"
                onFocus={() => {
                  setIsOpenSuggestOnDrawder(true);
                }}
                value={inputSearch}
                placeholder="What are you looking for?"
                onChange={(e) => {
                  setInputSearch(e.target.value);
                  setIsOpenSuggestOnDrawder(true);
                }}
                className="min-h-[2.5rem] w-full bg-secondary-1 py-[0.3475rem] pl-[0.75rem] pr-[2.5rem]"
              />

              {isOpenSuggestOnDrawder && filterKeySearch.length > 0 && filterKeySearch.length <= 8 && (
                <ul
                  className={classNames(
                    "absolute z-[10000] top-11 right-0 flex flex-col items-start justify-center gap-[1rem] w-[20rem] max-h-[25rem] overflow-y-auto bg-white p-[1.5rem] rounded-lg shadow-lg",
                    styles.suggest,
                  )}
                >
                  {filterKeySearch?.map((item) => {
                    return (
                      <li
                        key={item.name}
                        className="hover:opacity-50 transition-opacity inline-flex items-center justify-start whitespace-nowrap max-w-[16rem] min-h-[2rem] overflow-x-hidden text-ellipsis text-text-2 font-inter text-[1rem] font-[400] leading-[1.125rem]"
                      >
                        <Link
                          onClick={() => {
                            setIsOpenSuggestOnDrawder(false);
                          }}
                          href={`/search-products?key=${item.name}`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <button
                title="search"
                onClick={closeDrawerRight}
                type="submit"
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-[3px] right-[6px]"
              >
                <Search />
              </button>
            </form>
          </div>

          <div className="lg:hidden mt-[3rem] w-full flex flex-col items-start gap-[2rem] text-[1rem] font-[400] leading-[1.5rem]">
            <Link
              onClick={closeDrawerRight}
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                isActiveNavbar === "/" && "border-b-text-2 border-b-[2px]",
              )}
              href="/"
            >
              {useTrans("navBar.home")}
            </Link>

            <Link
              onClick={closeDrawerRight}
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[4.125rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                isActiveNavbar === "/contact" && "border-b-text-2 border-b-[2px]",
              )}
              href="/contact"
            >
              {useTrans("navBar.contact")}
            </Link>

            <Link
              onClick={closeDrawerRight}
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                isActiveNavbar === "/about" && "border-b-text-2 border-b-[2px]",
              )}
              href="/about"
            >
              {useTrans("navBar.about")}
            </Link>

            <Link
              onClick={closeDrawerRight}
              className={classNames(
                "hover:opacity-50 transition-opacity ease-in-out duration-300 flex flex-col items-center min-w-[3.8125rem] max-h-[1.5rem] text-text-2 text-center text-[1.125rem] font-inter font-[500] leading-[1.5rem]",
                isActiveNavbar === "/sign-up" && "border-b-text-2 border-b-[2px]",
              )}
              href="/sign-up"
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

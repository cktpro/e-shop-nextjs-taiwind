import React, { useCallback, useState } from "react";
import classNames from "classnames";
import {
  AlignJustify,
  Heart,
  Search,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import DropDown from "../svg/dropDown";

function Header() {
  const [openRight, setOpenRight] = useState(false);

  const [openLanguage, setOpenLanguage] = useState(false);

  const openDrawerRight = useCallback(() => setOpenRight(true), []);

  const closeDrawerRight = useCallback(() => setOpenRight(false), []);

  const openSelectLanguage = useCallback(
    () => setOpenLanguage((open) => !open),
    [],
  );

  return (
    <>
      <section className="bg-black z-[1] font-poppins text-text-1 text-[0.875rem] leading-[1.3125rem] py-3">
        <div className="container grid grid-cols-12 gap-2">
          <div className="hidden lg:block col-span-2" />

          <div className="col-span-12 md:col-span-10: lg:col-span-8 md:flex items-center md:justify-start lg:justify-center text-center">
            <span className="mr-2">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </span>

            <Link className="font-[600] underline" href="./products">
              ShopNow
            </Link>
          </div>

          <div className="hidden col-span-2 lg:flex justify-end relative">
            <button
              className="flex items-center justify-between gap-1"
              type="button"
              onClick={openSelectLanguage}
            >
              <span className="font-[400]">English</span>

              <DropDown />
            </button>

            <ul
              className={classNames(
                "absolute !z-[3] rounded-lg top-10 px-3 py-2 right-1 flex flex-col justify-start bg-black",
                !openLanguage && "hidden",
              )}
            >
              <li className="cursor-pointer hover:text-text-2 hover:bg-secondary">
                <button
                  onClick={openSelectLanguage}
                  type="button"
                  className="w-full text-left px-1 py-1"
                >
                  English
                </button>
              </li>

              <li className="cursor-pointer hover:text-text-2 hover:bg-secondary">
                <button
                  onClick={openSelectLanguage}
                  type="button"
                  className="w-full text-left px-1 py-1"
                >
                  Tiếng Việt
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <header className="sticky top-0 z-[2] text-black bg-white border-b-gray-400 border-b-[1px]">
        <div className="container pt-[40px] pb-[15px] flex items-center">
          <div className="font-inter font-[700] text-[1.5rem] leading-[1.5rem] mr-auto">
            Exclusive
          </div>

          <div className="hidden lg:flex gap-[3rem] text-[1rem] font-[400] leading-[1.5rem]">
            <Link
              className="font-poppins border-b-gray-400 border-b-[2px]"
              href="./products"
            >
              Home
            </Link>

            <Link className="font-poppins" href="./products">
              Contact
            </Link>

            <Link className="font-poppins" href="./products">
              About
            </Link>

            <Link className="font-poppins" href="./products">
              Sign Up
            </Link>
          </div>

          <div className="hidden ml-auto md:flex">
            <form className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="h-10 w-full bg-secondary py-[0.3475rem] px-[0.75rem] pr-[2rem]"
              />

              <button type="submit" className="absolute top-2 right-1">
                <Search />
              </button>
            </form>

            <Link
              className="ml-[1.5rem] mr-[1rem] flex items-center"
              href="./products"
            >
              <Heart />
            </Link>

            <Link className="flex items-center" href="./products">
              <ShoppingCart />
            </Link>
          </div>

          <button
            onClick={openDrawerRight}
            className="lg:hidden ml-5"
            type="button"
          >
            <AlignJustify />
          </button>
        </div>

        <div
          onClick={closeDrawerRight}
          onKeyDown={closeDrawerRight}
          role="button"
          tabIndex={0}
          aria-label="close"
          className={classNames(
            "h-screen w-screen bg-opacity-50 fixed top-0 backdrop-blur-sm cursor-default",
            !openRight && "hidden",
          )}
        />

        <div
          className={classNames(
            "h-screen w-fit shadow-2xl fixed flex flex-col items-center !p-[2rem] top-0 right-0 z-[9999] bg-white",
            !openRight && "hidden",
          )}
        >
          <button
            type="button"
            onClick={closeDrawerRight}
            className="w-full absolute top-0 left-3 pt-3 pr-3"
          >
            <XCircle />
          </button>

          <div className="lg:hidden flex justify-center relative">
            <button
              className="px-2 py-1 mt-5 rounded-lg bg-black text-text-1 flex items-center justify-between gap-1"
              type="button"
              onClick={openSelectLanguage}
            >
              <span className="font-[400]">English</span>

              <DropDown />
            </button>

            <ul
              className={classNames(
                "absolute rounded-lg z-[3] text-text-1 top-[3.5rem] px-2 py-2 right-30 flex flex-col justify-start bg-black",
                !openLanguage && "hidden",
              )}
            >
              <li className="cursor-pointer hover:text-text-2 hover:bg-secondary">
                <button
                  onClick={openSelectLanguage}
                  type="button"
                  className="w-full text-left px-1 py-1 !whitespace-nowrap"
                >
                  English
                </button>
              </li>

              <li className="cursor-pointer hover:text-text-2 hover:bg-secondary">
                <button
                  onClick={openSelectLanguage}
                  type="button"
                  className="w-full text-left px-1 py-1 !whitespace-nowrap"
                >
                  Tiếng Việt
                </button>
              </li>
            </ul>
          </div>

          <div className="md:hidden ml-auto flex flex-col items-center">
            <form className="relative mt-5">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="h-10 w-full bg-secondary py-[0.3475rem] px-[0.75rem] pr-[2rem]"
              />

              <button type="submit" className="absolute top-2 right-1">
                <Search />
              </button>
            </form>
            <div className="flex mt-[2rem] gap-3">
              <Link className="flex items-center" href="./products">
                <Heart />
              </Link>

              <Link className="flex items-center" href="./products">
                <ShoppingCart />
              </Link>
            </div>
          </div>

          <div className="lg:hidden mt-[3rem] w-full flex flex-col items-start gap-[2rem] text-[1rem] font-[400] leading-[1.5rem]">
            <Link
              className="font-poppins w-fit border-b-gray-400 border-b-[2px]"
              href="./products"
            >
              Home
            </Link>

            <Link className="font-poppins w-fit" href="./products">
              Contact
            </Link>

            <Link className="font-poppins w-fit" href="./products">
              About
            </Link>

            <Link className="font-poppins w-fit" href="./products">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

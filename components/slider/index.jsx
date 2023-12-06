import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { ChevronRight, MenuSquare, XCircle } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";

import { axiosClient } from "@/helper/axios/axiosClient";
// import banner1 from "@/assets/images/banner/banner1.jpg";
import { useOutsideLeftDrawderClick } from "@/helper/clickOutsideElement";

import Banner from "../banner";

import styles from "./slider.module.scss";

function Slider() {
  const [categories, setCategories] = useState([]);

  const [isOpenDrawderLeft, setIsOpenDrawderLeft] = useState(false);

  const openDrawerLeft = useCallback(() => setIsOpenDrawderLeft(true), []);

  const closeDrawerLeft = useCallback(() => setIsOpenDrawderLeft(false), []);

  const leftDrawderRef = useOutsideLeftDrawderClick(openDrawerLeft, closeDrawerLeft, isOpenDrawderLeft);

  const getCategory = async () => {
    try {
      const res = await axiosClient.get("/categories");
      setCategories(res.data.payload);
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const toggleFrameCategories = useCallback(
    (event, index) => {
      event.stopPropagation();
      const updatedCategories = [...categories];
      updatedCategories[index].isExtend = !updatedCategories[index].isExtend;
      setCategories(updatedCategories);
    },
    [categories, setCategories],
  );

  return (
    <div className="container flex items-center">
      <div className="hidden lg:block w-fit min-h-[26rem] mr-auto border-r-gray-400 border-r-[1px]">
        <ul className="text-black h-[25rem] pt-[2.5rem] font-poppins gap-[1rem] text-[1rem] font-[400] leading[1.5rem] flex flex-col">
          {categories?.map((item, index) => {
            if (item?.child) {
              return (
                <li
                  onMouseEnter={(event) => toggleFrameCategories(event, index)}
                  onMouseLeave={(event) => toggleFrameCategories(event, index)}
                  className="relative"
                  key={item.name}
                >
                  <div className="hover:opacity-50 transition-opacity ease-in-out duration-300 max-h-[1.5rem] flex justify-between items-center cursor-pointer ">
                    <span className="mr-[3.19rem] !whitespace-nowrap">{item.name}</span>

                    <ChevronRight className="mr-[1rem]" />
                  </div>

                  <ul
                    className={classNames(
                      `${styles.custom_shadow} bg-white rounded-md absolute gap-[1rem] left-[13rem] top-[0] z-[2] w-full h-[20rem] px-2 py-3 flex flex-col`,
                      !item?.isExtend && "hidden",
                    )}
                  >
                    {item?.child?.map((child) => {
                      return (
                        <li
                          key={child.name}
                          className="hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center max-h-[1.5rem] !whitespace-nowrap"
                        >
                          <Link className="px-2 py-1 block w-full" href="./">
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }

            return (
              <li
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center max-h-[1.5rem]"
                key={item.name}
              >
                <div className="hover:opacity-50 transition-opacity ease-in-out duration-300 max-h-[1.5rem] flex justify-between items-center cursor-pointer ">
                  <Link className="mr-[3.19rem] !whitespace-nowrap" href={`/product/${item.id}?name=${item.name}`}>
                    {item.name}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="relative pt-[2.5rem] lg:pl-[2.81rem]">
        <div className="grid grid-cols-12 bg-text-2 rounded-[0.25rem] overflow-hidden">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12">
            <Banner />
          </div>
        </div>

        <button
          ref={!isOpenDrawderLeft ? leftDrawderRef : null}
          type="button"
          className="lg:hidden absolute bottom-[-5rem] left-0"
        >
          <MenuSquare />
        </button>
      </div>

      <div
        ref={isOpenDrawderLeft ? leftDrawderRef : null}
        className={classNames(
          styles.left_drawder,
          "fixed top-0 left-0 h-screen min-w-fit pe-[1rem] bg-white shadow-md z-[3]",
          !isOpenDrawderLeft && "hidden",
        )}
      >
        <button
          type="button"
          onClick={closeDrawerLeft}
          className="hover:opacity-50 transition-opacity ease-in-out duration-300 absolute top-3 right-3"
        >
          <XCircle />
        </button>

        <ul className="text-black font-poppins gap-[1rem] pt-[5.5rem] pl-[1rem] text-[1rem] font-[400] leading[1.5rem] flex flex-col">
          {categories?.map((item, index) => {
            if (item?.child) {
              return (
                <div
                  onMouseEnter={(event) => toggleFrameCategories(event, index)}
                  onMouseLeave={(event) => toggleFrameCategories(event, index)}
                  className="relative"
                  key={item.name}
                >
                  <li className="hover:opacity-50 transition-opacity ease-in-out duration-300 max-h-[1.5rem] flex justify-between items-center cursor-pointer ">
                    <span className="mr-[3.19rem] !whitespace-nowrap">{item.name}</span>

                    <ChevronRight className="mr-[1rem]" />
                  </li>

                  <ul
                    className={classNames(
                      `${styles.custom_shadow} bg-white rounded-md absolute gap-[1rem] left-[1rem] top-[1.5rem] z-[2] w-full h-[20rem] px-2 py-3 flex flex-col`,
                      !item?.isExtend && "hidden",
                    )}
                  >
                    {item?.child?.map((child) => {
                      return (
                        <li
                          key={child.name}
                          className="hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center max-h-[1.5rem] !whitespace-nowrap"
                        >
                          <Link className="px-2 py-1 block w-full" href="./">
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }

            return (
              <li
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center max-h-[1.5rem]"
                key={item.name}
              >
                <Link className="!whitespace-nowrap block w-full" href={`/product/${item.id}?name=${item.name}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Slider;

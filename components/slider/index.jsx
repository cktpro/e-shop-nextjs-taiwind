import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { ChevronRight } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";

// import banner1 from "@/assets/images/banner/banner1.jpg";
import { useTrans } from "@/helper/chanLang";

import Banner from "../banner";

import styles from "./slider.module.scss";

function Slider() {
  const data = useTrans("slideBar");

  const [categories, setCategories] = useState(data);

  useEffect(() => {
    setCategories(data);
  }, [categories, data]);

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
      <div className="hidden lg:block w-fit mr-auto border-r-gray-400 border-r-[1px]">
        <ul className="text-black font-poppins gap-[1rem] pt-[2.5rem] text-[1rem] font-[400] leading[1.5rem] flex flex-col">
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
                </div>
              );
            }

            return (
              <li
                className="hover:opacity-50 transition-opacity ease-in-out duration-300 flex items-center max-h-[1.5rem]"
                key={item.name}
              >
                <Link className="!whitespace-nowrap block w-full" href="./">
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="pt-[2.5rem] lg:pl-[2.81rem]">
        <div className="grid grid-cols-12 bg-black">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12">
            <Banner />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;

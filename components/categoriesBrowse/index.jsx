import React from "react";
import PropTypes from "prop-types";

import CategoriesCarousel from "../carouselCategories";
import Rectangle from "../svg/rectangle";

function CategoriesBrowse(props) {
  const { categories } = props;
  return (
    <div className="container">
      <div className="sm:flex items-end mb-[6rem] sm:mb-[3.75rem]">
        <div className="sm:flex max-h-[6.4375rem] flex-col items-start gap-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="w-[1.25rem] h-[2.5rem]">
              <Rectangle />
            </div>

            <span className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Categories</span>
          </div>

          <div className="mt-[0.5rem] sm:mt-0 text-text-2 font-inter text-[1.5rem] sm:text-[2.25rem] font-[600] leading-[2rem] sm:leading-[3rem] tracking-[0.09rem] sm:whitespace-nowrap">
            Browse By Category
          </div>
        </div>
      </div>

      <div className="">
        <CategoriesCarousel categories={categories} />
      </div>

      <hr className="border-1 border-solid border-black border-opacity-30 mt-[3.75rem] mb-[4.38rem]" />
    </div>
  );
}

export default CategoriesBrowse;

CategoriesBrowse.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
};

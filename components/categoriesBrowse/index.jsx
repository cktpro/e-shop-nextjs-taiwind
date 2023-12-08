import React from "react";
import PropTypes from "prop-types";

import CategoriesCarousel from "../carouselCategories";
import Rectangle from "../svg/rectangle";

function CategoriesBrowse(props) {
  const { categories } = props;
  return (
    <div className="container bg-[#F3F3F3] pt-[1rem] pb-[4.25rem] mb-[4.38rem] rounded-[0.25rem]">
      <div className="sm:flex items-end mb-[8rem] sm:mb-[4rem]">
        <div className="sm:flex max-h-[6.4375rem] flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-secondary-2 font-inter text-[1rem] font-[600] leading-[1.25rem]">Categories</h3>
          </div>

          <h2 className="mt-[0.5rem] sm:mt-0 text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] whitespace-nowrap">
            Browse By Category
          </h2>
        </div>
      </div>

      <CategoriesCarousel categories={categories} />
    </div>
  );
}

export default CategoriesBrowse;

CategoriesBrowse.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
};

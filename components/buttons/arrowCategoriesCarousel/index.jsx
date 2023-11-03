import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

function ArrowCategoriesCarousel(props) {
  const { prev, next } = props;
  return (
    <div className="absolute top-[-6.6rem] right-0 flex gap-[0.5rem]">
      <button
        type="button"
        className="flex items-center justify-center w-[2.875rem] h-[2.875rem] bg-secondary-1 rounded-[5rem]"
        onClick={prev}
      >
        <ArrowLeft />
      </button>

      <button
        type="button"
        className="flex items-center justify-center w-[2.875rem] h-[2.875rem] bg-secondary-1 rounded-[5rem]"
        onClick={next}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default ArrowCategoriesCarousel;

ArrowCategoriesCarousel.propTypes = {
  prev: PropTypes.instanceOf(Function).isRequired,
  next: PropTypes.instanceOf(Function).isRequired,
};

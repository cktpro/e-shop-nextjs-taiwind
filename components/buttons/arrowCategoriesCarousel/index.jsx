import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

function ArrowCategoriesCarousel(props) {
  const { prev, next } = props;
  return (
    <div className="absolute top-[-6.6rem] right-0 flex gap-[0.5rem]">
      <button
        title="prev"
        type="button"
        className="flex items-center justify-center min-w-[2.875rem] min-h-[2.875rem] bg-secondary-2 rounded-[5rem]"
        onClick={prev}
      >
        <ArrowLeft className="text-text-1" />
      </button>

      <button
        title="next"
        type="button"
        className="flex items-center justify-center min-w-[2.875rem] min-h-[2.875rem] bg-secondary-2 rounded-[5rem]"
        onClick={next}
      >
        <ArrowRight className="text-text-1" />
      </button>
    </div>
  );
}

export default ArrowCategoriesCarousel;

ArrowCategoriesCarousel.propTypes = {
  prev: PropTypes.instanceOf(Function).isRequired,
  next: PropTypes.instanceOf(Function).isRequired,
};

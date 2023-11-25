import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

function ArrowButtonCarousel(props) {
  const { prev, next } = props;
  return (
    <div className="absolute top-[-5.4rem] right-0 flex items-center justify-center gap-[0.5rem]">
      <button
        title="prev"
        type="button"
        className="flex items-center justify-center min-w-[2.875rem] min-h-[2.875rem] bg-secondary-1 rounded-[5rem]"
        onClick={prev}
      >
        <ArrowLeft />
      </button>

      <button
        title="next"
        type="button"
        className="flex items-center justify-center min-w-[2.875rem] min-h-[2.875rem] bg-secondary-1 rounded-[5rem]"
        onClick={next}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default ArrowButtonCarousel;

ArrowButtonCarousel.propTypes = {
  prev: PropTypes.instanceOf(Function).isRequired,
  next: PropTypes.instanceOf(Function).isRequired,
};

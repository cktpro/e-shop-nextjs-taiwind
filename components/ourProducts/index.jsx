import React from "react";
import PropTypes from "prop-types";

import ViewAllProducts from "../buttons/viewAllProduct";
import OurProductsCarousel from "../carouselOurProducts";
import Rectangle from "../svg/rectangle";

function OurProducts(props) {
  const { products } = props;
  return (
    <div className="container mt-[4.44rem]">
      <div className="sm:flex items-end mb-[8.5rem] sm:mb-[4rem]">
        <div className="sm:flex h-[6.4375rem] flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <span className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Our Products</span>
          </div>

          <div className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            Explore Our Products
          </div>
        </div>
      </div>

      <div className="">
        <OurProductsCarousel products={products} />
      </div>

      <div className="text-center mt-[3.75rem]">
        <ViewAllProducts />
      </div>
    </div>
  );
}

export default OurProducts;

OurProducts.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
};

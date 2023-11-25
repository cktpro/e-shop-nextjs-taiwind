import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import ViewAllProducts from "../buttons/viewAllProduct";
import OurProductsCarousel from "../carouselOurProducts";
import Rectangle from "../svg/rectangle";

function OurProducts(props) {
  const { products } = props;
  return (
    <div className="container mt-[4.44rem] bg-[url('/assets/images/background/4.png')] pt-[1rem] pb-[1rem] rounded-[0.25rem]">
      <div className="sm:flex items-end mb-[8.5rem] sm:mb-[4rem]">
        <div className="sm:flex min-h-[6.4375rem] flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-white font-poppins text-[1rem] font-[600] leading-[1.25rem]">Our Products</h3>
          </div>

          <h2 className="text-white font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            Explore Our Products
          </h2>
        </div>
      </div>

      <OurProductsCarousel products={products} />

      <div className="text-center mt-[3.75rem]">
        <Link href="/">
          <ViewAllProducts text="View All Products" type="button" onClick={() => {}} />
        </Link>
      </div>
    </div>
  );
}

export default OurProducts;

OurProducts.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
};

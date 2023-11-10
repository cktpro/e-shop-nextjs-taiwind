import React from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import PropTypes from "prop-types";

import Card from "@/components/card";
import Rectangle from "@/components/svg/rectangle";

import { fuzzySearch } from "@/helper/fuzzySearch";

function SearchProductsPage(props) {
  const { search } = props;

  const searchParams = useSearchParams();
  const keySearch = searchParams.get("key");

  const filterSearch = search.filter((item) => {
    const searchRegex = fuzzySearch(keySearch);
    return searchRegex.test(item.title);
  });

  return (
    <div className="container mt-[5rem]">
      <div className="sm:flex items-end mb-[7.5rem] sm:mb-[3.75rem]">
        <div className="sm:flex min-h-[6.4375rem] flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Search Products</h3>
          </div>

          <h2 className="mt-[0.5rem] sm:mt-0 text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            Key Search: {keySearch}
          </h2>
        </div>
      </div>

      {search.length > 0 ? (
        <div className="relative flex items-center justify-center">
          {!filterSearch.length > 0 || keySearch.length < 1 ? (
            <span className="whitespace-nowrap min-w-full flex items-center justify-center text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem]">
              No products matched
            </span>
          ) : (
            <div className="grid grid-cols-12 sm:gap-[1.875rem]">
              {filterSearch.map((item) => {
                return (
                  <div
                    className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 mb-[2.875rem] sm:mb-0"
                    key={item.title}
                  >
                    <Card product={item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <span className="text-secondary-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            Internal Server Error
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchProductsPage;

SearchProductsPage.propTypes = {
  search: PropTypes.instanceOf(Array).isRequired,
};

export async function getServerSideProps() {
  try {
    const search = await axios.get("https://fakestoreapi.com/products");

    return {
      props: {
        search: search.data || [],
      },

      // revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      // notFound: true,
      props: {
        search: [],
      },
    };
  }
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PropTypes from "prop-types";

function CategoryItem(props) {
  const { category } = props;
  return (
    <Link href={`/product/${category?.id}?name=${category.name}`}>
      <div
        // className="group flex flex-col min-w-[10.625rem] min-h-[9.0625rem] gap[1rem] px-[3.5rem] py-[1.5rem] hover:bg-secondary-2 transition-colors ease-in-out duration-300 items-center justify-center rounded-[0.25rem] border-[1px] border-solid border-black border-opacity-30"
        className="group flex flex-col gap-1 w-[10.625rem] h-[9.0625rem] gap[1rem] px-[1.5rem] py-[1.5rem] hover:bg-secondary-2 transition-colors ease-in-out duration-300 items-center justify-center rounded-[0.25rem] border-[1px] border-solid border-black border-opacity-30"
      >
        <Image
          className="flex w-[2.5rem] h-[2.5rem] items-center justify-center min-w-[3.5rem] min-h-[3.5rem]"
          src={category.image.location}
          alt={category.name}
          width={100}
          height={100}
        />

        <h4 className="text-text-2 group-hover:text-text-1 transition-colors ease-in-out duration-300 font-poppins text-[1rem] font-[400] leading-[1.4rem] max-h-[1rem]">
          {category.name}
        </h4>
      </div>
    </Link>
  );
}

export default CategoryItem;

CategoryItem.propTypes = {
  category: PropTypes.instanceOf(Object).isRequired,
};

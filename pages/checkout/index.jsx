import React from "react";
import Link from "next/link";

function Checkout() {
  return (
    <div className="container">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5]">/</span>

        <Link
          href="/"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">Cart</span>
      </div>
    </div>
  );
}

export default Checkout;

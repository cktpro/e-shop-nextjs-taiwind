import React from "react";
import Link from "next/link";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

function OrderSuccessPage() {
  return (
    <div className="container mt-[5rem] flex flex-col items-center justify-center">
      <span className="text-button-3 font-inter text-[2.875rem] font-[500] leading-[7.1875rem]">
        Order successful, thank you!
      </span>

      <Link href="/" className="mt-[5rem]">
        <ViewAllProducts text="Back to home page" type="button" onClick={() => {}} />
      </Link>
    </div>
  );
}

export default OrderSuccessPage;

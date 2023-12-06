import React from "react";
import Link from "next/link";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

function NotFoundPage() {
  return (
    <div className="container mt-[5rem] flex flex-col items-center justify-center">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">/</span>

        <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">404 Error</span>
      </div>

      <div className="mt-[8.75rem] inline-flex flex-col items-center 2.5rem">
        <span className="text-text-2 font-inter text-[6.875rem] font-[500] leading-[7.1875rem] tracking-[0.20625rem]">
          404 Not Found
        </span>

        <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
          Your visited page not found. You may go home page.
        </span>
      </div>

      <Link href="/" className="mt-[5rem]">
        <ViewAllProducts text="Back to home page" type="button" onClick={() => {}} />
      </Link>
    </div>
  );
}

export default NotFoundPage;

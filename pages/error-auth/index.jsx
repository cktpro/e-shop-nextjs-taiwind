import React from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

function ErrorAuth() {
  const searchParams = useSearchParams();

  const query = searchParams.get("error");

  const emailError = getCookie("email");

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

        <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">Error</span>
      </div>

      {query === "AccessDenied" && emailError && (
        <div className="mt-[8.75rem] inline-flex flex-col items-center 2.5rem">
          <span className="text-center text-text-2 font-inter text-[1.5rem] font-[500] leading-[2rem]">
            Email &quot;{emailError}&quot; in your google account has been previously registered, you cannot use the
            google login feature with this email, if you want to use this email, please login in the usual way, or using
            other email for google login feature.
          </span>
        </div>
      )}

      <Link href="/log-in" className="mt-[5rem]">
        <ViewAllProducts text="Back to login page" type="button" onClick={() => {}} />
      </Link>
    </div>
  );
}

export default ErrorAuth;

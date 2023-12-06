import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

import useCheckIpnVnpay from "@/store/checkout/checkIPN";
import useCheckReturnFromVnpay from "@/store/checkout/checkReturn";

function ReturnVnpayPage() {
  const searchParams = useSearchParams();

  const [statusCode, setStatusCode] = useState("");

  const fetchCheckReturn = useCheckReturnFromVnpay((state) => state.fetch);

  const fetchCheckIpn = useCheckIpnVnpay((state) => state.fetch);

  const checkReturn = useCheckReturnFromVnpay((state) => state.payload);

  useEffect(() => {
    const data = {
      vnp_Amount: searchParams.get("vnp_Amount"),
      vnp_BankCode: searchParams.get("vnp_BankCode"),
      vnp_BankTranNo: searchParams.get("vnp_BankTranNo"),
      vnp_CardType: searchParams.get("vnp_CardType"),
      vnp_OrderInfo: searchParams.get("vnp_OrderInfo"),
      vnp_PayDate: searchParams.get("vnp_PayDate"),
      vnp_ResponseCode: searchParams.get("vnp_ResponseCode"),
      vnp_TmnCode: searchParams.get("vnp_TmnCode"),
      vnp_TransactionNo: searchParams.get("vnp_TransactionNo"),
      vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus"),
      vnp_TxnRef: searchParams.get("vnp_TxnRef"),
      vnp_SecureHash: searchParams.get("vnp_SecureHash"),
      orderIdLocal: getCookie("orderId") || "",
    };

    if (data.vnp_BankTranNo === null) {
      delete data.vnp_BankTranNo;
    }

    if (data.vnp_Amount !== null) {
      fetchCheckReturn(data);

      fetchCheckIpn(data);

      deleteCookie("orderId");
    }
  }, [fetchCheckIpn, fetchCheckReturn, searchParams]);

  useEffect(() => {
    if (checkReturn && checkReturn !== "97") {
      setStatusCode(searchParams.get("vnp_ResponseCode"));
    } else if (checkReturn && checkReturn === "97") {
      setStatusCode("99");
    }
  }, [checkReturn, searchParams]);

  return (
    <div className="container mt-[5rem] flex flex-col items-center justify-center">
      {statusCode === "" && null}

      {statusCode === "00" && (
        <span className="text-[rgb(0,167,111)] font-inter text-[2.875rem] font-[500] leading-[7.1875rem]">
          Payment successful, thank you!
        </span>
      )}

      {statusCode !== "" && statusCode !== "00" && statusCode !== "99" && (
        <span className="text-button-2 font-inter text-[2.875rem] font-[500] leading-[7.1875rem]">
          Payment failed, please try again!
        </span>
      )}

      {statusCode !== "" && statusCode === "99" && (
        <span className="text-button-2 font-inter text-[2.875rem] font-[500] leading-[7.1875rem]">
          illegal transactions!
        </span>
      )}

      <Link href="/" className="mt-[5rem]">
        <ViewAllProducts text="Back to home page" type="button" onClick={() => {}} />
      </Link>
    </div>
  );
}

export default ReturnVnpayPage;

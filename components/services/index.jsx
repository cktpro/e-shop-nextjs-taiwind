import React from "react";
import Image from "next/image";

function Services() {
  return (
    <div className="container flex items-center justify-center">
      <div className="grid grid-cols-12 lg:inline-flex justify-center items-center lg:gap-[5.5rem] mt-[8.75rem]">
        <div className="col-span-12 flex flex-col items-center justify-center gap-[1.5rem]">
          <div className="max-w-[5rem] max-h-[5rem]">
            <Image
              src="/assets/images/services/services.png"
              className="max-w-[5rem] max-h-[5rem]"
              width={1000}
              height={1000}
              alt="..."
              priority
              style={{ height: "auto" }}
              // style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="flex flex-col items-center justify-start gap-[0.5rem]">
            <h4 className="text-text-2 font-inter text-[1.25rem] font-[600] leading-[1.75rem]">
              FREE AND FAST DELIVERY
            </h4>

            <span className="text-text-2 text-center font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
              Free delivery for all orders over $140
            </span>
          </div>
        </div>

        <div className="col-span-12 flex flex-col items-center justify-center gap-[1.5rem] mt-[3rem] lg:mt-[0]">
          <div className="max-w-[5rem] max-h-[5rem]">
            <Image
              src="/assets/images/services/custom.png"
              className="max-w-[5rem] max-h-[5rem]"
              width={1000}
              height={1000}
              alt="..."
              priority
              // style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="flex flex-col items-center justify-start gap-[0.5rem]">
            <h4 className="text-text-2 font-inter text-[1.25rem] font-[600] leading-[1.75rem]">
              24/7 CUSTOMER SERVICE
            </h4>

            <span className="text-text-2 text-center font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
              Friendly 24/7 customer support
            </span>
          </div>
        </div>

        <div className="col-span-12 flex flex-col items-center justify-center gap-[1.5rem] mt-[3rem] lg:mt-[0]">
          <div className="max-w-[5rem] max-h-[5rem]">
            <Image
              src="/assets/images/services/security.png"
              className="max-w-[5rem] max-h-[5rem]"
              width={1000}
              height={1000}
              alt="..."
              priority
              // style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="flex flex-col items-center justify-start gap-[0.5rem]">
            <h4 className="text-text-2 font-inter text-[1.25rem] font-[600] leading-[1.75rem]">MONEY BACK GUARANTEE</h4>

            <span className="text-text-2 text-center font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">
              We reurn money within 30 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;

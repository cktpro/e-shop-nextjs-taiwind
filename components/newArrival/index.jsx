import React from "react";

// import Image from "next/image";
import Rectangle from "../svg/rectangle";

function NewArrival() {
  return (
    <div className="container mt-[8.75rem]">
      <div className="sm:flex items-end mb-[8.5rem] sm:mb-[2.5rem]">
        <div className="sm:flex h-[6.4375rem] flex-col items-start gap-[1.5rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="max-w-[1.25rem] max-h-[2.5rem]">
              <Rectangle />
            </div>

            <span className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Featured</span>
          </div>

          <div className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem]">
            New Arrival
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-12 mt-[3.75rem] gap-0 lg:gap-[1.85rem]">
        <div className="col-span-12">
          <Image
            className="block max-w-full max-h-full object-contain"
            src="/assets/images/products/play5.png"
            alt="..."
            width={570}
            height={600}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div> */}

      {/* <div className="grid grid-cols-12 mt-[3.75rem] gap-[1.85rem]">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 max-w-full rounded-[0.25rem] bg-text-2">
          <Image
            className="block max-w-full max-h-full object-contain"
            src="/assets/images/products/play5.png"
            alt="..."
            width={570}
            height={600}
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="col-span-12 sm:col-span-12 md:col-span-6 max-w-full rounded-[0.25rem] grid grid-cols-12 gap-[1.88rem]">
          <div className="col-span-12">
            <Image
              className="block min-w-full min-h-full object-contain"
              src="/assets/images/products/hat.png"
              alt="..."
              width={570}
              height={280}
              priority
              style={{ width: "auto" }}
            />
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-[1.88rem]">
            <div className="col-span-12 sm:col-span-12 md:col-span-6 max-w-full rounded-[0.25rem]">
              <Image
                className="block max-w-full max-h-full object-contain"
                src="/assets/images/products/speaker.png"
                alt="..."
                width={270}
                height={284}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            <div className="col-span-12 sm:col-span-12 md:col-span-6 max-w-full rounded-[0.25rem]">
              <Image
                className="block max-w-full max-h-full object-contain"
                src="/assets/images/products/perfume.png"
                alt="..."
                width={270}
                height={284}
                priority
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default NewArrival;

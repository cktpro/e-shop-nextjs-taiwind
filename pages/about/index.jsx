import React from "react";
import Image from "next/image";
import Link from "next/link";

import Services from "@/components/services";

function About() {
  return (
    <div className="container mt-[5rem]">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">/</span>

        <span className="text-text-2 font-inter text-[0.875rem] font-[400] leading-[1.3125rem]">About</span>
      </div>

      <div className="mt-[2.63rem] grid grid-cols-2 2xl:flex items-center justify-start gap-[4.69rem]">
        <div className="col-span-2 inline-flex flex-col items-start gap-[2.5rem] 2xl:min-w-[32.8125rem] min-h-[21rem]">
          <h2 className="text-text-2 font-inter text-[3.375rem] font-[600] leading-[4rem] tracking-[0.2025rem]">
            Our Story
          </h2>

          <div className="flex flex-col items-start gap-[1.5rem]">
            <p className="max-w-[32.8125rem] text-text-2 font-inter text-[1rem] font-[400] leading-[1.625rem]">
              Launced in 2015, E-Shop is South Asia’s premier online shopping makterplace with an active presense in
              Bangladesh. Supported by wide range of tailored marketing, data and service solutions, E-Shop has 10,500
              sallers and 300 brands and serves 3 millioons customers across the region.
            </p>

            <p className="max-w-[31.5625rem] font-inter text-[1rem] font-[400] leading-[1.625rem]">
              E-Shop has more than 1 Million products to offer, growing at a very fast. E-Shop offers a diverse
              assotment in categories ranging from consumer.
            </p>
          </div>
        </div>

        <div className="col-span-2 xl:min-w-[44.154rem] min-h-[38.0625rem]">
          <Image
            className="object-contain"
            src="/assets/images/about/about_img.png"
            alt="..."
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="mt-[8.75rem] grid grid-cols-4 gap-[1.88rem]">
        <div className="group hover:bg-secondary-2 transition-colors duration-300 col-span-4 sm:col-span-2 xl:col-span-1 flex items-center justify-center min-w-[16.875rem] min-h-[14.375rem] rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.30)]">
          <div className="flex flex-col items-center gap-[1.5rem]">
            <Image
              className="object-contain max-w-[5rem] max-h-[5rem]"
              src="/assets/images/services/home.png"
              alt="..."
              width={1000}
              height={1000}
            />

            <div className="flex flex-col items-center gap-[0.75rem]">
              <h3 className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]">
                10.5k
              </h3>

              <span className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Sallers active our site
              </span>
            </div>
          </div>
        </div>

        <div className="group hover:bg-secondary-2 transition-colors duration-300 col-span-4 sm:col-span-2 xl:col-span-1 flex items-center justify-center min-w-[16.875rem] min-h-[14.375rem] rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.30)]">
          <div className="flex flex-col items-center gap-[1.5rem]">
            <Image
              className="object-contain max-w-[5rem] max-h-[5rem]"
              src="/assets/images/services/money.png"
              alt="..."
              width={1000}
              height={1000}
            />

            <div className="flex flex-col items-center gap-[0.75rem]">
              <h3 className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]">
                33k
              </h3>

              <span className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Mopnthly Produduct Sale
              </span>
            </div>
          </div>
        </div>

        <div className="group hover:bg-secondary-2 transition-colors duration-300 col-span-4 sm:col-span-2 xl:col-span-1 flex items-center justify-center min-w-[16.875rem] min-h-[14.375rem] rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.30)]">
          <div className="flex flex-col items-center gap-[1.5rem]">
            <Image
              className="object-contain max-w-[5rem] max-h-[5rem]"
              src="/assets/images/services/bag.png"
              alt="..."
              width={1000}
              height={1000}
            />

            <div className="flex flex-col items-center gap-[0.75rem]">
              <h3 className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]">
                45.5k
              </h3>

              <span className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Customer active in our site
              </span>
            </div>
          </div>
        </div>

        <div className="group hover:bg-secondary-2 transition-colors duration-300 col-span-4 sm:col-span-2 xl:col-span-1 flex items-center justify-center min-w-[16.875rem] min-h-[14.375rem] rounded-[0.25rem] border-[1px] border-solid border-[rgba(0,0,0,0.30)]">
          <div className="flex flex-col items-center gap-[1.5rem]">
            <Image
              className="object-contain max-w-[5rem] max-h-[5rem]"
              src="/assets/images/services/money.png"
              alt="..."
              width={1000}
              height={1000}
            />

            <div className="flex flex-col items-center gap-[0.75rem]">
              <h3 className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]">
                25k
              </h3>

              <span className="text-text-2 group-hover:text-text-1 transition-colors duration-300 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Anual gross sale in our site
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[8.75rem] grid grid-cols-3 gap-[1.88rem]">
        <div className="col-span-3 xl:col-span-1 flex flex-col items-center xl:items-start gap-[2rem]">
          <div className="flex max-w-[23.125rem] max-h-[26.875rem] pt-[2.4375rem] pr-[4.1875rem] pb-0 pl-[4.1875rem] bg-secondary-1 rounded-[0.25rem]">
            <Image
              className="object-contain max-w-[14.75rem] max-h-[24.4375rem]"
              src="/assets/images/about/ceo1.png"
              alt="..."
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex flex-col items-start gap-[1rem]">
            <div className="flex flex-col items-start gap-[0.5rem]">
              <h3 className="text-text-2 font-inter text-[2rem] font-[500] leading-[1.875rem] tracking-[0.08rem]">
                Tom Cruise
              </h3>

              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Founder & Chairman
              </span>
            </div>

            <div className="flex items-start gap-[1rem]">
              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/tw.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/intr.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/likein.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-3 xl:col-span-1 flex flex-col items-center xl:items-start gap-[2rem]">
          <div className="flex max-w-[23.125rem] max-h-[26.875rem] pt-[2.0625rem] pr-[2.375rem] pb-0 pl-[2.375rem] bg-secondary-1 rounded-[0.25rem]">
            <Image
              className="object-contain max-w-[18.375rem] max-h-[24.8125rem]"
              src="/assets/images/about/ceo2.png"
              alt="..."
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex flex-col items-start gap-[1rem]">
            <div className="flex flex-col items-start gap-[0.5rem]">
              <h3 className="text-text-2 font-inter text-[2rem] font-[500] leading-[1.875rem] tracking-[0.08rem]">
                Emma Watson
              </h3>

              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">
                Managing Director
              </span>
            </div>

            <div className="flex items-start gap-[1rem]">
              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/tw.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/intr.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/likein.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-3 xl:col-span-1 flex flex-col items-center xl:items-start gap-[2rem]">
          <div className="flex max-w-[23.125rem] max-h-[26.875rem] pt-[2.375rem] pr-[1.375rem] pb-0 pl-[1.375rem] bg-secondary-1 rounded-[0.25rem]">
            <Image
              className="object-contain max-w-[20.375rem] max-h-[24.5rem]"
              src="/assets/images/about/ceo3.png"
              alt="..."
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex flex-col items-start gap-[1rem]">
            <div className="flex flex-col items-start gap-[0.5rem]">
              <h3 className="text-text-2 font-inter text-[2rem] font-[500] leading-[1.875rem] tracking-[0.08rem]">
                Will Smith
              </h3>

              <span className="text-text-2 font-inter text-[1rem] font-[400] leading-[1.5rem]">Product Designer</span>
            </div>

            <div className="flex items-start gap-[1rem]">
              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/tw.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/intr.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>

              <Link href="/">
                <Image
                  className="object-contain max-w-[1.5rem] max-h-[1.5rem]"
                  src="/assets/images/about/likein.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[2.5rem] max-w-full flex items-center justify-center max-h-[1rem]">
        <Image
          className="object-contain max-w-[7rem] max-h-[1rem]"
          src="/assets/images/about/hr.png"
          alt="..."
          width={1000}
          height={1000}
        />
      </div>

      <Services />
    </div>
  );
}

export default About;

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Rectangle from "../svg/rectangle";

function NewArrival() {
  return (
    <div className="container mt-[8.75rem] bg-[#F3F3F3] rounded-[0.25rem] pt-[1rem] pb-[1rem]">
      <div className="w-full inline-flex flex-col items-start gap-[3.75rem]">
        <div className="min-w-[13.5rem] min-h-[6.75rem] flex flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <h3 className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Featured</h3>
          </div>

          <h2 className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] max-w-[13.5rem] max-h-[3rem] whitespace-nowrap">
            New Arrival
          </h2>
        </div>

        <div className="hidden xl:max-w-[73.125rem] xl:max-h-fit xl:gap-[1.875rem] xl:flex xl:items-start">
          <div className="relative xl:max-w-[35.625rem] xl:max-h-[37.5rem] pt-[5.56rem] pl-[1.81rem] pr-[1.88rem] rounded-[0.25rem] bg-text-2">
            <div className="xl:max-w-[31.9375rem] xl:max-h-[31.9375rem] ">
              <Image
                className="object-contain"
                src="/assets/images/arrival/ps5.png"
                alt="..."
                width={1000}
                height={1000}
                priority
              />
            </div>

            <div className="absolute bottom-[2rem] left-[2rem] flex flex-col items-start gap-[1rem]">
              <div className="flex flex-col items-start gap-[1rem]">
                <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                  PlayStation 5
                </h4>

                <span className="max-w-[15.125rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  Black and White version of the PS5 coming out on sale.
                </span>
              </div>

              <Link
                href="/"
                className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="xl:flex xl:flex-col xl:items-center xl:gap-[2rem] xl:max-w-[35.625rem] xl:max-h-[37.5rem]">
            <div className="relative xl:max-w-[35.625rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
              <div className="xl:max-w-[27rem] xl:max-h-[17.875rem] ml-[8.62rem] mb-[0.12rem]">
                <Image
                  className="object-contain rounded-[0.25rem]"
                  src="/assets/images/arrival/hat.png"
                  alt="..."
                  width={1000}
                  height={1000}
                  priority
                />
              </div>

              <div className="absolute bottom-[1.63rem] left-[1.5rem] inline-flex flex-col items-start gap-[1rem]">
                <div className="flex flex-col items-start gap-[1rem]">
                  <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                    Women’s Collections
                  </h4>

                  <span className="max-w-[15.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                    Featured woman collections that give you another vibe.
                  </span>
                </div>

                <Link
                  href="/"
                  className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="xl:max-w-[35.625rem] xl:max-h-[17.75rem] xl:flex xl:items-center xl:justify-center xl:gap-[1.875rem]">
              <div className="relative xl:max-w-[16.875rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
                <div className="xl:max-w-[11.875rem] xl:max-h-[13.8125rem] mt-[1.94rem] mb-[2rem] mx-[2.5rem]">
                  <Image
                    className="object-contain"
                    src="/assets/images/arrival/speaker.png"
                    alt="..."
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>

                <div className="absolute bottom-[1.5rem] left-[1.5rem] inline-flex flex-col items-start gap-[0.5rem]">
                  <div className="flex flex-col items-start gap-[0.5rem]">
                    <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                      Speakers
                    </h4>

                    <span className="max-w-[11.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      Amazon wireless speakers
                    </span>
                  </div>

                  <Link
                    href="/"
                    className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="relative xl:max-w-[16.875rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
                <div className="xl:max-w-[12.5625rem] xl:max-h-[12.6875rem] mt-[2.37rem] mb-[2.69rem] ml-[2.12rem] mr-[2.19rem]">
                  <Image
                    as="image"
                    className="object-contain"
                    src="/assets/images/arrival/perfume.png"
                    alt="..."
                    width={1000}
                    height={1000}
                    priority
                  />
                </div>

                <div className="absolute bottom-[1.5rem] left-[1.5rem] inline-flex flex-col items-start gap-[0.5rem]">
                  <div className="flex flex-col items-start gap-[0.5rem]">
                    <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                      Perfume
                    </h4>

                    <span className="max-w-[11.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                      GUCCI INTENSE OUD EDP
                    </span>
                  </div>

                  <Link
                    href="/"
                    className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center xl:hidden">
          <div className="grid grid-cols-12">
            <div className="relative col-span-12 mb-[1.88rem] mr-0 lg:mb-0 lg:mr-[1.88rem] lg:col-span-6 bg-text-2 rounded-[0.25rem]">
              <div className="ml-[1.81rem] mt-[5.56rem] mr-[1.87rem]">
                <Image
                  className="object-contain"
                  src="/assets/images/arrival/ps5.png"
                  alt="..."
                  width={1000}
                  height={1000}
                  priority
                />
              </div>

              <div className="absolute bottom-[2rem] left-[2rem] flex flex-col items-start gap-[1rem]">
                <div className="flex flex-col items-start gap-[1rem]">
                  <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                    PlayStation 5
                  </h4>

                  <span className="max-w-[15.125rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                    Black and White version of the PS5 coming out on sale.
                  </span>
                </div>

                <Link
                  href="/"
                  className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-12">
                <div className="relative col-span-12 mb-[2rem] bg-text-2 rounded-[0.25rem]">
                  <div className="ml-[8.62rem] mb-[0.12rem]">
                    <Image
                      className="object-contain"
                      src="/assets/images/arrival/hat.png"
                      alt="..."
                      width={1000}
                      height={1000}
                      priority
                    />
                  </div>

                  <div className="absolute bottom-[1.63rem] left-[1.5rem] inline-flex flex-col items-start gap-[1rem]">
                    <div className="flex flex-col items-start gap-[1rem]">
                      <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                        Women’s Collections
                      </h4>

                      <span className="max-w-[15.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                        Featured woman collections that give you another vibe.
                      </span>
                    </div>

                    <Link
                      href="/"
                      className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>

                <div className="col-span-12">
                  <div className="grid grid-cols-12 gap-[1.88rem]">
                    <div className="relative col-span-6 bg-text-2 rounded-[0.25rem]">
                      <div className="mt-[1.94rem] mx-[2.5rem] mb-[2rem]">
                        <Image
                          className="object-contain"
                          src="/assets/images/arrival/speaker.png"
                          alt="..."
                          width={1000}
                          height={1000}
                          priority
                        />
                      </div>

                      <div className="absolute bottom-[1.5rem] left-[1.5rem] inline-flex flex-col items-start gap-[0.5rem]">
                        <div className="flex flex-col items-start gap-[0.5rem]">
                          <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                            Speakers
                          </h4>

                          <span className="max-w-[11.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                            Amazon wireless speakers
                          </span>
                        </div>

                        <Link
                          href="/"
                          className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>

                    <div className="relative col-span-6 bg-text-2 rounded-[0.25rem]">
                      <div className="mt-[2.37rem] mr-[2.19rem] mb-[2.69rem] ml-[2.13rem]">
                        <Image
                          as="image"
                          className="object-contain"
                          src="/assets/images/arrival/perfume.png"
                          alt="..."
                          width={1000}
                          height={1000}
                          priority
                        />
                      </div>

                      <div className="absolute bottom-[1.5rem] left-[1.5rem] inline-flex flex-col items-start gap-[0.5rem]">
                        <div className="flex flex-col items-start gap-[0.5rem]">
                          <h4 className="text-text-1 font-inter text-[1.5rem] font-[600] leading-[1.5rem] tracking-[0.045rem]">
                            Perfume
                          </h4>

                          <span className="max-w-[11.9375rem] text-text-1 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                            GUCCI INTENSE OUD EDP
                          </span>
                        </div>

                        <Link
                          href="/"
                          className="text-primary-1 font-poppins text-[1rem] font-[500] leading-[1.5rem] border-b-gray-400 border-b-[2px]"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewArrival;

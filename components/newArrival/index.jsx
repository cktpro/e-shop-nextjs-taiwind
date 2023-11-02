import React from "react";
import Image from "next/image";

import Rectangle from "../svg/rectangle";

function NewArrival() {
  return (
    <div className="container mt-[8.75rem]">
      <div className="w-full inline-flex flex-col items-start gap-[3.75rem]">
        <div className="min-w-[13.5rem] min-h-[6.75rem] flex flex-col items-start gap-[1.25rem]">
          <div className="flex items-center gap-[1rem]">
            <div className="min-w-[1.25rem] min-h-[2.5rem]">
              <Rectangle />
            </div>

            <span className="text-secondary-2 font-poppins text-[1rem] font-[600] leading-[1.25rem]">Featured</span>
          </div>

          <div className="text-text-2 font-inter text-[2.25rem] font-[600] leading-[3rem] tracking-[0.09rem] max-w-[13.5rem] max-h-[3rem] whitespace-nowrap">
            New Arrival
          </div>
        </div>

        <div className="hidden xl:max-w-[73.125rem] xl:max-h-fit xl:gap-[1.875rem] xl:flex xl:items-start">
          <div className="xl:max-w-[35.625rem] xl:max-h-[37.5rem] pt-[5.56rem] pl-[1.81rem] pr-[1.88rem] rounded-[0.25rem] bg-text-2">
            <div className="xl:max-w-[31.9375rem] xl:max-h-[31.9375rem] ">
              <Image
                className="object-contain"
                src="/assets/images/arrival/ps5.png"
                alt="..."
                width={511}
                height={511}
                priority
              />
            </div>
          </div>

          <div className="xl:flex xl:flex-col xl:items-center xl:gap-[2rem] xl:max-w-[35.625rem] xl:max-h-[37.5rem]">
            <div className="xl:max-w-[35.625rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
              <div className="xl:max-w-[27rem] xl:max-h-[17.875rem] ml-[8.62rem] mb-[0.12rem]">
                <Image
                  className="object-contain"
                  src="/assets/images/arrival/hat.png"
                  alt="..."
                  width={511}
                  height={511}
                  priority
                />
              </div>
            </div>

            <div className="xl:max-w-[35.625rem] xl:max-h-[17.75rem] xl:flex xl:items-center xl:justify-center xl:gap-[1.875rem]">
              <div className="xl:max-w-[16.875rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
                <div className="xl:max-w-[11.875rem] xl:max-h-[13.8125rem] mt-[1.94rem] mb-[2rem] mx-[2.5rem]">
                  <Image
                    className="object-contain"
                    src="/assets/images/arrival/speaker.png"
                    alt="..."
                    width={511}
                    height={511}
                    priority
                  />
                </div>
              </div>

              <div className="xl:max-w-[16.875rem] xl:max-h-[17.75rem] rounded-[0.25rem] bg-text-2">
                <div className="xl:max-w-[12.5625rem] xl:max-h-[12.6875rem] mt-[2.37rem] mb-[2.69rem] ml-[2.12rem] mr-[2.19rem]">
                  <Image
                    className="object-contain"
                    src="/assets/images/arrival/perfume.png"
                    alt="..."
                    width={511}
                    height={511}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center xl:hidden">
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-[1.88rem] mr-0 lg:mb-0 lg:mr-[1.88rem] lg:col-span-6 bg-text-2 rounded-[0.25rem]">
              <div className="ml-[1.81rem] mt-[5.56rem] mr-[1.87rem]">
                <Image
                  className="object-contain"
                  src="/assets/images/arrival/ps5.png"
                  alt="..."
                  width={511}
                  height={511}
                  priority
                />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-6">
              <div className="grid grid-cols-12">
                <div className="col-span-12 mb-[2rem] bg-text-2 rounded-[0.25rem]">
                  <div className="ml-[8.62rem] mb-[0.12rem]">
                    <Image
                      className="object-contain"
                      src="/assets/images/arrival/hat.png"
                      alt="..."
                      width={432}
                      height={284}
                      priority
                    />
                  </div>
                </div>

                <div className="col-span-12">
                  <div className="grid grid-cols-12 gap-[1.88rem]">
                    <div className="col-span-6 bg-text-2 rounded-[0.25rem]">
                      <div className="mt-[1.94rem] mx-[2.5rem] mb-[2rem]">
                        <Image
                          className="object-contain"
                          src="/assets/images/arrival/speaker.png"
                          alt="..."
                          width={190}
                          height={221}
                          priority
                        />
                      </div>
                    </div>

                    <div className="col-span-6 bg-text-2 rounded-[0.25rem]">
                      <div className="mt-[2.37rem] mr-[2.19rem] mb-[2.69rem] ml-[2.13rem]">
                        <Image
                          className="object-contain"
                          src="/assets/images/arrival/perfume.png"
                          alt="..."
                          width={201}
                          height={203}
                          priority
                        />
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

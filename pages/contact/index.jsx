import React from "react";
import Image from "next/image";
import Link from "next/link";

import ViewAllProducts from "@/components/buttons/viewAllProduct";

function Contact() {
  return (
    <div className="container mt-[5rem]">
      <div className="flex items-center gap-[0.75rem] max-h-[1.3125rem] min-w-full">
        <Link
          href="/"
          className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem] opacity-[0.5]"
        >
          Home
        </Link>

        <span className="flex items-center justify-center w-[0.82456rem] text-text-2 opacity-[0.5] mb-[0.3rem]">/</span>

        <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">Cantact</span>
      </div>

      <div className="mt-[5rem] flex flex-col xl:flex-row xl:items-center xl:justify-start gap-[1.88rem]">
        <div className="min-w-[21.25rem] inline-flex pt-[2.5rem] pr-[2.1875rem] pb-[3.1875rem] pl-[2.1875rem] rounded-[0.25rem] bg-primary-1 shadow-custom">
          <div className="flex flex-col items-start gap-[2rem]">
            <div className="flex flex-col items-start gap-[1.5rem]">
              <div className="flex items-center gap-[1rem]">
                <Image
                  className="object-contain max-w-[2.5rem] max-h-[2.5rem]"
                  src="/assets/images/contact/phone.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />

                <h3 className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Call To Us</h3>
              </div>

              <div className="flex flex-col items-start gap-[1rem]">
                <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  We are available 24/7, 7 days a week.
                </span>

                <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  Phone: +8801611112222
                </span>
              </div>
            </div>

            <hr className="min-w-full border-[1px] border-solid border-gray-400" />

            <div className="flex flex-col items-start gap-[1.5rem]">
              <div className="flex items-center gap-[1rem]">
                <Image
                  className="object-contain max-w-[2.5rem] max-h-[2.5rem]"
                  src="/assets/images/contact/mail.png"
                  alt="..."
                  width={1000}
                  height={1000}
                />

                <h3 className="text-text-2 font-poppins text-[1rem] font-[500] leading-[1.5rem]">Write To US</h3>
              </div>

              <div className="flex flex-col items-start gap-[1rem]">
                <span className="max-w-[15.625rem] text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  Fill out our form and we will contact you within 24 hours.
                </span>

                <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  Emails: customer@exclusive.com
                </span>

                <span className="text-text-2 font-poppins text-[0.875rem] font-[400] leading-[1.3125rem]">
                  Emails: support@exclusive.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <form className="inline-flex items-center justify-center py-[2.5rem] pl-[1.9375rem] pr-[2rem] rounded-[0.25rem] bg-primary-1 shadow-custom">
          <div className="min-w-full sm:min-w-fit flex flex-col xl:items-end gap-[2rem]">
            <div className="grid grid-cols-3 gap-[1rem]">
              <label className="col-span-3 sm:col-span-1" htmlFor="yourName">
                <input
                  className="rounded-[0.25rem] bg-secondary-1 min-w-full sm:min-w-[14.6875rem] max-h-[3.125rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem px-[1rem] py-[0.81rem]"
                  type="text"
                  id="yourName"
                  name="yourName"
                  placeholder="Your Name *"
                />
              </label>

              <label className="col-span-3 sm:col-span-1" htmlFor="yourEmail">
                <input
                  className="rounded-[0.25rem] bg-secondary-1 min-w-full sm:min-w-[14.6875rem] max-h-[3.125rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem px-[1rem] py-[0.81rem]"
                  type="text"
                  id="yourEmail"
                  name="yourEmail"
                  placeholder="Your Email *"
                />
              </label>

              <label className="col-span-3 sm:col-span-1" htmlFor="yourPhone">
                <input
                  className="rounded-[0.25rem] bg-secondary-1 min-w-full sm:min-w-[14.6875rem] max-h-[3.125rem] text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem px-[1rem] py-[0.81rem]"
                  type="text"
                  id="yourPhone"
                  name="yourPhone"
                  placeholder="Your Phone *"
                />
              </label>
            </div>

            <label htmlFor="yourMessage">
              <textarea
                className="min-w-full sm:min-w-[46.0625rem] min-h-[12.9375rem] rounded-[0.25rem] bg-secondary-1 text-text-2 font-poppins text-[1rem] font-[400] leading-[1.5rem px-[1rem] py-[0.81rem]"
                id="yourMessage"
                name="yourMessage"
                placeholder="Your Message"
              />
            </label>

            <div className="flex items-center justify-end">
              <ViewAllProducts text="Send Massage" type="submit" onClick={() => {}} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;

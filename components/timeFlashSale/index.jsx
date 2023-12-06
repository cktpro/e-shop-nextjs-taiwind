import React, { useEffect, useState } from "react";

import { useTrans } from "@/helper/chanLang";
import { formatNumberToString, formatTime } from "@/helper/timeFlashSale";
import useGetTimeFlashsale from "@/store/timeFlashSale";

import Dot from "../svg/dot";

function TimeFlashSale() {
  let interval;

  const endOfSale = useGetTimeFlashsale((state) => state.timeFlashsale);

  const getFlashsaleTime = useGetTimeFlashsale((state) => state.fetch);

  const [numOfSecond, setNumOfSecond] = useState(endOfSale);
  const [dateTime, setDateTime] = useState(formatTime(endOfSale));

  useEffect(() => {
    getFlashsaleTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setNumOfSecond(endOfSale);
    setDateTime(formatTime(endOfSale));
  }, [endOfSale]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interval = setInterval(() => {
      setNumOfSecond((s) => s - 1);
    }, 1000);

    if (numOfSecond <= 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [numOfSecond]);

  useEffect(() => {
    if (numOfSecond <= 0) {
      clearInterval(interval);
    }

    setDateTime(formatTime(numOfSecond));

    return () => {
      clearInterval(interval);
    };
  }, [interval, numOfSecond]);

  return (
    <div className="flex lg:flex mb-[4rem] sm:mb-0 col-span-12 max-w-[18.875rem] min-h-[3.125rem]">
      <div className="inline-flex min-h-[3.125rem] flex-col items-start gap-[0.25rem] flex-shrink-0">
        <span className="min-w-[1.9375rem] max-h-[1.125rem] text-white font-inter text-[0.75rem] font-[500] leading-[1.125rem]">
          {useTrans("flashSale.days")}
        </span>

        <span
          className="max-w-[2.875rem] max-h-[1.75rem] flex-shrink-0 text-white font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]"
          suppressHydrationWarning
        >
          {formatNumberToString(dateTime.day)}
        </span>
      </div>

      <div className="inline-flex flex-col items-start gap-[0.5rem] mt-[1.63rem] ml-[0.75rem] md:ml-[1.06rem] mr-[0.75rem] md:mr-[1.06rem]">
        <Dot /> <Dot />
      </div>

      <div className="inline-flex min-w-[2.625rem] max-h-[3.125rem] flex-col items-start gap-[0.25rem] flex-shrink-0">
        <span className="min-w-[2.1875rem] max-h-[1.125rem] text-white font-inter text-[0.75rem] font-[500] leading-[1.125rem]">
          {useTrans("flashSale.hours")}
        </span>

        <span
          className="max-w-[2.6875rem] max-h-[1.875rem] flex-shrink-0 text-white font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]"
          suppressHydrationWarning
        >
          {formatNumberToString(dateTime.hour)}
        </span>
      </div>

      <div className="inline-flex flex-col items-start gap-[0.5rem] mt-[1.63rem] ml-[0.75rem] md:ml-[1.06rem] mr-[0.75rem] md:mr-[1.06rem]">
        <Dot /> <Dot />
      </div>

      <div className="inline-flex min-w-[2.625rem] max-h-[3.125rem] flex-col items-start gap-[0.25rem] flex-shrink-0">
        <span className="min-w-[3.0625rem] max-h-[1.125rem] text-white font-inter text-[0.75rem] font-[500] leading-[1.125rem]">
          {useTrans("flashSale.minutes")}
        </span>

        <span
          className="max-w-[2.4375rem] max-h-[1.75rem] flex-shrink-0 text-white font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]"
          suppressHydrationWarning
        >
          {formatNumberToString(dateTime.minute)}
        </span>
      </div>

      <div className="inline-flex flex-col items-start gap-[0.5rem] mt-[1.63rem] ml-[0.75rem] md:ml-[1.06rem] mr-[0.75rem] md:mr-[1.06rem]">
        <Dot /> <Dot />
      </div>

      <div className="inline-flex min-w-[2.625rem] max-h-[3.125rem] flex-col items-start gap-[0.25rem] flex-shrink-0">
        <span className="min-w-[3.25rem] max-h-[1.125rem] text-white font-inter text-[0.75rem] font-[500] leading-[1.125rem]">
          {useTrans("flashSale.seconds")}
        </span>

        <span
          className="min-w-[2.75rem] max-h-[1.875rem] flex-shrink-0 text-white font-inter text-[2rem] font-[700] leading-[1.875rem] tracking-[0.08rem]"
          suppressHydrationWarning
        >
          {formatNumberToString(dateTime.second)}
        </span>
      </div>
    </div>
  );
}

export default TimeFlashSale;

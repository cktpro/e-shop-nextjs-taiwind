import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  timeFlashsale: 0,
};

const useGetTimeFlashsale = create((set) => ({
  ...initialState,

  fetch: async () => {
    const res = await axiosClient.get("/time-flashsale");

    let time = res.data.payload.expirationTime.slice(0, 10);

    time += " 23:59:59";

    const now = new Date();

    const endDate = new Date(time);

    const daysUntilEndDate = Math.floor(endDate - now) / 1000;

    if (daysUntilEndDate <= 0) {
      set(() => ({
        timeFlashsale: 0,
      }));
    } else {
      set(() => ({
        timeFlashsale: parseInt(daysUntilEndDate, 10),
      }));
    }
  },
}));

export default useGetTimeFlashsale;

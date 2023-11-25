import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  payload: {},
};

const useFetchCheckout = create((set) => ({
  ...initialState,

  fetch: async (data) => {
    try {
      const url = "/vnPay/create_payment_url";

      const response = await axiosClient.post(url, data);

      console.log("««««« response.data »»»»»", response.data);

      set({ payload: response.data });
    } catch (error) {
      set({ payload: error.response.data });
    }
  },
}));

export default useFetchCheckout;

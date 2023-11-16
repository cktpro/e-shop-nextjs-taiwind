import { create } from "zustand";

import { axiosUser } from "@/helper/axios";

const initialState = {
  isLoading: false,
  payload: {},
};

const useFetchCheckout = create((set) => ({
  ...initialState,

  fetch: async (data) => {
    const url = "http://localhost:9000/vnPay/create_payment_url";

    const response = await axiosUser.post(url, data);

    set({ payload: await response.data });
  },
}));

export default useFetchCheckout;

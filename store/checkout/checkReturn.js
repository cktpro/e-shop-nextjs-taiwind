import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  payload: "",
};

const useCheckReturnFromVnpay = create((set) => ({
  ...initialState,

  fetch: async (data) => {
    try {
      const queryArray = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`);

      const url = `/vnPay/vnpay_return?${queryArray.join("&")}`;

      const response = await axiosClient.get(url, data);

      set({ payload: response.data.statusCode.toString() });
    } catch (error) {
      set({ payload: error.response.data.statusCode.toString() });
    }
  },
}));

export default useCheckReturnFromVnpay;

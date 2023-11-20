import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  payload: {},
};

const useCheckIpnVnpay = create((set) => ({
  ...initialState,

  fetch: async (data) => {
    try {
      const queryArray = Object.keys(data).map((key) => `${key}=${encodeURIComponent(data[key])}`);

      const url = `/vnPay/check_ipn?${queryArray.join("&")}`;

      const response = await axiosClient.get(url, data);

      set({ payload: response.data });
    } catch (error) {
      set({ payload: error.response.data });
    }
  },
}));

export default useCheckIpnVnpay;

import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  orderList: [],
};

const userOrder = create((set) => ({
  ...initialState,

  getOrder: async (id) => {
    set({ isLoading: true });
    try {
      const res = await axiosClient.get(`/orders/customer/${id}`);
      set({ isLoading: false, orderList: res.data.payload });
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
    }
    set(() => ({}));
  },
}));

export default userOrder;

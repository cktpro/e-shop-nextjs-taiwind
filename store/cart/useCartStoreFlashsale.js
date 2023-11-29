import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  cart: [],
};

const useCartStoreFlashsale = create((set) => ({
  ...initialState,

  getListCartFlashSale: async () => {
    set({ isLoading: true });
    try {
      const result = await axiosClient.get("/cart/get-cart-flashsale");
      const data = result.data.payload;
      set({ cart: data, totalItem: data.length, isLoading: false });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
    }
  },
}));

export default useCartStoreFlashsale;

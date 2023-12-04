import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  payload: "",
};

const createUser = create((set) => ({
  ...initialState,

  post: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosClient.post("/orders-admin/create/customer", data);

      set({ isLoading: false, payload: res.data });
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error.response.data);

      set({ isLoading: false, payload: error.response.data });
    }
    set(() => ({}));
  },

  reset: () => {
    set({ isLoading: false, payload: initialState.payload });
  },
}));

export default createUser;

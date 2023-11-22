import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isAuthenticated: false,
};

const useAuthUser = create((set) => ({
  ...initialState,

  fetchAuthUser: async () => {
    try {
      const url = "/authCustomers/profile";

      const response = await axiosClient.get(url);

      if (response.data.payload) {
        set(() => ({
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      set(() => ({
        isAuthenticated: false,
      }));
    }
  },
}));

export default useAuthUser;

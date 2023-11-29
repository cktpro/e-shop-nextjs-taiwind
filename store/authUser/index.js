import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  profile: {},
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
          profile: response.data.payload,
          isAuthenticated: true,
        }));
      }
    } catch (error) {
      set(() => ({
        profile: {},
        isAuthenticated: false,
      }));
    }
  },
}));

export default useAuthUser;

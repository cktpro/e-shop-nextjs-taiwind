import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  isLoading: false,
  profile: {},
  isAuthenticated: false,
};

const useProfile = create((set) => ({
  ...initialState,

  getProfile: async () => {
    set(() => ({
      isLoading: true,
    }));
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
        isLoading: false,
        profile: {},
        isAuthenticated: false,
      }));
    }
  },
}));

export default useProfile;

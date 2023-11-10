import { create } from "zustand";

const initialState = {
  isOpenNotification: false,
};

const useNotification = create((set) => ({
  ...initialState,

  openNotification: () => {
    set(() => ({
      isOpenNotification: true,
    }));
  },

  closeNotification: () => {
    set(() => ({
      isOpenNotification: false,
    }));
  },
}));

export default useNotification;

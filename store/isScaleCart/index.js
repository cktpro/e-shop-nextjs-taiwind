import { create } from "zustand";

const initialState = {
  isScaleCart: false,
};

const useScaleCart = create((set) => ({
  ...initialState,

  openScaleCart: () => {
    set(() => ({
      isScaleCart: true,
    }));
  },

  closeScaleCart: () => {
    set(() => ({
      isScaleCart: false,
    }));
  },
}));

export default useScaleCart;

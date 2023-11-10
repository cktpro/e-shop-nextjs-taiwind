import { create } from "zustand";

const initialState = {
  keySearch: [],
};

const useKeySearch = create((set) => ({
  ...initialState,

  addKeySearch: (products) => {
    const updateKeySearch = products.map((item) => {
      return {
        id: item.id,
        title: item.title,
      };
    });

    set(() => ({
      keySearch: updateKeySearch,
    }));
  },
}));

export default useKeySearch;

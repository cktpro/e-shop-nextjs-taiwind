import { create } from "zustand";

const initialState = {
  keySuggest: [],
};

const useKeySuggest = create((set) => ({
  ...initialState,

  addKeySuggest: (products) => {
    const updateKeySuggest = products.map((item) => {
      return {
        id: item._id,
        name: item.name,
      };
    });

    set(() => ({
      keySuggest: updateKeySuggest,
    }));
  },
}));

export default useKeySuggest;

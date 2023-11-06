import { create } from "zustand";

const initialState = {
  cart: [],
  totalItem: 0,
  totalPrice: 0,
};

const useCartStore = create((set, get) => ({
  ...initialState,

  addToCart: (product) => {
    const { cart } = get();

    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const updatedCart = cart.map((item) => {
        return item.id === product.id ? { ...item, quantity: parseInt(item.quantity, 10) + 1 } : item;
      });

      set((state) => ({
        cart: updatedCart,

        totalItem: parseInt(state.totalItem, 10) + 1,

        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,

        totalItem: parseInt(state.totalItem, 10) + 1,

        totalPrice: state.totalPrice + product.price,
      }));
    }
  },

  increase: (product) => {
    const { cart } = get();

    const updatedCart = cart.map((item) => {
      return item.id === product.id ? { ...item, quantity: parseInt(item.quantity, 10) + 1 } : item;
    });

    set((state) => ({
      cart: updatedCart,

      totalItem: parseInt(state.totalItem, 10) + 1,

      totalPrice: state.totalPrice + product.price,
    }));
  },

  reduce: (product) => {
    const { cart } = get();

    const updatedCart = cart.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: item.quantity === 1 ? 1 : parseInt(item.quantity, 10) - 1 }
        : item;
    });

    set((state) => ({
      cart: updatedCart,

      totalItem: parseInt(state.totalItem, 10) - 1,

      totalPrice: state.totalPrice - product.price,
    }));
  },

  removeFromCart: (product) => {
    const { cart } = get();

    const itemDeleted = cart.filter((item) => {
      return item.id === product.id;
    });

    const quantityDeleted = parseInt(itemDeleted[0].quantity, 10);

    set((state) => ({
      cart: state.cart.filter((item) => {
        return item.id !== product.id;
      }),

      totalItem: parseInt(state.totalItem, 10) - quantityDeleted,

      totalPrice: state.totalPrice - product.price,
    }));
  },

  resetCart: () => {
    set(() => ({
      cart: initialState.cart,

      totalItem: initialState.totalItem,

      totalPrice: initialState.totalPrice,
    }));
  },
}));

export default useCartStore;

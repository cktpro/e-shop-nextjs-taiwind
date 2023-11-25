import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  cart: [],
  totalItem: 0,
  subtotal: 0,
  shipping: 0,
  coupon: "",
  total: 0,
};

const useCartStore = create((set, get) => ({
  ...initialState,

  getDetail: async () => {
    try {
      const res = await axiosClient.get("/cart");

      set(() => ({
        cart: res.data.payload.products,
        totalItem: res.data.payload.totalItem,
        subtotal: res.data.payload.subtotal,
        shipping: res.data.payload.shipping,
        coupon: "",
        total: res.data.payload.total.toFixed(2),
      }));
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  addToCart: async (product) => {
    try {
      const data = { ...product, shipping: 5 };
      const res = await axiosClient.post("/cart", data);

      set(() => ({
        cart: res.data.payload.products,
        totalItem: res.data.payload.totalItem,
        subtotal: res.data.payload.subtotal,
        shipping: res.data.payload.shipping,
        coupon: "",
        total: res.data.payload.total.toFixed(2),
      }));
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  increase: (product) => {
    const { cart } = get();

    const shipping = 5;

    const updatedCart = cart.map((item) => {
      return item.id === product.id ? { ...item, quantity: parseInt(item.quantity, 10) + 1 } : item;
    });

    set((state) => ({
      cart: updatedCart,

      totalItem: parseInt(state.totalItem, 10) + 1,

      subtotal: (parseFloat(state.subtotal) + parseFloat(product.price)).toFixed(2),

      shipping: parseFloat(shipping).toFixed(2),

      coupon: "",

      total: (parseFloat(state.subtotal) + parseFloat(shipping) + parseFloat(product.price)).toFixed(2),
    }));
  },

  reduce: (product) => {
    const { cart } = get();

    let shipping = 5;

    let updatedCart = cart.map((item) => {
      return item.id === product.id ? { ...item, quantity: parseInt(item.quantity, 10) - 1 } : item;
    });

    updatedCart = updatedCart.filter((item) => {
      return item.quantity > 0;
    });

    if (updatedCart.length === 0) {
      shipping = 0;
    }

    set((state) => ({
      cart: updatedCart,

      totalItem: parseInt(state.totalItem, 10) - 1,

      subtotal: (parseFloat(state.subtotal) - parseFloat(product.price)).toFixed(2),

      shipping: parseFloat(shipping).toFixed(2),

      coupon: "",

      total: (parseFloat(state.subtotal) + parseFloat(shipping) - parseFloat(product.price)).toFixed(2),
    }));
  },

  removeFromCart: async (product) => {
    console.log("««««« product »»»»»", product);
    try {
      const res = await axiosClient.post("/cart/remove", product);

      set(() => ({
        cart: res.data.payload.products,
        totalItem: res.data.payload.totalItem,
        subtotal: res.data.payload.subtotal,
        shipping: res.data.payload.shipping,
        coupon: "",
        total: res.data.payload.total.toFixed(2),
      }));
    } catch (error) {
      console.log("««««« error »»»»»", error);
    }
  },

  applyCoupon: (coupon) => {
    const { cart } = get();

    const validCoupons = ["freeship", "10%"];

    if (validCoupons.includes(coupon)) {
      set(() => ({
        coupon,
      }));
    }

    if (coupon === "freeship" && cart.length > 0) {
      const shipping = 0;

      set((state) => ({
        shipping: parseFloat(shipping).toFixed(2),

        total: parseFloat(state.subtotal).toFixed(2),
      }));
    }

    if (coupon === "10%" && cart.length > 0) {
      const shipping = 5;

      set((state) => ({
        shipping: parseFloat(shipping).toFixed(2),

        total: (((100 - 10) * parseFloat(state.subtotal)) / 100 + parseFloat(shipping)).toFixed(2),
      }));
    }
  },

  resetCart: () => {
    set(() => ({
      cart: initialState.cart,

      totalItem: initialState.totalItem,

      subtotal: initialState.subtotal,

      coupon: initialState.coupon,

      total: initialState.total,
    }));
  },
}));

export default useCartStore;

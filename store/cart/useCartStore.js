import { create } from "zustand";

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

  addToCart: (product) => {
    const { cart } = get();

    const shipping = 5;

    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
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
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,

        totalItem: parseInt(state.totalItem, 10) + 1,

        subtotal: (parseFloat(state.subtotal) + parseFloat(product.price)).toFixed(2),

        shipping: parseFloat(shipping).toFixed(2),

        coupon: "",

        total: (parseFloat(state.subtotal) + parseFloat(shipping) + parseFloat(product.price)).toFixed(2),
      }));
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

  removeFromCart: (product) => {
    const { cart } = get();

    let shipping = 5;

    const itemDeleted = cart.filter((item) => {
      return item.id === product.id;
    });

    const updatedCart = cart.filter((item) => {
      return item.id !== product.id;
    });

    if (updatedCart.length === 0) {
      shipping = 0;
    }

    const quantityDeleted = parseInt(itemDeleted[0].quantity, 10);

    set((state) => ({
      cart: updatedCart,

      totalItem: parseInt(state.totalItem, 10) - quantityDeleted,

      subtotal: (parseFloat(state.subtotal) - parseFloat(product.price) * quantityDeleted).toFixed(2),

      shipping: parseFloat(shipping).toFixed(2),

      coupon: "",

      total: (parseFloat(state.subtotal) + parseFloat(shipping) - parseFloat(product.price) * quantityDeleted).toFixed(
        2,
      ),
    }));
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

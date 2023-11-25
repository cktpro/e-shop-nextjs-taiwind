import { message } from "antd";
import { create } from "zustand";

import { axiosClient } from "@/helper/axios/axiosClient";

const initialState = {
  cart: [],
  isLoading: false,
  totalItem: 0,
  subtotal: 0,
  shipping: 0,
  coupon: "",
  total: 0,
};

const useCartStore = create((set, get) => ({
  ...initialState,
  getFee: async (address, product) => {
    set({ isLoading: true, isFeeShip: false });
    try {
      let width = 0;
      let height = 0;
      let length = 0;
      let weight = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < product.length; i++) {
        width += product[i].productDetail.width * product[i].product.quantity;
        height += product[i].productDetail.height * product[i].product.quantity;
        weight += product[i].productDetail.weight * product[i].product.quantity;
        length += product[i].productDetail.length * product[i].product.quantity;
      }
      // console.log('◀◀◀  ▶▶▶',width,
      // height,
      // length,
      // weight);
      const dataShip = {
        from_district_id: 1526,
        from_ward_code: "40103",
        // service_id: 53320,
        service_type_id: 2,
        // "to_district_id":1526,
        // "to_ward_code":"40103",
        height,
        length,
        weight,
        width,
        to_district_id: parseInt(address.districtId, 10),
        to_ward_code: address.wardId.toString(),
        // height: 50,
        // length: 20,
        // weight: 200,
        // width: 20,
        insurance_value: 0,
        cod_failed_amount: 2000,
        coupon: null,
      };
      axiosClient.defaults.headers.common.token = "b100dde3-66b8-11ee-96dc-de6f804954c9";
      const res = await axiosClient.post(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        dataShip,
      );
      set({ isFeeShip: true, feeShip: res.data.data.total, isLoading: false });
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },
  updateCart: async (data) => {
    set({ isLoading: true });
    try {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        // console.log('◀◀◀ data[i] ▶▶▶',data[i].product);
        // eslint-disable-next-line no-await-in-loop
        await axiosClient.put("/cart", data[i].product);
      }
      const result = await axiosClient.get("/cart");
      set({ cart: result.data.payload, isLoading: false });
      message.success("Cập nhật thành công");
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
      message.error("Cập nhật thất bại");
    }
  },
  getListCart: async () => {
    set({ isLoading: true });
    try {
      const result = await axiosClient.get("/cart");
      const data = result.data.payload;
      set({ cart: data, totalItem: data.length, isLoading: false });
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
    }
  },
  addToCart: async (product) => {
    set({
      isLoading: true,
    });
    try {
      await axiosClient.post("cart", product);
      const newCart = await axiosClient.get("/cart");
      set({
        isLoading: false,
        cart: newCart.data.payload,
        totalItem: newCart.data.payload.length,
      });
      message.success("Add cart success");
    } catch (error) {
      set({
        isLoading: false,
      });
      console.log("◀◀◀ error ▶▶▶", error);
      message.error("Add cart failed");
    }
    // const { cart } = get();

    // const shipping = 5;

    // const cartItem = cart.find((item) => item.id === product.id);

    // if (cartItem) {
    //   const updatedCart = cart.map((item) => {
    //     return item.id === product.id
    //       ? { ...item, quantity: parseInt(item.quantity, 10) + parseInt(product.quantity, 10) }
    //       : item;
    //   });

    //   set((state) => ({
    //     cart: updatedCart,

    //     totalItem: parseInt(state.totalItem, 10) + product.quantity,

    //     subtotal: (parseFloat(state.subtotal) + parseFloat(product.price) * parseInt(product.quantity, 10)).toFixed(2),

    //     shipping: parseFloat(shipping).toFixed(2),

    //     coupon: "",

    //     total: (
    //       parseFloat(state.subtotal) +
    //       parseFloat(shipping) +
    //       parseFloat(product.price) * parseInt(product.quantity, 10)
    //     ).toFixed(2),
    //   }));
    // } else {
    //   const updatedCart = [...cart, { ...product, quantity: product.quantity }];

    //   set((state) => ({
    //     cart: updatedCart,

    //     totalItem: parseInt(state.totalItem, 10) + product.quantity,

    //     subtotal: (parseFloat(state.subtotal) + parseFloat(product.price) * parseInt(product.quantity, 10)).toFixed(2),

    //     shipping: parseFloat(shipping).toFixed(2),

    //     coupon: "",

    //     total: (
    //       parseFloat(state.subtotal) +
    //       parseFloat(shipping) +
    //       parseFloat(product.price) * parseInt(product.quantity, 10)
    //     ).toFixed(2),
    //   }));
    // }
  },

  increase: (product) => {
    const { cart } = get();

    const shipping = 5;

    const updatedCart = cart.map((item) => {
      return item.id === product.id
        ? { ...item, product: { ...item.product, quantity: parseInt(item.product.quantity, 10) + 1 } }
        : item;
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
    set({ isLoading: true });
    console.log("««««« product »»»»»", product);
    try {
      await axiosClient.delete(`/cart/${product.productId}`);
      const result = await axiosClient.get("/cart");
      const data = result.data.payload;
      console.log("««««« data »»»»»", data);
      set(() => ({
        cart: data,
        totalItem: data.length,
        isLoading: false,
      }));
      message.success("Xóa thành công");
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
      message.error("Xóa thất bại");
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

  resetCart: async () => {
    set({ isLoading: true });
    try {
      const result = await axiosClient.delete("cart");
      set({ isLoading: false, cart: result.data.payload, totalItem: result.data.payload.length });
    } catch (error) {
      console.log("◀◀◀ error ▶▶▶", error);
      set({ isLoading: false });
    }
  },
}));

export default useCartStore;

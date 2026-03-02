import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "ui",
  initialState: { modalType: null },
  reducers: {
    showCart(state) {
      state.modalType = "cart";
    },
    showCheckout(state) {
      state.modalType = "checkout";
    },
    hideModal(state) {
      state.modalType = null;
    },
  },
});

export const uiAction = modalSlice.actions;

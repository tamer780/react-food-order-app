import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { modalSlice } from "./uiSlice";

const store = configureStore({
  reducer: { cart: cartSlice.reducer, ui: modalSlice.reducer },
});

export default store;

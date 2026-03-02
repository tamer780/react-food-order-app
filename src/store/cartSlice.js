import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const price = +newItem.price;
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      state.totalQuantity++;

      state.totalPrice = Number(state.totalPrice) + price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: price,
          quantity: 1,
          totalPrice: price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + price;
      }
    },

    removeItem: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (!existingItem) return;

      state.totalQuantity--;

      state.totalPrice = Number(state.totalPrice) - existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;

        existingItem.totalPrice =
          Number(existingItem.totalPrice) - existingItem.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

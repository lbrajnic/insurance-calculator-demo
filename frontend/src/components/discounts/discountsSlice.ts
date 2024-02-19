import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DiscountsState {
  activeDiscounts: string[];
}

const initialState: DiscountsState = {
  activeDiscounts: [],
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    toggleDiscount: (state, action: PayloadAction<{ discount: string }>) => {
      const { discount } = action.payload;
      if (!state.activeDiscounts.includes(discount)) {
        state.activeDiscounts.push(discount);
      } else {
        state.activeDiscounts = state.activeDiscounts.filter(
          (activeDiscount) => activeDiscount !== discount
        );
      }
    },
    toggleMultipleDiscounts: (state, action: PayloadAction<string[]>) => {
      state.activeDiscounts = action.payload;
    },
    resetDiscounts: () => initialState,
  },
});

export const { toggleDiscount, toggleMultipleDiscounts, resetDiscounts } =
  discountsSlice.actions;

export default discountsSlice.reducer;

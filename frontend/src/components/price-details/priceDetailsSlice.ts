import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InsuranceCalculations {
  agentsDiscount: number;
  autoLiability: number; // AO+
  basePrice: number;
  bonusProtection: number;
  commercialDiscount: number;
  glassProtection: number;
  priceMatch: number;
  strongCarSurcharge: number;
  totalPrice: number;
  vipDiscount: number;
  voucher: number;
}

export interface PriceDetailsState {
  insuranceCalculations: Partial<InsuranceCalculations>;
}

const initialState: PriceDetailsState = {
  insuranceCalculations: {},
};

const priceDetailsSlice = createSlice({
  name: "priceDetails",
  initialState,
  reducers: {
   updateInsuranceCalculations: (
      state,
      action: PayloadAction<Partial<InsuranceCalculations>>
    ) => {
      state.insuranceCalculations = action.payload;
    },
    resetPriceDetails: () => initialState,
  },
});

export const { updateInsuranceCalculations, resetPriceDetails } =
  priceDetailsSlice.actions;

export default priceDetailsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CustomerInput {
  customerName: string;
  birthdate: string;
  city: string;
  vehiclePower: number | undefined;
  voucher?: number;
  priceMatch?: number | undefined;
}

export interface CustomerFormState {
  insuranceId: string;
  formData: CustomerInput;
}

const initialState: CustomerFormState = {
  insuranceId: "",
  formData: {
    customerName: "",
    birthdate: "",
    city: "",
    vehiclePower: 0,
    voucher: 0,
    priceMatch: undefined,
  },
};

const customerFormSlice = createSlice({
  name: "customerForm",
  initialState,
  reducers: {
    saveCustomerForm: (
      state,
      action: PayloadAction<Partial<CustomerFormState>>
    ) => {
      const { insuranceId, formData } = action.payload;
      if (insuranceId) {
        state.insuranceId = insuranceId;
      }
      if (formData) {
        state.formData = formData;
      }
    },
    updateCustomerForm: (
      state,
      action: PayloadAction<Partial<CustomerFormState>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    saveInsuranceId: (state, action: PayloadAction<string>) => {
      state.insuranceId = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const {
  saveCustomerForm,
  updateCustomerForm,
  saveInsuranceId,
  resetForm,
} = customerFormSlice.actions;

export default customerFormSlice.reducer;

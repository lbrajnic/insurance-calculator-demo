import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coveragesReducer from "../components/coverages/coveragesSlice";
import customerFormReducer from "../components/customer-form/customerFormSlice";
import discountsReducer from "../components/discounts/discountsSlice";
import priceDetailsReducer from "../components/price-details/priceDetailsSlice";
import { insuranceApiSlice } from "../api/insuranceApi";

const rootReducer = combineReducers({
  coverages: coveragesReducer,
  customerForm: customerFormReducer,
  discounts: discountsReducer,
  priceDetails: priceDetailsReducer,
  [insuranceApiSlice.reducerPath]: insuranceApiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(insuranceApiSlice.middleware),
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(insuranceApiSlice.middleware),
  });
}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

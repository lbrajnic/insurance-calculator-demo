import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { INSURANCES_API_ENDPOINT } from "../utils/constants";
import {
  CustomerInput,
  saveCustomerForm,
  saveInsuranceId,
} from "../components/customer-form/customerFormSlice";
import {
  DiscountsState,
  toggleMultipleDiscounts,
} from "../components/discounts/discountsSlice";
import {
  CoveragesState,
  toggleMultipleCoverages,
} from "../components/coverages/coveragesSlice";
import {
  InsuranceCalculations,
  updateInsuranceCalculations,
} from "../components/price-details/priceDetailsSlice";

interface CombinedForm extends CustomerInput, DiscountsState, CoveragesState {}

export interface Insurance extends CombinedForm {
  id: string;
  totalPrice: number;
  insuranceCalculations: Partial<InsuranceCalculations>;
}

export const insuranceApiSlice = createApi({
  reducerPath: "insuranceApi",
  baseQuery: fetchBaseQuery({ baseUrl: INSURANCES_API_ENDPOINT }),
  tagTypes: ["Insurance"],
  endpoints: (builder) => ({
    getInsurances: builder.query<Insurance[], void>({
      query: () => "/",
      providesTags: ["Insurance"],
    }),
    getInsurance: builder.query<Insurance, string>({
      query: (id) => `/${id}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            const {
              activeCoverages,
              activeDiscounts,
              birthdate,
              city,
              customerName,
              vehiclePower,
              voucher,
              insuranceCalculations,
            } = data;

            dispatch(
              saveCustomerForm({
                insuranceId: id,
                formData: {
                  customerName,
                  birthdate: birthdate.split("T")[0] ?? "",
                  city,
                  vehiclePower,
                  voucher,
                },
              })
            );
            dispatch(toggleMultipleDiscounts(activeDiscounts));
            dispatch(toggleMultipleCoverages(activeCoverages));
            dispatch(updateInsuranceCalculations(insuranceCalculations));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
    saveInsurance: builder.mutation<Insurance, CombinedForm>({
      query: (insuranceData) => ({
        url: "/",
        method: "POST",
        body: insuranceData,
        invalidatesTags: ["Insurance"],
      }),
      async onQueryStarted(insuranceData, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { insuranceCalculations, id: insuranceId },
          } = await queryFulfilled;
          dispatch(saveInsuranceId(insuranceId));
          dispatch(updateInsuranceCalculations(insuranceCalculations));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    updateInsurance: builder.mutation<
      Insurance,
      { id: string; data: CombinedForm }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Insurance"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { insuranceCalculations },
          } = await queryFulfilled;
          dispatch(saveInsuranceId(id));
          dispatch(updateInsuranceCalculations(insuranceCalculations));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    deleteInsurance: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Insurance"],
    }),
  }),
});

export const {
  useGetInsurancesQuery,
  useGetInsuranceQuery,
  useSaveInsuranceMutation,
  useUpdateInsuranceMutation,
  useDeleteInsuranceMutation,
} = insuranceApiSlice;

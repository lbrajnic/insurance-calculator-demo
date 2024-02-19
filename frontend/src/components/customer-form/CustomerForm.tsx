import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import CustomerInput from "../customer-input/CustomerInput";
import { FaSave } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import {
  useGetInsuranceQuery,
  useSaveInsuranceMutation,
  useUpdateInsuranceMutation,
} from "../../api/insuranceApi";
import { updateCustomerForm } from "./customerFormSlice";
import {
  CURRENCY,
  MIN_VEHICLE_POWER,
  MIN_VOUCHER,
} from "../../utils/constants";

const CustomerForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { insuranceId } = useParams<{
    insuranceId: string;
  }>();
  const { insuranceId: insuranceIdFromState, formData } = useAppSelector(
    (state) => state.customerForm
  );
  const { activeCoverages } = useAppSelector((state) => state.coverages);
  const { activeDiscounts } = useAppSelector((state) => state.discounts);

  const { isLoading: isFetching, refetch: refetchInsurance } =
    useGetInsuranceQuery(insuranceId ?? skipToken);

  const [saveInsurance, { isLoading: isSaving }] = useSaveInsuranceMutation();
  const [updateInsurance, { isLoading: isUpdating }] =
    useUpdateInsuranceMutation();

  useEffect(() => {
    if (insuranceId) {
      refetchInsurance();
    }
  }, [insuranceId]);

  useEffect(() => {
    if (insuranceIdFromState && !insuranceId) {
      navigate(`/insurances/${insuranceIdFromState}`, { replace: true });
    }
  }, [insuranceIdFromState]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    const newValue = type === "number" ? parseInt(value) : value;
    dispatch(updateCustomerForm({ [name]: newValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      saveInsurance({ ...formData, activeCoverages, activeDiscounts });
    } catch (error) {
      console.error("Error saving insurance:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (insuranceId) {
        updateInsurance({
          id: insuranceId,
          data: { ...formData, activeCoverages, activeDiscounts },
        });
      }
    } catch (error) {
      console.error("Error updating insurance:", error);
    }
  };

  const styles = {
    base: "flex-col lg:flex-row my-2",
    label: "basis-1/3",
    input: "lg:flex-1",
  };

  return (
    <div className="mx-2 lg:mx-8">
      <div className="font-bold text-xl mb-2">User Data</div>
      <form onSubmit={handleSubmit}>
        <CustomerInput
          id={"customerName"}
          className={styles}
          text={"Name:"}
          name={"customerName"}
          type={"text"}
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <CustomerInput
          id={"birthdate"}
          className={styles}
          text={"Birthdate:"}
          name={"birthdate"}
          type={"date"}
          value={formData.birthdate}
          onChange={handleChange}
          required
        />

        <CustomerInput
          id={"city"}
          className={styles}
          text={"City:"}
          name={"city"}
          type={"text"}
          value={formData.city}
          onChange={handleChange}
          required
        />

        <CustomerInput
          id={"number"}
          className={styles}
          text={"Vehicle Power:"}
          name={"vehiclePower"}
          type={"number"}
          value={formData.vehiclePower}
          onChange={handleChange}
          extraLabel={"kW"}
          required
          min={MIN_VEHICLE_POWER}
        />

        <CustomerInput
          id={"voucher"}
          className={styles}
          text={"Voucher:"}
          name={"voucher"}
          type={"number"}
          value={formData.voucher}
          onChange={handleChange}
          extraLabel={CURRENCY}
          min={MIN_VOUCHER}
        />

        <CustomerInput
          id={"priceMatch"}
          className={styles}
          text={"Price match:"}
          name={"priceMatch"}
          type={"number"}
          value={formData.priceMatch}
          onChange={handleChange}
          extraLabel={CURRENCY}
          min={MIN_VOUCHER}
        />

        <div className="flex my-2">
          <div className="lg:basis-1/3"></div>
          <button
            type="submit"
            className="inline-block px-4 py-2 ml-2 mt-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
          >
            <span>
              <FaSave className="inline-block mr-2 mb-1" />
              Save New
            </span>
          </button>
          <div
            onClick={() => handleUpdate()}
            className="inline-block cursor-pointer px-4 py-2 ml-2 mt-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
          >
            <span>
              <GrUpdate className="inline-block mr-2 mb-1" />
              Update
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;

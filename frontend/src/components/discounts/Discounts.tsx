import React, { useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { toggleDiscount } from "./discountsSlice";
import { useUpdateInsuranceMutation } from "../../api/insuranceApi";
import { DISCOUNTS_LIST } from "../../utils/constants";
import TotalPrice from "../shared/TotalPrice";

const Discounts: React.FC = () => {
  const dispatch = useAppDispatch();
  const prevActiveDiscountsRef = useRef<string[]>([]);
  const { insuranceId } = useParams<{ insuranceId: string }>();
  const { formData } = useAppSelector((state) => state.customerForm);
  const { vehiclePower } = formData;
  const { activeDiscounts } = useAppSelector((state) => state.discounts);
  const { activeCoverages } = useAppSelector((state) => state.coverages);
  const {
    insuranceCalculations: { totalPrice },
  } = useAppSelector((state) => state.priceDetails);

  const [updateInsurance, { isLoading: isUpdating }] =
    useUpdateInsuranceMutation();

  useEffect(() => {
    const prevActiveDiscounts = prevActiveDiscountsRef.current;
    if (insuranceId && prevActiveDiscounts.length !== activeDiscounts.length) {
      try {
        updateInsurance({
          id: insuranceId,
          data: { ...formData, activeCoverages, activeDiscounts },
        });
        prevActiveDiscountsRef.current = activeDiscounts;
      } catch (error) {
        console.error("Error updating insurance:", error);
      }
    }
  }, [activeDiscounts]);

  useEffect(() => {
    const isStrongCarSurchargeActive =
      activeDiscounts.includes("strongCarSurcharge");
    const isVipDiscountActive = activeDiscounts.includes("vipDiscount");

    if (vehiclePower && vehiclePower > 100 && !isStrongCarSurchargeActive) {
      dispatch(toggleDiscount({ discount: "strongCarSurcharge" }));
    } else if (
      vehiclePower &&
      vehiclePower <= 100 &&
      isStrongCarSurchargeActive
    ) {
      dispatch(toggleDiscount({ discount: "strongCarSurcharge" }));
    }

    if (vehiclePower && vehiclePower <= 80 && isVipDiscountActive) {
      dispatch(toggleDiscount({ discount: "vipDiscount" }));
    }
  }, [vehiclePower]);

  useEffect(() => {
    const active = activeDiscounts.includes("agentsDiscount");
    if (activeCoverages.length < 2 && active) {
      dispatch(toggleDiscount({ discount: "agentsDiscount" }));
    }
  }, [activeCoverages]);

  function handleCheckbox(discount: string) {
    dispatch(toggleDiscount({ discount }));
  }

  const isDiscountDisabled = useCallback(
    (discountId: string): boolean => {
      let isDisabled = false;
      switch (discountId) {
        case "strongCarSurcharge":
          isDisabled = true;
          break;

        case "agentsDiscount":
          if (activeCoverages.length < 2) {
            isDisabled = true;
          }
          break;

        default:
          isDisabled = false;
          break;
      }
      return isDisabled;
    },
    [activeCoverages]
  );

  const isDiscountHidden = useCallback(
    (discountId: string): boolean => {
      let isHidden = false;
      switch (discountId) {
        case "vipDiscount":
          if (vehiclePower !== undefined && vehiclePower <= 80) {
            isHidden = true;
          }
          break;

        default:
          isHidden = false;
          break;
      }
      return isHidden;
    },
    [vehiclePower]
  );

  return (
    <div className="flex p-1 md:p-4 items-center justify-between bg-gray-200 rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      {DISCOUNTS_LIST.map(({ id, label }) => (
        <div
          key={id}
          className={`${isDiscountHidden(id) ? "hidden" : "flex mx-2 w-1/5"}`}
        >
          <input
            className="mr-2"
            id={id}
            title={label}
            type="checkbox"
            checked={activeDiscounts.includes(id)}
            onChange={() => handleCheckbox(id)}
            disabled={isDiscountDisabled(id)}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
      <TotalPrice className={"hidden md:inline-block w-1/5"} totalPrice={totalPrice} />
    </div>
  );
};

export default Discounts;

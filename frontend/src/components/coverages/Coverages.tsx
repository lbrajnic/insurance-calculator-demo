import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { toggleCoverage } from "./coveragesSlice";
import { useUpdateInsuranceMutation } from "../../api/insuranceApi";
import { COVERAGES_LIST } from "../../utils/constants";

const Coverages: React.FC = () => {
  const dispatch = useAppDispatch();
  const prevActiveCoveragesRef = useRef<string[]>([]);

  const { insuranceId } = useParams<{ insuranceId: string }>();
  const { formData } = useAppSelector((state) => state.customerForm);
  const { activeCoverages } = useAppSelector((state) => state.coverages);
  const { activeDiscounts } = useAppSelector((state) => state.discounts);

  const [updateInsurance, { isLoading: isUpdating }] =
    useUpdateInsuranceMutation();

  useEffect(() => {
    const prevActiveCoverages = prevActiveCoveragesRef.current;
    if (insuranceId && prevActiveCoverages.length !== activeCoverages.length) {
      try {
        updateInsurance({
          id: insuranceId,
          data: { ...formData, activeCoverages, activeDiscounts },
        });
        prevActiveCoveragesRef.current = activeCoverages;
      } catch (error) {
        console.error("Error updating insurance:", error);
      }
    }
  }, [activeCoverages]);

  function handleCheckbox(coverage: string) {
    dispatch(toggleCoverage({ coverage }));
  }

  return (
    <div className="ml-4 p-4 rounded bg-gray-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="font-bold text-xl mb-2">Coverages</div>
      <div className="">
        {COVERAGES_LIST.map(({ id, label }) => (
          <div key={id}>
            <input
              className="mr-2 mb-3"
              id={id}
              title={label}
              type="checkbox"
              checked={activeCoverages.includes(id)}
              onChange={() => handleCheckbox(id)}
            />
            <label htmlFor={id}>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coverages;

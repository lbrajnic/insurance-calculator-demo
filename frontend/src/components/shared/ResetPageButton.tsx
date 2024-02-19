import React from "react";
import { useNavigate } from "react-router-dom";
import { RxReset } from "react-icons/rx";
import { useAppDispatch } from "../../stores/hooks";
import { resetForm } from "../customer-form/customerFormSlice";
import { resetDiscounts } from "../discounts/discountsSlice";
import { resetCoverages } from "../coverages/coveragesSlice";
import { resetPriceDetails } from "../price-details/priceDetailsSlice";

type ResetPageButtonProps = {
  className?: string;
};

const ResetPageButton: React.FC<ResetPageButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleReset = async () => {
    dispatch(resetForm());
    dispatch(resetDiscounts());
    dispatch(resetCoverages());
    dispatch(resetPriceDetails());
    navigate("/");
  };

  return (
    <div
      onClick={handleReset}
      className={`${className} cursor-pointer px-4 py-2 mt-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300`}
    >
      <span>
        <RxReset className="inline-block mr-2 mb-1" />
        Reset page
      </span>
    </div>
  );
};

export default ResetPageButton;

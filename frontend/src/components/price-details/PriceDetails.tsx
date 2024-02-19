import React from "react";
import { FaTable } from "react-icons/fa";
import { useAppSelector } from "../../stores/hooks";
import { useNavigate } from "react-router-dom";
import {
  COVERAGES_LIST,
  DISCOUNTS_LIST,
  CURRENCY,
  CURRENCY_SYMBOL,
} from "../../utils/constants";
import { InsuranceCalculations } from "./priceDetailsSlice";

const PriceList: React.FC = () => {
  const navigate = useNavigate();

  const { insuranceCalculations } = useAppSelector(
    (state) => state.priceDetails
  );
console.log(insuranceCalculations);

  const handleClick = () => {
    navigate("/table");
  };

  const formatValue = (value: number | undefined, sign: string) => {
    return value ? `${sign} ${value} ${CURRENCY_SYMBOL}` : "";
  };

  const camelToKebab = (str: string) =>
    str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  return (
    <div className="w-full md:w-2/3 mt-4">
      <div className="p-4 rounded bg-gray-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex justify-between mb-2 font-bold text-xl border-b border-gray-400 py-2">
          <span>Price List</span>
          <span>{CURRENCY}</span>
        </div>
        <ul>
          <li id="base-price-item" className="flex justify-between mb-2">
            <span>Base price</span>
            <span>{formatValue(insuranceCalculations.basePrice, "")}</span>
          </li>

          {DISCOUNTS_LIST.map((discount) => (
            <li
              id={`${camelToKebab(discount.id)}-item`}
              key={discount.id}
              className="flex justify-between mb-2"
            >
              <span>{discount.label}</span>
              <span>
                {formatValue(
                  insuranceCalculations[
                    discount.id as keyof InsuranceCalculations
                  ],
                  discount.sign
                )}
              </span>
            </li>
          ))}

          {COVERAGES_LIST.map((coverage) => (
            <li
              id={`${camelToKebab(coverage.id)}-item`}
              key={coverage.id}
              className="flex justify-between mb-2"
            >
              <span>{coverage.label}</span>
              <span>
                {formatValue(
                  insuranceCalculations[
                    coverage.id as keyof InsuranceCalculations
                  ],
                  coverage.sign
                )}
              </span>
            </li>
          ))}

          <li id="voucher-item" className="flex justify-between mb-2">
            <span>Voucher</span>
            <span>{formatValue(insuranceCalculations.voucher, "-")}</span>
          </li>

          <li
            id="total-price-items"
            className="border-t border-gray-400 mt-4 py-2 flex justify-between"
          >
            <span className="font-bold">Total price</span>
            <span className="font-bold">
              {formatValue(insuranceCalculations.totalPrice, "")}
            </span>
          </li>
        </ul>
      </div>
      <div
        className="inline-block cursor-pointer px-4 py-2 mt-4 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
        onClick={handleClick}
      >
        <span>
          <FaTable className="inline-block mr-2" />
          Insurances
        </span>
      </div>
    </div>
  );
};

export default PriceList;

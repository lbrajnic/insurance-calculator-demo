import React from "react";
import { CURRENCY_SYMBOL } from "../../utils/constants";

interface TotalPriceProps {
  className?: string;
  totalPrice: number | undefined;
}

const TotalPrice: React.FC<TotalPriceProps> = ({ className, totalPrice }) => {
  return (
    <div className={`${className} bg-gray-300 rounded-lg p-2`}>
      <div className="font-bold">Total price:</div>
      <div>
        {totalPrice} {totalPrice && CURRENCY_SYMBOL}
      </div>
    </div>
  );
};

export default TotalPrice;

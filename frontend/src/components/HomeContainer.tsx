import React from "react";
import { useAppSelector } from "../stores/hooks";

import CustomerForm from "./customer-form/CustomerForm";
import Discounts from "./discounts/Discounts";
import Coverages from "./coverages/Coverages";
import ResetPageButton from "./shared/ResetPageButton";
import PriceDetails from "./price-details/PriceDetails";
import Loader from "./shared/Loader";
import TotalPrice from "./shared/TotalPrice";

const HomeContainer: React.FC = () => {
  const {
    insuranceCalculations: { totalPrice },
  } = useAppSelector((state) => state.priceDetails);
  return (
    <>
      <Loader />
      <div className="font-sans font-semibold text-gray-700 p-2 mt-2 lg:mt-16 lg:max-w-3xl m-auto">
        <div className="mb-6">
          <Discounts />
        </div>
        <div className="flex mb-6">
          <div className="flex-auto w-64">
            <CustomerForm />
          </div>
          <div className="flex-auto w-32">
            <Coverages />
            <ResetPageButton className={"mx-auto mt-6 w-32"} />
            <TotalPrice className={"md:hidden inline-block mx-5 mt-5"} totalPrice={totalPrice} />
          </div>
        </div>
        <hr />
        <div>
          <PriceDetails />
        </div>
      </div>
    </>
  );
};

export default HomeContainer;

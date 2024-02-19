import { BrowserRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Coverages from "../../components/coverages/Coverages";
import PriceDetails from "../../components/price-details/PriceDetails";
import CustomerForm from "../../components/customer-form/CustomerForm";
import Discounts from "../../components/discounts/Discounts";

test("strong car surcharge should be disabled, and if vehicle power is more then 100, it also should be active", async () => {
  const { getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <Coverages />
      <Discounts />
    </BrowserRouter>,
    {
      preloadedState: {
        customerForm: {
          insuranceId: "",
          formData: {
            customerName: "Luka",
            birthdate: "2024-02-16",
            city: "Zagreb",
            vehiclePower: 101,
          },
        },
      },
    }
  );

  const strongCarSurchargeCheckbox = getByLabelText("Strong car surcharge");
  expect(strongCarSurchargeCheckbox).toBeDisabled();
  expect(strongCarSurchargeCheckbox).toBeChecked();
});

test("based on given state, all discounts should be checked", async () => {
  const { getByText, getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <PriceDetails />
      <Discounts />
      <Coverages />
      <CustomerForm />
    </BrowserRouter>,
    {
      preloadedState: {
        customerForm: {
          insuranceId: "65d25bfff299e40aa9b38fb7",
          formData: {
            customerName: "Pero",
            birthdate: "2024-02-16",
            city: "Zagreb",
            vehiclePower: 110,
            voucher: 0,
          },
        },
        discounts: {
          activeDiscounts: [
            "strongCarSurcharge",
            "commercialDiscount",
            "vipDiscount",
            "agentsDiscount",
          ],
        },
        coverages: {
          activeCoverages: ["glassProtection", "bonusProtection"],
        },
      },
    }
  );

  const commercialDiscountCheckbox = getByLabelText("Commercial discount");
  const agentsDiscountCheckbox = getByLabelText("Agents discount");
  const vipDiscountCheckbox = getByLabelText("VIP discount");
  const strongCarSurchargeCheckbox = getByLabelText("Strong car surcharge");

  expect(commercialDiscountCheckbox).toBeChecked();
  expect(agentsDiscountCheckbox).toBeChecked();
  expect(vipDiscountCheckbox).toBeChecked();
  expect(strongCarSurchargeCheckbox).toBeChecked();
});

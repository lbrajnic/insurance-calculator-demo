import { BrowserRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Coverages from "../../components/coverages/Coverages";
import PriceDetails from "../../components/price-details/PriceDetails";
import CustomerForm from "../../components/customer-form/CustomerForm";
import Discounts from "../../components/discounts/Discounts";
import ResetPageButton from "../../components/shared/ResetPageButton";

test("Form should display total price after saving new customer data", async () => {
  const { getByText, getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <CustomerForm />
      <PriceDetails />
    </BrowserRouter>,
    {
      preloadedState: {
        customerForm: {
          insuranceId: "",
          formData: {
            customerName: "Luka",
            birthdate: "2024-02-16",
            city: "Zagreb",
            vehiclePower: 110,
          },
        },
        coverages: {
          activeCoverages: ["glassProtection", "bonusProtection"],
        },
        discounts: {
          activeDiscounts: ["commercialDiscount"],
        },
      },
    }
  );

  const saveButton = getByText("Save New");
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(getByLabelText("Luka")).toBeInTheDocument();
    expect(getByLabelText("2024-02-16")).toBeInTheDocument();
    expect(getByLabelText("Zagreb")).toBeInTheDocument();

    expect(getByText(/220.6 €/)).toBeInTheDocument();
  });
});

test("All checkboxes should also reset after clicking 'Reset' button", async () => {
  const { getByText, getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <CustomerForm />
      <Coverages />
      <Discounts />
      <ResetPageButton />
    </BrowserRouter>,
    {
      preloadedState: {
        customerForm: {
          insuranceId: "",
          formData: {
            customerName: "Luka",
            birthdate: "2024-02-16",
            city: "Zagreb",
            vehiclePower: 110,
            voucher: 0,
          },
        },
        coverages: {
          activeCoverages: [
            "glassProtection",
            "bonusProtection",
            "autoLiability",
          ],
        },
        discounts: {
          activeDiscounts: [
            "commercialDiscount",
            "strongCarSurcharge",
            "agentsDiscount",
            "vipDiscount",
          ],
        },
      },
    }
  );

  const bonusProtectionCheckbox = getByLabelText("Bonus protection");
  const autoLiabilityCheckbox = getByLabelText("AO+");
  const glassProtectionCheckbox = getByLabelText("Glass protection");
  const commercialDiscountCheckbox = getByLabelText("Commercial discount");
  const agentsDiscountCheckbox = getByLabelText("Agents discount");
  const strongCarSurchargeCheckbox = getByLabelText("Strong car surcharge");
  const vipDiscountCheckbox = getByLabelText("VIP discount");

  expect(bonusProtectionCheckbox).toBeChecked();
  expect(autoLiabilityCheckbox).toBeChecked();
  expect(agentsDiscountCheckbox).toBeChecked();
  expect(glassProtectionCheckbox).toBeChecked();
  expect(commercialDiscountCheckbox).toBeChecked();
  expect(agentsDiscountCheckbox).toBeChecked();
  expect(strongCarSurchargeCheckbox).toBeChecked();
  expect(vipDiscountCheckbox).toBeChecked();

  const resetPageButton = getByText(/Reset/);
  fireEvent.click(resetPageButton);

  expect(bonusProtectionCheckbox).not.toBeChecked();
  expect(autoLiabilityCheckbox).not.toBeChecked();
  expect(glassProtectionCheckbox).not.toBeChecked();
  expect(commercialDiscountCheckbox).not.toBeChecked();
  expect(agentsDiscountCheckbox).not.toBeChecked();
  expect(strongCarSurchargeCheckbox).not.toBeChecked();
  expect(vipDiscountCheckbox).not.toBeChecked();
});

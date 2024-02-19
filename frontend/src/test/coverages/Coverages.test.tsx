import { BrowserRouter } from "react-router-dom";
import { expect, test } from "vitest";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Coverages from "../../components/coverages/Coverages";
import PriceDetails from "../../components/price-details/PriceDetails";
import CustomerForm from "../../components/customer-form/CustomerForm";
import Discounts from "../../components/discounts/Discounts";

test("on inital state checkboxes should be visible and unchecked", async () => {
  const { getByLabelText } = renderWithProviders(<Coverages />);

  const bonusProtectionCheckbox = getByLabelText("Bonus protection");
  expect(bonusProtectionCheckbox).toBeInTheDocument();
  expect(bonusProtectionCheckbox).not.toBeChecked();

  const autoLiabilityCheckbox = getByLabelText("AO+");
  expect(autoLiabilityCheckbox).toBeInTheDocument();
  expect(autoLiabilityCheckbox).not.toBeChecked();

  const glassProtectionCheckbox = getByLabelText("Glass protection");
  expect(glassProtectionCheckbox).toBeInTheDocument();
  expect(glassProtectionCheckbox).not.toBeChecked();
});

test("after clicking coverages, checkboxes should be checked and their prices should be visible", async () => {
  const { getByText, getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <Coverages />
      <CustomerForm />
      <PriceDetails />
    </BrowserRouter>,
    {
      preloadedState: {
        priceDetails: {
          insuranceCalculations: {
            glassProtection: 10,
            autoLiability: 55,
            bonusProtection: 15,
          },
        },
      },
    }
  );

  const bonusProtectionCheckbox = getByLabelText("Bonus protection");
  fireEvent.click(bonusProtectionCheckbox);
  const glassProtectionCheckbox = getByLabelText("Glass protection");
  fireEvent.click(glassProtectionCheckbox);
  const autoLiabilityCheckbox = getByLabelText("AO+");
  fireEvent.click(autoLiabilityCheckbox);

  await waitFor(() => {
    expect(glassProtectionCheckbox).toBeChecked();
    expect(getByText(/10 €/)).toBeInTheDocument();
    expect(autoLiabilityCheckbox).toBeChecked();
    expect(getByText(/55 €/)).toBeInTheDocument();
    expect(bonusProtectionCheckbox).toBeChecked();
    expect(getByText(/15 €/)).toBeInTheDocument();
  });
});

test("after selecting two coverages, agents discount checkbox should be enabled", async () => {
  const { getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <Coverages />
      <Discounts />
    </BrowserRouter>
  );

  const agentsDiscountCheckbox = getByLabelText("Agents discount");
  expect(agentsDiscountCheckbox).toBeDisabled();

  const bonusProtectionCheckbox = getByLabelText("Bonus protection");
  fireEvent.click(bonusProtectionCheckbox);
  const autoLiabilityCheckbox = getByLabelText("AO+");
  fireEvent.click(autoLiabilityCheckbox);

  expect(agentsDiscountCheckbox).not.toBeDisabled();
});

test("after unselecting one of the coverages, agents discount checkbox should be disabled again", async () => {
  const { getByLabelText } = renderWithProviders(
    <BrowserRouter>
      <Coverages />
      <Discounts />
    </BrowserRouter>,
    {
      preloadedState: {
        coverages: {
          activeCoverages: ["glassProtection", "bonusProtection"],
        },
      },
    }
  );

  const agentsDiscountCheckbox = getByLabelText("Agents discount");
  expect(agentsDiscountCheckbox).not.toBeDisabled();

  const bonusProtectionCheckbox = getByLabelText("Bonus protection");
  expect(bonusProtectionCheckbox).toBeChecked();
  const glassProtectionCheckbox = getByLabelText("Glass protection");
  expect(glassProtectionCheckbox).toBeChecked();
  fireEvent.click(bonusProtectionCheckbox);

  expect(agentsDiscountCheckbox).toBeDisabled();
});

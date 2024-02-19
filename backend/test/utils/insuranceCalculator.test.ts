import {
  InsuranceCalculator,
  InsuranceData,
} from "../../src/utils/insuranceCalculator";

import { InsuranceConfigData } from "../../src/services/insurance-config.service";

describe("InsuranceCalculator", () => {
  const mockInsuranceConfig: InsuranceConfigData = {
    bonusProtection: 0.12,
    autoLiabilityUnder30: 55,
    autoLiabilityOverAnd30: 105,
    glassProtection: 0.8,
    commercialDiscount: 0.1,
    agentsDiscount: 0.2,
    agentsDiscountCoveragesNeeded: 2,
    vipDiscount: 0.05,
    vipDiscountVehiclePower: 80,
    strongCarSurcharge: 0.1,
    strongCarSurchargeVehiclePower: 100,
  };

  const mockInsuranceData: InsuranceData = {
    basePrice: 130,
    customerAge: 25,
    vehiclePower: 110,
    activeDiscounts: [
      "commercialDiscount",
      "agentsDiscount",
      "vipDiscount",
      "strongCarSurcharge",
    ],
    activeCoverages: ["bonusProtection", "autoLiability", "glassProtection"],
    insuranceConfig: mockInsuranceConfig,
  };

  let calculator: InsuranceCalculator;

  beforeEach(() => {
    calculator = new InsuranceCalculator(mockInsuranceData);
  });

  test("calculateBonusProtection", () => {
    expect(calculator.calculateBonusProtection(["bonusProtection"])).toBe(
      15.6
    );
    expect(calculator.calculateBonusProtection([])).toBe(0);
  });

  test("calculateAutoLiability", () => {
    expect(calculator.calculateAutoLiability(["autoLiability"], 25)).toBe(
      55
    );
    expect(calculator.calculateAutoLiability(["autoLiability"], 35)).toBe(
      105
    );
    expect(calculator.calculateAutoLiability([], 35)).toBe(0);
  });

  test("calculateGlassProtection", () => {
    expect(
      calculator.calculateGlassProtection(["glassProtection"], 110)
    ).toBe(88);
    expect(calculator.calculateGlassProtection([], 110)).toBe(0);
  });

  test("calculateCommercialDiscount", () => {
    expect(calculator.calculateCommercialDiscount(["commercialDiscount"])).toBe(
      13
    );
    expect(calculator.calculateCommercialDiscount([])).toBe(0);
  });

  test("calculateAgentsDiscount", () => {
    expect(
      calculator.calculateAgentsDiscount(
        ["bonusProtection", "autoLiability"],
        ["agentsDiscount"]
      )
    ).toBe(26);
    expect(
      calculator.calculateAgentsDiscount(["autoLiability"], ["agentsDiscount"])
    ).toBe(0);
  });

  test("calculateVIPDiscount", () => {
    expect(calculator.calculateVIPDiscount(110, ["vipDiscount"])).toBe(6.5);
    expect(calculator.calculateVIPDiscount(110, [])).toBe(0);
  });

  test("calculateStrongCarSurcharge", () => {
    expect(
      calculator.calculateStrongCarSurcharge(110, ["strongCarSurcharge"])
    ).toBe(13);
    expect(
      calculator.calculateStrongCarSurcharge(80, ["strongCarSurcharge"])
    ).toBe(0);
    expect(calculator.calculateStrongCarSurcharge(80, [])).toBe(0);
  });

  test("calculateTotalPrice", () => {
    const totalPrice = calculator.calculateTotalPrice();
    expect(totalPrice.totalPrice).toBe(256.1);
  });

  test("calculate new BasePrice with priceMatch", () => {
    calculator.data.priceMatch = 200;
    const calculations = calculator.calculateTotalPrice();
    expect(calculations.basePrice).toBe(73.9);
    expect(calculations.totalPrice).toBe(200);
  });

  test("calculate new BasePrice and CommercialDiscount with priceMatch", () => {
    calculator.data.priceMatch = 100;
    const calculations = calculator.calculateTotalPrice();
    expect(calculations.basePrice).toBe(1);
    expect(calculations.commercialDiscount).toBe(38.1);
  });
});

import { InsuranceConfigData } from "../services/insurance-config.service.js";

export interface InsuranceData {
  basePrice: number;
  customerAge: number;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  activeDiscounts: string[];
  activeCoverages: string[];
  insuranceConfig: InsuranceConfigData;
}

interface NumberObject {
  [key: string]: number;
}

interface InsuranceCalculatorInterface {
  calculateTotalPrice(): NumberObject;
  calculateBonusProtection(activeCoverages: string[]): number;
  calculateAutoLiability(
    activeCoverages: string[],
    customerAge: number
  ): number;
  calculateGlassProtection(
    activeCoverages: string[],
    vehiclePower: number
  ): number;
  calculateCommercialDiscount(activeDiscounts: string[]): number;
  calculateAgentsDiscount(
    activeCoverages: string[],
    activeDiscounts: string[]
  ): number;
  calculateVIPDiscount(vehiclePower: number, activeDiscounts: string[]): number;
  calculateStrongCarSurcharge(
    vehiclePower: number,
    activeDiscounts: string[]
  ): number;
}

export class InsuranceCalculator implements InsuranceCalculatorInterface {
  data: InsuranceData;
  basePrice: number;
  totalPrice: number;
  insuranceConfig: InsuranceConfigData;

  constructor(data: InsuranceData) {
    this.data = data;
    this.totalPrice = 0;
    this.basePrice = this.data.basePrice;
    this.insuranceConfig = this.data.insuranceConfig;
  }

  calculateTotalPrice(): NumberObject {
    const {
      customerAge,
      vehiclePower,
      priceMatch,
      activeDiscounts,
      activeCoverages,
    } = this.data;

    let { voucher = 0 } = this.data;

    const bonusProtection = this.calculateBonusProtection(activeCoverages);
    const autoLiability = this.calculateAutoLiability(
      activeCoverages,
      customerAge
    );
    const glassProtection = this.calculateGlassProtection(
      activeCoverages,
      vehiclePower
    );

    let commercialDiscount = this.calculateCommercialDiscount(activeDiscounts);
    const agentsDiscount = this.calculateAgentsDiscount(
      activeCoverages,
      activeDiscounts
    );
    const vipDiscount = this.calculateVIPDiscount(
      vehiclePower,
      activeDiscounts
    );
    const strongCarSurcharge = this.calculateStrongCarSurcharge(
      vehiclePower,
      activeDiscounts
    );

    this.totalPrice =
      this.basePrice +
      bonusProtection +
      autoLiability +
      glassProtection -
      commercialDiscount -
      agentsDiscount -
      vipDiscount +
      strongCarSurcharge -
      voucher;

    if (priceMatch) {
      const differenceToCover = this.totalPrice - priceMatch;
      if (differenceToCover) {
        this.basePrice -= differenceToCover;

        if (commercialDiscount && this.basePrice < 0) {
          commercialDiscount -= this.basePrice + 1;
          this.basePrice = 1;
        }
        if (this.basePrice < 0) {
          voucher -= this.basePrice + 1;
          this.basePrice = 1;
        }
        this.totalPrice = priceMatch;
      }
    }

    const finalCalculations = this.fixNumbers({
      basePrice: this.basePrice,
      totalPrice: this.totalPrice,
      bonusProtection,
      autoLiability,
      glassProtection,
      commercialDiscount,
      agentsDiscount,
      vipDiscount,
      strongCarSurcharge,
      voucher,
    });

    return finalCalculations;
  }

  calculateBonusProtection(activeCoverages: string[]) {
    return activeCoverages.includes("bonusProtection")
      ? this.basePrice * this.insuranceConfig.bonusProtection
      : 0;
  }

  calculateAutoLiability(activeCoverages: string[], customerAge: number) {
    return activeCoverages.includes("autoLiability")
      ? customerAge < 30
        ? this.insuranceConfig.autoLiabilityUnder30
        : this.insuranceConfig.autoLiabilityOverAnd30
      : 0;
  }

  calculateGlassProtection(activeCoverages: string[], vehiclePower: number) {
    return activeCoverages.includes("glassProtection")
      ? vehiclePower * this.insuranceConfig.glassProtection
      : 0;
  }

  calculateCommercialDiscount(activeDiscounts: string[]) {
    return activeDiscounts.includes("commercialDiscount")
      ? this.basePrice * this.insuranceConfig.commercialDiscount
      : 0;
  }

  calculateAgentsDiscount(
    activeCoverages: string[],
    activeDiscounts: string[]
  ) {
    return activeDiscounts.includes("agentsDiscount") &&
      activeCoverages.length >=
        this.insuranceConfig.agentsDiscountCoveragesNeeded
      ? this.basePrice * this.insuranceConfig.agentsDiscount
      : 0;
  }

  calculateVIPDiscount(vehiclePower: number, activeDiscounts: string[]) {
    return vehiclePower > this.insuranceConfig.vipDiscountVehiclePower &&
      activeDiscounts.includes("vipDiscount")
      ? this.basePrice * this.insuranceConfig.vipDiscount
      : 0;
  }

  calculateStrongCarSurcharge(vehiclePower: number, activeDiscounts: string[]) {
    return vehiclePower > this.insuranceConfig.strongCarSurchargeVehiclePower &&
      activeDiscounts.includes("strongCarSurcharge")
      ? this.basePrice * this.insuranceConfig.strongCarSurcharge
      : 0;
  }

  fixNumbers(obj: NumberObject) {
    for (const prop in obj) {
      if (typeof obj[prop] === "number" && !undefined) {
        const fixedValue = obj[prop]?.toFixed(2);
        obj[prop] = parseFloat(fixedValue!);
      }
    }
    return obj;
  }
}

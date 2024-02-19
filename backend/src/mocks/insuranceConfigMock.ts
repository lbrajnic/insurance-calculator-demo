// --> used just as initial mock data that will populate "insuranceconfigs" collection on app start
const INSURANCE_CONFIG_DEFAULT_VALUES = {
  // Coverages
  bonusProtection: 0.12,
  autoLiabilityUnder30: 55, // AO+
  autoLiabilityOverAnd30: 105, // AO+
  glassProtection: 0.8,

  // Discounts/surcharges
  commercialDiscount: 0.1,
  agentsDiscount: 0.2,
  agentsDiscountCoveragesNeeded: 2,
  vipDiscount: 0.05,
  vipDiscountVehiclePower: 80,
  strongCarSurcharge: 0.1,
  strongCarSurchargeVehiclePower: 100,
};

export default INSURANCE_CONFIG_DEFAULT_VALUES;

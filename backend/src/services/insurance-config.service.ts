import InsuranceConfig from "../models/InsuranceConfig.js";

export interface InsuranceConfigData {
  // Coverages
  bonusProtection: number;
  autoLiabilityUnder30: number;
  autoLiabilityOverAnd30: number;
  glassProtection: number;

  // Discounts/surcharges
  commercialDiscount: number;
  agentsDiscount: number;
  agentsDiscountCoveragesNeeded: number;
  vipDiscount: number;
  vipDiscountVehiclePower: number;
  strongCarSurcharge: number;
  strongCarSurchargeVehiclePower: number;
}

async function getAll(): Promise<InsuranceConfigData[]> {
  return InsuranceConfig.find();
}

async function get(id: string) {
  return InsuranceConfig.findOne({ _id: id });
}

async function create(data: InsuranceConfigData) {
  return new InsuranceConfig(data).save();
}

async function update(id: string, data: InsuranceConfigData) {
  return InsuranceConfig.findOneAndUpdate({ _id: id }, data);
}

async function remove(id: string) {
  return InsuranceConfig.findByIdAndDelete(id);
}

export { getAll, get, create, update, remove };

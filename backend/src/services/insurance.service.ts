import Insurance from "../models/Insurance.js";
import createInsurance from "../utils/insuranceManager.js";
import { InsuranceManager } from "../utils/insuranceManager.js";
import { getAll as getInsuranceConfig } from "./insurance-config.service.js";

async function getAll() {
  return Insurance.find();
}

async function get(id: string) {
  return Insurance.findOne({ _id: id });
}

async function create(data: InsuranceManager) {
  const insuranceConfig = await getInsuranceConfig();
  if (insuranceConfig[0]) {
    data.insuranceConfig = insuranceConfig[0];
  }
  const insuranceData = createInsurance(data);
  return new Insurance(insuranceData).save();
}

async function update(id: string, data: InsuranceManager) {
  const insuranceConfig = await getInsuranceConfig();
  if (insuranceConfig[0]) {
    data.insuranceConfig = insuranceConfig[0];
  }
  const insuranceData = createInsurance(data);

  return Insurance.findOneAndUpdate({ _id: id }, insuranceData, {
    new: true,
  });
}

async function remove(id: string) {
  return Insurance.findByIdAndDelete(id);
}

export { getAll, get, create, update, remove };

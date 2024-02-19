import moment from "moment";
import licencePlatesData from "../mocks/licencePlatesCRO.js";
import basePricesMock from "../mocks/basePricesMock.js";
import { InsuranceCalculator } from "./insuranceCalculator.js";
import { InsuranceConfigData } from "../services/insurance-config.service.js";

export interface InsuranceManager {
  customerName: string;
  birthdate: string;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  activeDiscounts: string[];
  activeCoverages: string[];
  insuranceConfig: InsuranceConfigData;
  totalPrice: number;
}

function findCityId(cityName: string): string {
  for (const cityInfo of licencePlatesData) {
    if (cityInfo.cities.includes(cityName)) {
      return cityInfo.cityId;
    }
    if (cityInfo.municipalities.includes(cityName)) {
      return cityInfo.cityId;
    }
  }
  return "DEFAULT";
}

function calculateAge(birthday: string): number {
  const age = moment.duration(moment().diff(moment(birthday)));
  const ageInYears = Math.floor(age.asYears());

  return ageInYears;
}

function getBasePriceMock(cityId: string, customerAge: number) {
  const prices = basePricesMock.find(function (item) {
    return item.cityId.toLowerCase() === cityId.toLowerCase();
  });

  if (!prices) return 200;
  return customerAge <= 35 ? prices.price.underOr35 : prices.price.over35;
}

const createInsurance = function (data: InsuranceManager) {
  const {
    birthdate,
    city,
    vehiclePower,
    voucher = 0,
    priceMatch,
    activeDiscounts,
    activeCoverages,
    insuranceConfig,
  } = data;

  const cityId = findCityId(city);
  const customerAge = calculateAge(birthdate);
  const basePrice = getBasePriceMock(cityId, customerAge);

  const calculator = new InsuranceCalculator({
    basePrice,
    customerAge,
    vehiclePower,
    voucher,
    priceMatch,
    activeCoverages,
    activeDiscounts,
    insuranceConfig,
  });
  const insuranceCalculations = calculator.calculateTotalPrice();
  return {
    ...data,
    insuranceCalculations,
    totalPrice: insuranceCalculations.totalPrice,
  };
};

export default createInsurance;

export const INSURANCES_API_ENDPOINT: string = "http://localhost:3001/insurances";

export const CURRENCY: string = "EUR";
export const CURRENCY_SYMBOL: string = "€";
export const MIN_VEHICLE_POWER: number = 1;
export const MIN_VOUCHER: number = 0;

interface List {
  id: string;
  label: string;
  sign: string;
}

export const DISCOUNTS_LIST: List[] = [
  { id: "commercialDiscount", label: "Commercial discount", sign: "-" },
  { id: "agentsDiscount", label: "Agents discount", sign: "-" },
  { id: "vipDiscount", label: "VIP discount", sign: "-" },
  { id: "strongCarSurcharge", label: "Strong car surcharge", sign: "+" },
];

export const COVERAGES_LIST: List[] = [
  { id: "bonusProtection", label: "Bonus protection", sign: "+" },
  { id: "autoLiability", label: "AO+", sign: "+" },
  { id: "glassProtection", label: "Glass protection", sign: "+" },
];

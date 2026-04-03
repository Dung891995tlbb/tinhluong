import { CalculationParams } from "../types";

export const DEFAULT_PARAMS: CalculationParams = {
  nonTaxableAllowance: 8000000,
  companyPaidRent: 15000000,
  fixedInsurance: 950000,
  personalDeduction: 15500000,
};

export const PIT_BRACKETS = [
  { limit: 5000000, rate: 0.05 },
  { limit: 10000000, rate: 0.10 },
  { limit: 18000000, rate: 0.15 },
  { limit: 32000000, rate: 0.20 },
  { limit: 52000000, rate: 0.25 },
  { limit: 80000000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 },
];

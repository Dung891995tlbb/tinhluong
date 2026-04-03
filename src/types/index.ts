export interface CalculationParams {
  nonTaxableAllowance: number;
  companyPaidRent: number;
  fixedInsurance: number;
  personalDeduction: number;
}

export interface CalculationResult {
  gross: number;
  net: number;
  insurance: number;
  allowance: number;
  taxableHousing: number;
  personalDeduction: number;
  taxableIncome: number;
  pit: number;
  rent: number;
}

export type CalculationMode = 'gross-to-net' | 'net-to-gross';

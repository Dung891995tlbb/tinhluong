import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN").format(amount);
};

export const parseCurrency = (value: string) => {
  return parseInt(value.replace(/\D/g, "")) || 0;
};

// Constants based on the prompt
const NON_TAXABLE_ALLOWANCE = 8000000; // Phụ cấp không chịu thuế (Ăn ca + Điện thoại)
const COMPANY_PAID_RENT = 15000000; // Tiền thuê nhà công ty trả
const FIXED_INSURANCE = 950000; // Khấu trừ Bảo hiểm cố định
const PERSONAL_DEDUCTION = 15500000; // Giảm trừ bản thân cố định

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

/**
 * Calculate PIT based on Taxable Income (TNTT)
 * Brackets: 5%, 10%, 20%, 30%, 35% as requested
 */
function calculatePIT(tntt: number): number {
  if (tntt <= 0) return 0;

  let pit = 0;
  const brackets = [
    { limit: 5000000, rate: 0.05 },
    { limit: 10000000, rate: 0.10 },
    { limit: 18000000, rate: 0.20 },
    { limit: 32000000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 },
  ];

  let remaining = tntt;
  let previousLimit = 0;

  for (const bracket of brackets) {
    const range = bracket.limit - previousLimit;
    const taxableInRange = Math.min(remaining, range);
    pit += taxableInRange * bracket.rate;
    remaining -= taxableInRange;
    if (remaining <= 0) break;
    previousLimit = bracket.limit;
  }

  return Math.round(pit);
}

export function calculateNetFromGross(gross: number, params: CalculationParams): CalculationResult {
  const { nonTaxableAllowance, companyPaidRent, fixedInsurance, personalDeduction } = params;

  // 1. Phần thu nhập chịu thuế chưa tính thuê nhà = Gross - Phụ cấp - Tiền thuê nhà
  const taxableIncomeBeforeHousing = Math.max(0, gross - nonTaxableAllowance - companyPaidRent);

  // 2. Tiền thuê nhà tính vào TNCT = 0.15 * Phần thu nhập chịu thuế trên (tối đa bằng Tiền thuê nhà công ty trả)
  const taxableHousing = Math.min(companyPaidRent, taxableIncomeBeforeHousing * 0.15);

  // 3. Thu nhập tính thuế (TNTT) = Phần thu nhập chịu thuế + Tiền thuê nhà tính vào TNCT - Giảm trừ gia cảnh - Bảo hiểm
  const tntt = Math.max(0, taxableIncomeBeforeHousing + taxableHousing - personalDeduction - fixedInsurance);

  // 4. Áp dụng bảng thuế suất lũy tiến
  const pit = calculatePIT(tntt);

  // 5. Lương Net = Gross - Bảo hiểm - Thuế TNCN
  const net = gross - fixedInsurance - pit;

  return {
    gross,
    net,
    insurance: fixedInsurance,
    allowance: nonTaxableAllowance,
    taxableHousing,
    personalDeduction: personalDeduction,
    taxableIncome: tntt,
    pit,
    rent: companyPaidRent
  };
}

export function calculateGrossFromNet(netSalary: number, params: CalculationParams): CalculationResult | null {
  if (netSalary <= 0) return null;

  // Since the relationship between Gross and Net is monotonic, 
  // we can use binary search to find the Gross salary accurately 
  // for any set of parameters (Rent, Allowance, etc.)
  
  let low = netSalary;
  let high = netSalary * 2 + 50000000; // A safe upper bound
  let result: CalculationResult | null = null;
  
  // Binary search for the Gross value
  for (let i = 0; i < 100; i++) { // 100 iterations for high precision
    const mid = (low + high) / 2;
    const currentResult = calculateNetFromGross(mid, params);
    
    if (Math.abs(currentResult.net - netSalary) < 1) {
      result = currentResult;
      break;
    }
    
    if (currentResult.net < netSalary) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return result;
}



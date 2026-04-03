import { CalculationParams, CalculationResult } from "../types";
import { PIT_BRACKETS } from "../constants";

/**
 * Calculate Personal Income Tax (PIT) based on Taxable Income (TNTT)
 */
export function calculatePIT(tntt: number): number {
  if (tntt <= 0) return 0;

  let pit = 0;
  let remaining = tntt;
  let previousLimit = 0;

  for (const bracket of PIT_BRACKETS) {
    const range = bracket.limit - previousLimit;
    const taxableInRange = Math.min(remaining, range);
    pit += taxableInRange * bracket.rate;
    remaining -= taxableInRange;
    if (remaining <= 0) break;
    previousLimit = bracket.limit;
  }

  return Math.round(pit);
}

/**
 * Calculate Net Salary from Gross Salary
 */
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

/**
 * Calculate Gross Salary from Net Salary using Binary Search
 */
export function calculateGrossFromNet(netSalary: number, params: CalculationParams): CalculationResult | null {
  if (netSalary <= 0) return null;

  let low = netSalary;
  let high = netSalary * 2 + 50000000; 
  let result: CalculationResult | null = null;
  
  for (let i = 0; i < 100; i++) {
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

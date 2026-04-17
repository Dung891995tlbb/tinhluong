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
  const { luongBH, anCa, xangXe, dienThoai, thueNha, chuyenCan, giamTruGiaCanh, tyLeBH, tyLeThueNha } = params;
  
  const hoanThanhCV = gross - (luongBH + anCa + xangXe + dienThoai + thueNha + chuyenCan);
  
  const nonTaxable = xangXe + dienThoai;
  const tnctChuaThueNha = gross - nonTaxable - thueNha;
  
  const taxableRent = Math.min(thueNha, tnctChuaThueNha * (tyLeThueNha / 100));
  const totalTaxableIncome = tnctChuaThueNha + taxableRent;
  
  const insurance = luongBH * (tyLeBH / 100);
  
  const incomeSubjectToTax = Math.max(0, totalTaxableIncome - insurance - giamTruGiaCanh);
  
  const pit = calculatePIT(incomeSubjectToTax);
  
  const net = gross - insurance - pit;

  return {
    gross,
    net,
    luongBH,
    anCa,
    xangXe,
    dienThoai,
    thueNha,
    chuyenCan,
    hoanThanhCV,
    nonTaxable,
    taxableRent,
    totalTaxableIncome,
    insurance,
    familyDeduction: giamTruGiaCanh,
    incomeSubjectToTax,
    pit
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

export interface CalculationParams {
  luongBH: number;
  anCa: number;
  xangXe: number;
  dienThoai: number;
  thueNha: number;
  chuyenCan: number;
  giamTruGiaCanh: number;
  tyLeBH: number;
  hoanThanhCV: number;
  tyLeThueNha: number;
}

export interface CalculationResult {
  gross: number;
  net: number;
  luongBH: number;
  anCa: number;
  xangXe: number;
  dienThoai: number;
  thueNha: number;
  chuyenCan: number;
  hoanThanhCV: number;
  
  nonTaxable: number;
  taxableRent: number;
  totalTaxableIncome: number;
  insurance: number;
  familyDeduction: number;
  incomeSubjectToTax: number;
  pit: number;
}

export type CalculationMode = 'gross-to-net' | 'net-to-gross' | 'build-gross';

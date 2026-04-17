import { CalculationParams } from "../types";

export const DEFAULT_PARAMS: CalculationParams = {
  luongBH: 10000000,
  anCa: 5000000,
  xangXe: 5000000,
  dienThoai: 3000000,
  thueNha: 15000000,
  chuyenCan: 3000000,
  giamTruGiaCanh: 15500000,
  tyLeBH: 9.5,
  hoanThanhCV: 11158192,
  tyLeThueNha: 15,
};

export const PIT_BRACKETS = [
  { limit: 10000000, rate: 0.05 },
  { limit: 30000000, rate: 0.10 },
  { limit: 60000000, rate: 0.20 },
  { limit: 100000000, rate: 0.30 },
  { limit: Infinity, rate: 0.35 },
];

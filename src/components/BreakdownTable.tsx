import { Info } from "lucide-react";
import { CalculationResult } from "../types";
import { formatCurrency, cn } from "../lib/utils";

interface BreakdownTableProps {
  result: CalculationResult;
  mode: 'gross-to-net' | 'net-to-gross';
}

export default function BreakdownTable({ result, mode }: BreakdownTableProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold text-slate-800">Chi tiết tính toán</h3>
      </div>
      <div className="space-y-3">
        <BreakdownItem label="Lương Gross" value={result.gross} />
        <BreakdownItem label="Phụ cấp (Ăn ca + Điện thoại)" value={result.allowance} isInfo />
        <BreakdownItem label="Tiền thuê nhà công ty trả" value={result.rent} isInfo />
        <div className="h-px bg-slate-100 my-2" />
        <BreakdownItem label="Bảo hiểm cố định" value={result.insurance} isNegative />
        <BreakdownItem label="Giảm trừ gia cảnh" value={result.personalDeduction} isNegative />
        <BreakdownItem label="Tiền thuê nhà tính vào TNCT" value={result.taxableHousing} isHighlight />
        <BreakdownItem label="Thu nhập tính thuế (TNTT)" value={result.taxableIncome} isHighlight />
        <BreakdownItem label="Thuế TNCN" value={result.pit} isNegative />
        <div className="h-px bg-slate-100 my-2" />
        <BreakdownItem 
          label="Lương Net thực nhận" 
          value={result.net} 
          className="text-blue-700 font-black text-lg"
        />
      </div>
    </div>
  );
}

function BreakdownItem({ 
  label, 
  value, 
  isNegative = false, 
  isHighlight = false,
  isInfo = false,
  className 
}: { 
  label: string; 
  value: number; 
  isNegative?: boolean; 
  isHighlight?: boolean;
  isInfo?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-between items-center py-1", className)}>
      <span className={cn(
        "text-sm", 
        isHighlight ? "font-bold text-slate-700" : isInfo ? "text-slate-400 italic" : "text-slate-500"
      )}>
        {label}
      </span>
      <span className={cn(
        "font-mono font-semibold",
        isNegative ? "text-red-500" : isHighlight ? "text-slate-900" : isInfo ? "text-slate-400" : "text-slate-700"
      )}>
        {isNegative ? '-' : ''}{formatCurrency(value)}
      </span>
    </div>
  );
}

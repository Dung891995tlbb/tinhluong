import { ArrowRightLeft } from "lucide-react";
import { CalculationMode } from "../types";
import { cn } from "../lib/utils";

interface ModeSelectorProps {
  mode: CalculationMode;
  setMode: (mode: CalculationMode) => void;
}

export default function ModeSelector({ mode, setMode }: ModeSelectorProps) {
  return (
    <div className="flex p-2 bg-slate-50 border-b border-slate-100">
      <button
        onClick={() => setMode('gross-to-net')}
        className={cn(
          "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
          mode === 'gross-to-net' 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" 
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
        )}
      >
        <ArrowRightLeft className={cn("w-4 h-4", mode === 'gross-to-net' ? "rotate-0" : "rotate-180")} />
        Gross sang Net
      </button>
      <button
        onClick={() => setMode('net-to-gross')}
        className={cn(
          "flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
          mode === 'net-to-gross' 
            ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200" 
            : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
        )}
      >
        <ArrowRightLeft className={cn("w-4 h-4", mode === 'net-to-gross' ? "rotate-0" : "rotate-180")} />
        Net sang Gross
      </button>
    </div>
  );
}

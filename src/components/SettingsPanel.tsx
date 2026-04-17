import { useState, useEffect } from "react";
import { Settings2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CalculationParams } from "../types";
import { formatCurrency } from "../lib/utils";

interface SettingsPanelProps {
  show: boolean;
  setShow: (show: boolean) => void;
  params: CalculationParams;
  onParamChange: (key: keyof CalculationParams, value: string) => void;
}

export default function SettingsPanel({ show, setShow, params, onParamChange }: SettingsPanelProps) {
  return (
    <div className="mb-8">
      <button 
        onClick={() => setShow(!show)}
        className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Settings2 className="w-4 h-4" />
        Tùy chỉnh thông số tính toán
        {show ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <SettingInput 
                label="Lương đóng BH" 
                value={params.luongBH} 
                onChange={(val) => onParamChange('luongBH', val)} 
              />
              <SettingInput 
                label="Tỷ lệ trích BH (%)" 
                value={params.tyLeBH} 
                onChange={(val) => onParamChange('tyLeBH', val)} 
                unit="%"
              />
              <SettingInput 
                label="Ăn ca (Chịu thuế)" 
                value={params.anCa} 
                onChange={(val) => onParamChange('anCa', val)} 
              />
              <SettingInput 
                label="Chuyên cần (Chịu thuế)" 
                value={params.chuyenCan} 
                onChange={(val) => onParamChange('chuyenCan', val)} 
              />
              <SettingInput 
                label="Xăng xe (Không chịu thuế)" 
                value={params.xangXe} 
                onChange={(val) => onParamChange('xangXe', val)} 
              />
              <SettingInput 
                label="Điện thoại (Không chịu thuế)" 
                value={params.dienThoai} 
                onChange={(val) => onParamChange('dienThoai', val)} 
              />
              <SettingInput 
                label="Tiền thuê nhà" 
                value={params.thueNha} 
                onChange={(val) => onParamChange('thueNha', val)} 
              />
              <SettingInput 
                label="Giới hạn thuê nhà chịu thuế (%)" 
                value={params.tyLeThueNha} 
                onChange={(val) => onParamChange('tyLeThueNha', val)} 
                unit="%"
              />
              <SettingInput 
                label="Giảm trừ gia cảnh" 
                value={params.giamTruGiaCanh} 
                onChange={(val) => onParamChange('giamTruGiaCanh', val)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingInput({ label, value, onChange, unit = "VNĐ" }: { label: string; value: number; onChange: (val: string) => void; unit?: string }) {
  const [localValue, setLocalValue] = useState(unit === "%" ? value.toString() : formatCurrency(value));
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (isFocused) return; // Don't override while user is typing
    
    if (unit === "%") {
      setLocalValue(value.toString());
    } else {
      setLocalValue(value === 0 ? "0" : formatCurrency(value));
    }
  }, [value, unit, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    if (unit === "%") {
      // Allow empty string, single dot, or numbers with decimals
      if (val === "" || val === ".") {
        setLocalValue(val);
        onChange("0");
        return;
      }
      // Prevent multiple dots
      if ((val.match(/\./g) || []).length > 1) return;
      // Prevent non-numeric characters except dot
      if (/[^0-9.]/.test(val)) return;
      
      setLocalValue(val);
      onChange(val);
    } else {
      // For currency, while typing, just keep the raw numbers
      const numericString = val.replace(/\D/g, "");
      setLocalValue(numericString);
      onChange(numericString === "" ? "0" : numericString);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (unit !== "%" && value !== 0) {
      // Strip formatting when focused for easy editing
      setLocalValue(value.toString());
    } else if (unit !== "%" && value === 0) {
      setLocalValue("");
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (unit !== "%") {
      setLocalValue(value === 0 ? "0" : formatCurrency(value));
    } else {
      onChange(value.toString());
      setLocalValue(value.toString());
    }
  };

  return (
    <div>
      <label className="block text-[10px] items-center gap-1 font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">{unit}</span>
      </div>
    </div>
  );
}


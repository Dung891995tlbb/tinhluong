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
                label="Phụ cấp không chịu thuế" 
                value={params.nonTaxableAllowance} 
                onChange={(val) => onParamChange('nonTaxableAllowance', val)} 
              />
              <SettingInput 
                label="Tiền thuê nhà công ty trả" 
                value={params.companyPaidRent} 
                onChange={(val) => onParamChange('companyPaidRent', val)} 
              />
              <SettingInput 
                label="Bảo hiểm cố định" 
                value={params.fixedInsurance} 
                onChange={(val) => onParamChange('fixedInsurance', val)} 
              />
              <SettingInput 
                label="Giảm trừ gia cảnh" 
                value={params.personalDeduction} 
                onChange={(val) => onParamChange('personalDeduction', val)} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingInput({ label, value, onChange }: { label: string; value: number; onChange: (val: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={formatCurrency(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">VNĐ</span>
      </div>
    </div>
  );
}

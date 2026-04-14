import React from 'react';
import { CalculationMode } from "../types";

interface SalaryInputProps {
  mode: CalculationMode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SalaryInput({ mode, value, onChange }: SalaryInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
        Lương {mode === 'gross-to-net' ? 'Gross' : 'Net'} hàng tháng
      </label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-5 px-6 text-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition-all pr-20"
          placeholder="0"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
          VNĐ
        </div>
      </div>
    </div>
  );
}

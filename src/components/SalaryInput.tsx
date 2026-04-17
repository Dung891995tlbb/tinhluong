import React, { useState, useEffect } from 'react';
import { CalculationMode } from "../types";
import { formatCurrency, parseCurrency } from "../lib/utils";

interface SalaryInputProps {
  mode: CalculationMode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SalaryInput({ mode, value, onChange }: SalaryInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalValue(value);
    }
  }, [value, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setLocalValue(val);
    
    // Simulate an event for the parent app
    const event = {
      target: {
        value: val
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleFocus = () => {
    setIsFocused(true);
    const numeric = parseCurrency(value);
    setLocalValue(numeric === 0 ? "" : numeric.toString());
  };

  const handleBlur = () => {
    setIsFocused(false);
    const numeric = parseFloat(localValue) || 0;
    setLocalValue(numeric === 0 ? "" : formatCurrency(numeric));
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
        Lương {mode === 'gross-to-net' ? 'Gross' : 'Net'} hàng tháng
      </label>
      <div className="relative group">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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

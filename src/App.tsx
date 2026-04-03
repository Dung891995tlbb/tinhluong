import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types & Constants
import { CalculationMode, CalculationParams, CalculationResult } from './types';
import { DEFAULT_PARAMS } from './constants';

// Services & Utils
import { calculateNetFromGross, calculateGrossFromNet } from './services/salaryCalculator';
import { formatCurrency, parseCurrency } from './lib/utils';

// Components
import Header from './components/Header';
import ModeSelector from './components/ModeSelector';
import SalaryInput from './components/SalaryInput';
import SettingsPanel from './components/SettingsPanel';
import BreakdownTable from './components/BreakdownTable';
import ExplanationPanel from './components/ExplanationPanel';

export default function App() {
  const [mode, setMode] = useState<CalculationMode>('gross-to-net');
  const [inputValue, setInputValue] = useState<string>('30,000,000');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Settings state
  const [params, setParams] = useState<CalculationParams>(DEFAULT_PARAMS);

  useEffect(() => {
    handleCalculate();
  }, [mode, inputValue, params]);

  const handleCalculate = () => {
    const amount = parseCurrency(inputValue);
    if (amount <= 0) {
      setResult(null);
      setError(null);
      return;
    }

    if (mode === 'gross-to-net') {
      const res = calculateNetFromGross(amount, params);
      setResult(res);
      setError(null);
    } else {
      const res = calculateGrossFromNet(amount, params);
      if (res) {
        setResult(res);
        setError(null);
      } else {
        setResult(null);
        setError('Mức lương quá cao vượt trần tính toán thuê nhà.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const numeric = parseCurrency(val);
    setInputValue(formatCurrency(numeric));
  };

  const handleParamChange = (key: keyof CalculationParams, value: string) => {
    const numeric = parseCurrency(value);
    setParams(prev => ({ ...prev, [key]: numeric }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans p-4 md:p-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl"
      >
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Calculator Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-6">
              <ModeSelector mode={mode} setMode={setMode} />

              <div className="p-6 md:p-8">
                <SalaryInput mode={mode} value={inputValue} onChange={handleInputChange} />

                <SettingsPanel 
                  show={showSettings} 
                  setShow={setShowSettings} 
                  params={params} 
                  onParamChange={handleParamChange} 
                />

                {/* Result Section */}
                <AnimatePresence mode="wait">
                  {result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-8"
                    >
                      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-center">
                        <span className="text-sm font-bold text-blue-600 uppercase tracking-widest block mb-2">
                          Lương {mode === 'gross-to-net' ? 'Net' : 'Gross'} nhận được
                        </span>
                        <div className="text-4xl md:text-5xl font-black text-blue-700">
                          {formatCurrency(mode === 'gross-to-net' ? result.net : result.gross)} <span className="text-xl font-bold">VNĐ</span>
                        </div>
                      </div>

                      <BreakdownTable result={result} mode={mode} />
                    </motion.div>
                  ) : error ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-center gap-4 text-red-700"
                    >
                      <AlertCircle className="w-8 h-8 flex-shrink-0" />
                      <p className="font-medium">{error}</p>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>Nhập mức lương để xem kết quả chi tiết</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Explanation Column */}
          <div className="lg:col-span-5">
            <ExplanationPanel />
          </div>
        </div>
      </motion.div>
    </div>
  );
}



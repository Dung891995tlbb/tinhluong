import { Calculator } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4">
        <Calculator className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
        Công Cụ Tính Lương Cho Vợ
      </h1>
      <p className="text-slate-500 max-w-md mx-auto">
        Chuyển đổi lương Gross sang Net và ngược lại với các tùy chỉnh linh hoạt.
      </p>
    </div>
  );
}

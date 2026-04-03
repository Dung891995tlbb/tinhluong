import { BookOpen, CheckCircle2, Calculator, ArrowRight } from "lucide-react";

export default function ExplanationPanel() {
  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-8 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Cơ sở tính toán</h2>
      </div>

      <div className="space-y-6 text-sm text-slate-600">
        <section>
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Quy tắc Thuế TNCN (7 bậc)
          </h3>
          <p className="mb-2">Áp dụng bảng thuế suất lũy tiến từng phần theo quy định hiện hành của pháp luật Việt Nam:</p>
          <ul className="space-y-1.5 list-none">
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Đến 5 triệu VNĐ</span> <strong className="text-slate-800">5%</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Trên 5 - 10 triệu VNĐ</span> <strong className="text-slate-800">10%</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Trên 10 - 18 triệu VNĐ</span> <strong className="text-slate-800">15%</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Trên 18 - 32 triệu VNĐ</span> <strong className="text-slate-800">20%</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Trên 32 - 52 triệu VNĐ</span> <strong className="text-slate-800">25%</strong></li>
            <li className="flex justify-between border-b border-slate-50 pb-1"><span>Trên 52 - 80 triệu VNĐ</span> <strong className="text-slate-800">30%</strong></li>
            <li className="flex justify-between"><span>Trên 80 triệu VNĐ</span> <strong className="text-slate-800">35%</strong></li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Quy tắc Tiền thuê nhà
          </h3>
          <p className="leading-relaxed">
            Tiền thuê nhà do công ty trả thay được tính vào thu nhập chịu thuế, nhưng <strong>không vượt quá 15%</strong> tổng thu nhập chịu thuế (chưa bao gồm tiền thuê nhà).
          </p>
        </section>

        <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-500" />
            Công thức Gross sang Net
          </h3>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-700">TNCT</strong> = Gross - Phụ cấp không chịu thuế - Tiền thuê nhà</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-700">Thuê nhà chịu thuế</strong> = Min(Tiền thuê nhà, 15% * TNCT)</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-700">TNTT</strong> = TNCT + Thuê nhà chịu thuế - Bảo hiểm - Giảm trừ gia cảnh</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-700">Thuế TNCN</strong> = Tính theo bậc thang trên TNTT</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-700">Net</strong> = Gross - Bảo hiểm - Thuế TNCN</span>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Công thức Net sang Gross
          </h3>
          <p className="leading-relaxed">
            Sử dụng thuật toán <strong>Tìm kiếm nhị phân (Binary Search)</strong> để dò ngược từ Net ra Gross. Đảm bảo độ chính xác tuyệt đối với mọi biến số tùy chỉnh (phụ cấp, thuê nhà, bảo hiểm, v.v.) mà không bị phụ thuộc vào các công thức rút gọn cố định.
          </p>
        </section>
      </div>
    </div>
  );
}

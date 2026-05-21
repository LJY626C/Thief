import { useNavigate } from "react-router-dom";
import { PlusSquare, Copy } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Thief
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-12">
          快速克隆和创建您的网站
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          {/* 创建新网站按钮 */}
          <button
            onClick={() => navigate("/create")}
            className="group relative w-full md:w-64 h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <PlusSquare className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
            创建新网站
          </button>

          {/* 克隆现有网站按钮 */}
          <button
            onClick={() => navigate("/clone")}
            className="group relative w-full md:w-64 h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Copy className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
            克隆现有网站
          </button>
        </div>
      </div>
    </div>
  );
}
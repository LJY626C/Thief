import { useNavigate } from "react-router-dom";
import { PlusSquare, Copy, Layers } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function Home() {
  const navigate = useNavigate();
  const { templates } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center py-16 px-6">
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Thief
        </h1>
        <p className="text-xl md:text-2xl text-slate-600">
          快速克隆和创建您的网站
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
        {/* 创建新网站按钮 */}
        <button
          onClick={() => navigate("/create")}
          className="btn-float group relative w-full md:w-64 h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
        >
          <PlusSquare className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
          创建新网站
        </button>

        {/* 克隆现有网站按钮 */}
        <button
          onClick={() => navigate("/clone")}
          className="btn-float group relative w-full md:w-64 h-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
        >
          <Copy className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
          克隆现有网站
        </button>
      </div>

      {/* 模板库展示 */}
      {templates.length > 0 && (
        <div className="w-full max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-6 h-6 text-slate-600" />
            <h2 className="text-2xl font-bold text-slate-800">我的模板库</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="card-float bg-white rounded-xl border border-slate-200 p-6 cursor-pointer"
                onClick={() => navigate("/preview")}
              >
                <div className="w-full h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {template.preview ? (
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Layers className="w-12 h-12 text-slate-400" />
                  )}
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{template.name}</h3>
                <p className="text-sm text-slate-500">
                  {new Date(template.createdAt).toLocaleDateString("zh-CN")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Replace, Package } from "lucide-react";

export default function Preview() {
  const navigate = useNavigate();

  const handleExport = () => {
    // 模拟导出功能
    alert("网站已成功导出为 ZIP 文件！");
  };

  const handleReplace = () => {
    alert("信息替换功能即将上线！");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* 顶部固定操作栏 */}
      <div className="sticky top-0 bg-white shadow-lg z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              返回
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              网站预览
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleReplace}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors"
            >
              <Replace className="w-5 h-5" />
              一键替换信息
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all"
            >
              <Package className="w-5 h-5" />
              导出网站
            </button>
          </div>
        </div>
      </div>

      {/* 预览内容区域 */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
            <div className="p-12 text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  网站克隆成功！
                </h2>
                <p className="text-slate-600">
                  这是您克隆的网站预览。您可以在此进行编辑或直接导出。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Loader2 } from "lucide-react";

export default function Clone() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClone = () => {
    if (!url.trim()) return;
    setIsLoading(true);
    // 模拟下载过程
    setTimeout(() => {
      setIsLoading(false);
      navigate("/preview");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            克隆现有网站
          </h2>
          <p className="text-slate-500 mb-8">
            输入要克隆的网站地址
          </p>

          <div className="space-y-6">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="请输入要克隆的网站地址（例如：https://www.example.com）"
              className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              disabled={isLoading}
            />

            <button
              onClick={handleClone}
              disabled={!url.trim() || isLoading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  正在下载网站...
                </>
              ) : (
                <>
                  <Download className="w-6 h-6" />
                  一键克隆
                </>
              )}
            </button>

            <p className="text-center text-slate-500 text-sm">
              支持克隆企业官网、产品展示站、个人博客
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

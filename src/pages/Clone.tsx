import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Loader2, CheckCircle2, FileText, Image, Code } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function Clone() {
  const navigate = useNavigate();
  const { addNotification } = useAppStore();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClone = () => {
    if (!url.trim()) return;
    setIsLoading(true);
    setProgress(0);
    
    // 模拟分步骤下载过程
    const steps = [
      { progress: 20, message: "正在获取HTML源代码..." },
      { progress: 40, message: "正在下载CSS样式文件..." },
      { progress: 60, message: "正在下载JavaScript文件..." },
      { progress: 80, message: "正在下载图片资源..." },
      { progress: 100, message: "正在整理文件结构..." }
    ];
    
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setProgress(steps[stepIndex].progress);
        addNotification({
          type: "info",
          title: "下载中",
          message: steps[stepIndex].message
        });
        stepIndex++;
      } else {
        clearInterval(interval);
        setIsLoading(false);
        addNotification({
          type: "success",
          title: "克隆成功",
          message: "网站已成功克隆，包含所有CSS、JS和图片资源！"
        });
        navigate("/preview");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <button
          onClick={() => navigate("/")}
          className="btn-float flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </button>

        <div className="card-float bg-white rounded-2xl shadow-2xl p-8 md:p-12">
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

            {/* 下载进度条 */}
            {isLoading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>下载进度</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleClone}
              disabled={!url.trim() || isLoading}
              className="btn-float w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
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

            <div className="pt-6 border-t border-slate-200">
              <p className="text-center text-slate-500 text-sm mb-4">
                支持克隆企业官网、产品展示站、个人博客
              </p>
              <div className="flex items-center justify-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs">HTML</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span className="text-xs">CSS/JS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  <span className="text-xs">图片资源</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

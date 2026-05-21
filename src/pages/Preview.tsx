import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Replace, Package, Upload, X, Check } from "lucide-react";
import { processClonedWebsite } from "../utils/replaceUtils";

interface ReplaceInfo {
  originalCompanyName: string;
  newCompanyName: string;
  originalPhone: string;
  newPhone: string;
  originalEmail: string;
  newEmail: string;
  originalAddress: string;
  newAddress: string;
  logo: File | null;
  logoPreview: string | null;
}

export default function Preview() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [replaceInfo, setReplaceInfo] = useState<ReplaceInfo>({
    originalCompanyName: "",
    newCompanyName: "",
    originalPhone: "",
    newPhone: "",
    originalEmail: "",
    newEmail: "",
    originalAddress: "",
    newAddress: "",
    logo: null,
    logoPreview: null,
  });
  const [isReplaced, setIsReplaced] = useState(false);
  const [displayInfo, setDisplayInfo] = useState<{
    companyName: string;
    phone: string;
    email: string;
    address: string;
    logoPreview: string | null;
  } | null>(null);

  const handleExport = () => {
    alert("网站已成功导出为 ZIP 文件！");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFile(e.target.files[0]);
    }
  };

  const handleLogoFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReplaceInfo(prev => ({
          ...prev,
          logo: file,
          logoPreview: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmReplace = () => {
    // 模拟调用处理函数
    const mockHtml = "<div>示例HTML内容</div>";
    processClonedWebsite(mockHtml, {
      companyName: { originalText: replaceInfo.originalCompanyName, newText: replaceInfo.newCompanyName },
      phone: { originalText: replaceInfo.originalPhone, newText: replaceInfo.newPhone },
      email: { originalText: replaceInfo.originalEmail, newText: replaceInfo.newEmail },
      address: { originalText: replaceInfo.originalAddress, newText: replaceInfo.newAddress },
      logoPatterns: ["logo", "Logo", "LOGO"],
      newLogoSrc: replaceInfo.logoPreview,
    });

    setDisplayInfo({
      companyName: replaceInfo.newCompanyName,
      phone: replaceInfo.newPhone,
      email: replaceInfo.newEmail,
      address: replaceInfo.newAddress,
      logoPreview: replaceInfo.logoPreview,
    });
    setIsReplaced(true);
    setShowModal(false);
    alert("信息替换成功！预览已更新");
  };

  const removeLogo = () => {
    setReplaceInfo(prev => ({
      ...prev,
      logo: null,
      logoPreview: null,
    }));
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
              onClick={() => setShowModal(true)}
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
                {displayInfo?.logoPreview ? (
                  <img
                    src={displayInfo.logoPreview}
                    alt="公司LOGO"
                    className="w-24 h-24 object-contain rounded-full mx-auto mb-4"
                  />
                ) : (
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-12 h-12 text-blue-600" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {displayInfo?.companyName || "您的公司名称"}
                </h2>
                <p className="text-slate-600 mb-2">
                  {displayInfo?.address || "公司地址"}
                </p>
                <p className="text-slate-500 text-sm mb-1">
                  {displayInfo?.phone || "联系电话"}
                </p>
                <p className="text-slate-500 text-sm">
                  {displayInfo?.email || "邮箱地址"}
                </p>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-slate-400 text-sm mb-4">
                  所有外部链接已自动禁用
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    关于我们
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    产品展示
                  </a>
                  <a href="#" className="text-blue-600 hover:text-blue-700">
                    联系我们
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 替换信息弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-800">
                一键替换信息
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* 公司名称 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  公司名称
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={replaceInfo.originalCompanyName}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, originalCompanyName: e.target.value }))}
                    placeholder="原始公司名称"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={replaceInfo.newCompanyName}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, newCompanyName: e.target.value }))}
                    placeholder="新公司名称"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 联系电话 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  联系电话
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={replaceInfo.originalPhone}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, originalPhone: e.target.value }))}
                    placeholder="原始联系电话"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={replaceInfo.newPhone}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, newPhone: e.target.value }))}
                    placeholder="新联系电话"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 邮箱地址 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  邮箱地址
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    value={replaceInfo.originalEmail}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, originalEmail: e.target.value }))}
                    placeholder="原始邮箱地址"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="email"
                    value={replaceInfo.newEmail}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, newEmail: e.target.value }))}
                    placeholder="新邮箱地址"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 公司地址 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  公司地址
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={replaceInfo.originalAddress}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, originalAddress: e.target.value }))}
                    placeholder="原始公司地址"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={replaceInfo.newAddress}
                    onChange={(e) => setReplaceInfo(prev => ({ ...prev, newAddress: e.target.value }))}
                    placeholder="新公司地址"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* 上传LOGO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  上传新LOGO
                </label>
                {replaceInfo.logoPreview ? (
                  <div className="relative">
                    <img
                      src={replaceInfo.logoPreview}
                      alt="LOGO预览"
                      className="w-32 h-32 object-contain border-2 border-slate-200 rounded-xl mx-auto"
                    />
                    <button
                      onClick={removeLogo}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("logoInput")?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      id="logoInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">
                      点击或拖拽上传LOGO图片
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                      支持 PNG、JPG、GIF 格式
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 border-t border-slate-200">
              <button
                onClick={handleConfirmReplace}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check className="w-6 h-6" />
                确认替换
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

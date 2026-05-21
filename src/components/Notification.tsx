import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

const Notification = () => {
  const { notifications, removeNotification } = useAppStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case "info":
        return <Info className="w-6 h-6 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${getBgColor(
            notification.type
          )} animate-slideIn`}
        >
          {getIcon(notification.type)}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useUIStore, Notification } from "@/lib/store/useUIStore";

export function Notifications() {
  const { notifications, removeNotification } = useUIStore();
  const [mounted, setMounted] = useState(false);

  // Only render on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  // Get icon based on notification type
  const Icon = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }[notification.type];

  // Get background color based on notification type
  const bgColor = {
    success:
      "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
    error: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
    warning:
      "bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
  }[notification.type];

  // Get text color based on notification type
  const textColor = {
    success: "text-green-800 dark:text-green-200",
    error: "text-red-800 dark:text-red-200",
    warning: "text-amber-800 dark:text-amber-200",
    info: "text-blue-800 dark:text-blue-200",
  }[notification.type];

  // Get icon color based on notification type
  const iconColor = {
    success: "text-green-500 dark:text-green-400",
    error: "text-red-500 dark:text-red-400",
    warning: "text-amber-500 dark:text-amber-400",
    info: "text-blue-500 dark:text-blue-400",
  }[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-lg border p-4 shadow-md ${bgColor}`}
    >
      <div className="flex items-start gap-3">
        <div className={iconColor}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className={`font-medium ${textColor}`}>{notification.title}</h3>
          <p className={`text-sm ${textColor} opacity-90`}>
            {notification.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`rounded-full p-1 ${textColor} opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

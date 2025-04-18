import { useCallback } from "react";
import { ApiError } from "@/lib/api-client";
import { useUIStore } from "@/lib/store/useUIStore";

/**
 * Hook for handling API errors in a consistent way
 * This hook provides a function to handle API errors and display appropriate notifications
 */
export function useApiError() {
  const { addNotification } = useUIStore();

  const handleError = useCallback(
    (error: unknown, fallbackMessage = "操作に失敗しました") => {
      console.error("API Error:", error);

      let title = "エラー";
      let message = fallbackMessage;

      if (error instanceof ApiError) {
        // Handle specific API error status codes
        switch (error.status) {
          case 400:
            title = "リクエストエラー";
            message = error.data?.message || "無効なリクエストです";
            break;
          case 401:
            title = "認証エラー";
            message = "ログインが必要です";
            break;
          case 403:
            title = "アクセス拒否";
            message = "このアクションを実行する権限がありません";
            break;
          case 404:
            title = "リソースが見つかりません";
            message = "要求されたリソースが見つかりませんでした";
            break;
          case 422:
            title = "入力エラー";
            message = error.data?.message || "入力内容を確認してください";
            break;
          case 429:
            title = "レート制限";
            message =
              "リクエストが多すぎます。しばらく待ってから再試行してください";
            break;
          case 500:
          case 502:
          case 503:
          case 504:
            title = "サーバーエラー";
            message =
              "サーバーエラーが発生しました。しばらくしてから再試行してください";
            break;
          default:
            // Use error message from API if available
            if (error.data?.message) {
              message = error.data.message;
            }
            break;
        }
      } else if (error instanceof Error) {
        // Handle standard JS errors
        message = error.message || fallbackMessage;
      }

      // Add notification
      addNotification({
        type: "error",
        title,
        message,
        autoClose: true,
        duration: 5000,
      });

      return { title, message };
    },
    [addNotification]
  );

  return { handleError };
}

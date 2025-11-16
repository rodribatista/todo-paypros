import { notificationService } from "../../../lib/notifications/notification.service";

export function useNotify() {
  return {
    info: notificationService.info,
    success: notificationService.success,
    error: notificationService.error,
    loading: notificationService.loading,
  };
}

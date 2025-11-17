import { toast } from "sonner";

export const notificationService = {
  info(message: string) {
    toast.info(message);
  },
  loading(id: string, message: string) {
    toast.loading(message, { id });
  },
  success(id: string, message: string) {
    toast.success(message, { id });
  },
  error(id: string, message: string) {
    toast.error(message, { id });
  },
}

import { api } from "./axios.instance";
import { useAuthStore } from "../store/auth.store";

export function authInterceptor() {
  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  );
}

import { useAuthStore } from "../../../../infrastructure/store/auth.store";

export async function authLogoutUseCase() {
  useAuthStore.getState().clearAuth();
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../infrastructure/store/auth.store";

export function PublicRoute() {
  const token = useAuthStore((store) => store.token);
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
}

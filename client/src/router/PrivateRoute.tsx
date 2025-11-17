import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../infrastructure/store/auth.store";

export function PrivateRoute() {
  const token = useAuthStore((store) => store.token);
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

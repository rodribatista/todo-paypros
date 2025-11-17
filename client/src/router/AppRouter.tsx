import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import RegisterPage from "../modules/auth/ui/pages/Register";
import LoginPage from "../modules/auth/ui/pages/Login";
import Tasks from "../modules/tasks/pages/Tasks";
import NotFound from "../shared/ui/pages/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute/>}>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Route>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Tasks/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;

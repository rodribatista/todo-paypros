import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../shared/pages/NotFound";
import Register from "../modules/auth/pages/Register";
import Login from "../modules/auth/pages/Login";
import Tasks from "../modules/tasks/pages/Tasks";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;

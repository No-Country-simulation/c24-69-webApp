import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import NotFound from "../pages/NotFound/index";
import FormPage from "../pages/Form/Form"
import AdminPage from "../pages/Admin";
export function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/form" element={<FormPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
  );
}
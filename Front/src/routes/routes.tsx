import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import NotFound from "../pages/NotFound/index";
import FormPage from "../pages/Form/Form"
import AdminPage from "../pages/Admin";
import LoginPage from "../pages/Login/login";
import RegisterPage from "../pages/signup/singnup"

export function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/form" element={<FormPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<RegisterPage/>}/>
      </Routes>
  );
}
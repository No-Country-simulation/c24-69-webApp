import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index";
import NotFound from "../pages/NotFound/index";

export function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}
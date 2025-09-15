import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/user/login/LoginPage";
// // Import route groups
import AdminRoutes from "./components/admin/AdminRoutes";
import CaseWorkerRoutes from "./components/case-worker/CaseWorkerRoutes";
import ForgotPassword from "./components/user/forgot-password-page/ForgotPassword";
import LogoutSuccess from "./components/user/logout/LogoutSuccess";
import GeneralRoutes from "./components/general/GeneralRoutes";

function AppRoutes() {
  return (
    <Routes>
      {/* General */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/log-out" element={<LogoutSuccess />} />

      {/* Modules */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/user/*" element={<CaseWorkerRoutes />} />

      {/* Error */}
      <Route path="/problem/*" element={<GeneralRoutes />} />
    </Routes>
  );
}

export default AppRoutes;

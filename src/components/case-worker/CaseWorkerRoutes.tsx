import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../user/landing-page/LandingPage";
import Dashboard from "./pages/CaseWorkerDashboard";
import ProfilePage from "../user/profile/ProfilePage";
import DataCollectionRoutes from "../data-collection/DataCollectionRoutes";
import ApplicationRoutes from "../application/ApplicationRoutes";
import EligibilityDeterminationRoutes from "../eligibility/EligibilityDeterminationRoutes";
import NoticeRoutes from "../notice/NoticeRoutes";
import BenefitsRoutes from "../benefits/BenefitsRoutes";
import PaymentStatus from "../benefits/pages/PaymentStatus";
import ReportsRoutes from "../reports/ReportsRoutes";

function CaseWorkerRoutes() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="applications/*" element={<ApplicationRoutes />} />
        <Route path="data/*" element={<DataCollectionRoutes />} />
        <Route
          path="eligibility/*"
          element={<EligibilityDeterminationRoutes />}
        />
        <Route path="notice/*" element={<NoticeRoutes />} />
        <Route path="benefits/*" element={<BenefitsRoutes />} />
        <Route path="payments" element={<PaymentStatus />} />
        <Route path="reports/*" element={<ReportsRoutes />} />
      </Route>
    </Routes>
  );
}

export default CaseWorkerRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import ReportsDashboard from "./pages/ReportsDashboard";
import SystemAuditReport from "./pages/SystemAuditReport";
import PaymentStatusReport from "./pages/PaymentStatusReport";
import NoticeReport from "./pages/NoticeReport";
import BenefitIssuanceReport from "./pages/BenefitIssuanceReport";
import PlanPerformanceReport from "./pages/PlanPerformanceReport";
import BeneficiaryReport from "./pages/BeneficiaryReport";
import DailyStatusReport from "./pages/DailyStatusReport";
import DeniedCitizensReport from "./pages/DeniedCitizensReport";
import ApprovedCitizensReport from "./pages/ApprovedCitizensReport";
import ExportReports from "./pages/ExportReports";

// role can come from context, auth, or props
type ROLE = "admin" | "caseworker";

// Get role from localStorage (set by authentication system)
// Default to "caseworker" if no role is set
const role: ROLE = (localStorage.getItem("role") as ROLE) || "caseworker";

const ReportsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<ReportsDashboard role={role} />} />
      <Route path="export" element={<ExportReports />} />
      <Route path="approved" element={<ApprovedCitizensReport />} />
      <Route path="denied" element={<DeniedCitizensReport />} />
      <Route path="daily-status" element={<DailyStatusReport />} />
      <Route path="beneficiaries" element={<BeneficiaryReport />} />
      <Route path="benefits" element={<BenefitIssuanceReport />} />
      <Route path="notices" element={<NoticeReport />} />
      <Route path="payments" element={<PaymentStatusReport />} />

      {/* Admin only  */}
      {role === "admin" && (
        <>
          <Route path="plan-performance" element={<PlanPerformanceReport />} />
          <Route path="audit" element={<SystemAuditReport />} />
        </>
      )}

      {/* Redirect fallback */}
      <Route path="*" element={<Navigate to="" />} />
    </Routes>
  );
};

export default ReportsRoutes;

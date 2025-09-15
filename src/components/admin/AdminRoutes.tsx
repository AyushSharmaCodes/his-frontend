import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../user/landing-page/LandingPage";
import PlansList from "./pages/PlansList";
import Dashboard from "./pages/AdminDashboard";
import PlanCreate from "./pages/PlanCreate";
import PlanUpdate from "./pages/PlanUpdate";
import CaseWorkers from "./pages/CaseWorkers";
import CaseWorkerCreate from "./pages/CaseWorkerCreate";
import CaseWorkerProfile from "./pages/CaseWorkerProfile";
import PlanView from "./pages/PlanView";
import ProfilePage from "../user/profile/ProfilePage";
import ReportsRoutes from "../reports/ReportsRoutes";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<LandingPage />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="plans" element={<PlansList />} />
        <Route path="plans/create" element={<PlanCreate />} />
        <Route path="plans/:planId/edit" element={<PlanUpdate />} />
        <Route path="plans/:planId/view" element={<PlanView />} />
        <Route path="case-workers" element={<CaseWorkers />} />
        <Route path="case-workers/create" element={<CaseWorkerCreate />} />
        <Route
          path="case-workers/:caseWorkerId/profile"
          element={<CaseWorkerProfile />}
        />
        <Route path="reports/*" element={<ReportsRoutes />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;

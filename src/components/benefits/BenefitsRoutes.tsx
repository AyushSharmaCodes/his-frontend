import { Routes, Route } from "react-router-dom";
import BenefitIssuanceDashboard from "./pages/BenefitIssuanceDashboard";
import BenefitHistory from "./pages/BenefitHistory";
import IssueBenefits from "./pages/IssueBenefits";

function BenefitsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BenefitIssuanceDashboard />} />
      <Route path="history" element={<BenefitHistory />} />
      <Route path="issuance" element={<IssueBenefits />} />
    </Routes>
  );
}

export default BenefitsRoutes;

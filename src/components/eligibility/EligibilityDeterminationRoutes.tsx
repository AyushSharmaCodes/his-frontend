import { Routes, Route } from "react-router-dom";
import EligibilityDashboard from "./pages/EligibilityDashboard";
import EligibilityCheck from "./pages/EligibilityCheck";
import EligibilityResult from "./pages/EligibilityResult";

function EligibilityDeterminationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EligibilityDashboard />} />
      <Route path="check" element={<EligibilityCheck />} />
      <Route path="result" element={<EligibilityResult />} />
    </Routes>
  );
}

export default EligibilityDeterminationRoutes;

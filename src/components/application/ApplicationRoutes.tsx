import { Route, Routes } from "react-router-dom";
import OnboardingSuccess from "./pages/OnboardSuccess";
import StateValidation from "./pages/StateValidaiton";
import CitizenOnboarding from "./pages/CitizenOnboarding";
import ApplicaitonHomePage from "./pages/ApplicationHomePage";

function ApplicationRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ApplicaitonHomePage />}></Route>
      <Route path="citizen-onboarding" element={<CitizenOnboarding />} />
      <Route path="validate" element={<StateValidation />} />
      <Route path="confirmed" element={<OnboardingSuccess />} />
    </Routes>
  );
}

export default ApplicationRoutes;

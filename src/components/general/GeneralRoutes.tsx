import { Route, Routes } from "react-router-dom";
import ErrorPage4xx from "./pages/ErrorPage4xx";
import SessionTimeout from "./pages/SessionTimeout";
import ErrorPage5xx from "./pages/ErrorPage5xx";

const GeneralRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="404" element={<ErrorPage4xx />} />
      <Route path="500" element={<ErrorPage5xx />} />
      <Route path="timeout" element={<SessionTimeout />} />
    </Routes>
  );
};

export default GeneralRoutes;

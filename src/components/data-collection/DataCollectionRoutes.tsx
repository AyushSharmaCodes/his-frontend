import { Routes, Route } from "react-router-dom";
import CitizenData from "./pages/CitizenData";
import CitizenDataEntryForm from "./pages/CitizenDataEntryForm";
import UploadDocuments from "./pages/UploadDocuments";
import ReviewApplicationData from "./pages/ReviewApplicationData";
import SubmissionSuccess from "./pages/SubmissionSuccess";

function DataCollectionRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CitizenData />} />
      <Route path="citizen-data" element={<CitizenDataEntryForm />} />
      <Route path="upload-documents" element={<UploadDocuments />} />
      <Route path="review-application" element={<ReviewApplicationData />} />
      <Route path="submission" element={<SubmissionSuccess />} />
    </Routes>
  );
}

export default DataCollectionRoutes;

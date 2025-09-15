import React from "react";
import styles from "./UploadDocuments.module.css";
import { FaUpload, FaQuestionCircle } from "react-icons/fa";
import Button from "../../ui/Button";

const UploadDocuments: React.FC = () => {
  const documents = [
    {
      title: "Proof of Residence",
      formats: "PDF, JPG, PNG",
    },
    {
      title: "ID Document",
      formats: "PDF, JPG, PNG",
    },
    {
      title: "Medical Certificates",
      formats: "PDF, DOCX",
    },
    {
      title: "Income Proof",
      formats: "PDF, XLSX",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Documents</h1>
      <p className={styles.subtitle}>
        Upload necessary documents for the citizen’s health insurance
        application. Ensure all files meet the specified format and size
        requirements for processing.
      </p>

      <div className={styles.grid}>
        {documents.map((doc) => (
          <div key={doc.title} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{doc.title}</h3>
              <FaQuestionCircle className={styles.helpIcon} />
            </div>
            <div className={styles.uploadArea}>
              <FaUpload className={styles.uploadIcon} />
              <p className={styles.formats}>Accepted formats: {doc.formats}</p>
              <Button type="button" className={styles.uploadBtn}>
                Upload Document
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          className={styles.backBtn}
          to="/user/data/citizen-data"
        >
          Back to Data Entry
        </Button>
        <Button
          type="button"
          className={styles.nextBtn}
          to="/user/data/review-application"
        >
          Next: Review Data
        </Button>
      </div>
    </div>
  );
};

export default UploadDocuments;

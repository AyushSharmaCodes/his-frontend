import React from "react";
import styles from "./SubmissionSuccess.module.css";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../ui/Button";

const SubmissionSuccess: React.FC = () => {
  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.icon} />

      <h1 className={styles.title}>Submission Successful!</h1>
      <p className={styles.message}>
        The citizen's health insurance data has been successfully processed and
        submitted for review. A case ID has been generated for your reference.
      </p>

      <p className={styles.caseId}>
        <strong>Case ID:</strong>{" "}
        <span className={styles.caseIdLink}>HIS-CITIZEN-78901</span>
      </p>

      <div className={styles.actions}>
        <Button className={styles.eligibilityBtn} to="/user/data/">
          Start New Data Entry
        </Button>
        <Button className={styles.newEntryBtn} to="/user/eligibility/check">
          Proceed to Eligibility Check
        </Button>
      </div>
    </div>
  );
};

export default SubmissionSuccess;

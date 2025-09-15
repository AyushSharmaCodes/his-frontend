import React, { useEffect, useState } from "react";
import styles from "./StateValidation.module.css";
import Button from "../../ui/Button";
import {
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
} from "react-icons/fa";

type ValidationState = "progress" | "success" | "failed";

interface ValidationResultProps {
  initialState?: ValidationState;
  rejectionReason?: string;
  onRetry?: () => void;
  onSupport?: () => void;
  onBack?: () => void;
  onSuccessProceed?: () => void;
}

const StateValidation: React.FC<ValidationResultProps> = ({
  initialState = "progress",
  rejectionReason,
  onRetry,
  onSupport,
  onBack,
  onSuccessProceed,
}) => {
  const [state, setState] = useState<ValidationState>(initialState);

  // Simulate async validation (only for demo)
  useEffect(() => {
    if (state === "progress") {
      const timer = setTimeout(() => {
        // randomly succeed/fail for demo
        const isSuccess = Math.random() <= 0.5;
        setState(isSuccess ? "success" : "failed");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className={styles.container}>
      {state === "progress" && (
        <div className={styles.card}>
          <FaSpinner className={`${styles.icon} ${styles.spinner}`} />
          <h2 className={styles.title}>Validation in Progress</h2>
          <p className={styles.subtitle}>
            Please wait while we verify the citizen's residency.
          </p>
          <Button type="button" disabled className={styles.disabledBtn}>
            Validating...
          </Button>
        </div>
      )}

      {state === "success" && (
        <div className={styles.card}>
          <FaCheckCircle className={`${styles.icon} ${styles.success}`} />
          <h2 className={styles.title}>Validation Successful</h2>
          <p className={styles.subtitle}>
            Citizen's residency has been confirmed.
          </p>
          <p>
            Citizen's residency in New Jersey has been successfully verified.
          </p>
          <p>You can now proceed to finalize the onboarding process.</p>
          <Button
            type="button"
            onClick={onSuccessProceed}
            to="/user/applications/confirmed"
            className={styles.onboardBtn}
          >
            Proceed to Onboarding
          </Button>
        </div>
      )}

      {state === "failed" && (
        <div className={styles.card}>
          <FaTimesCircle className={`${styles.icon} ${styles.error}`} />
          <h2 className={`${styles.title} ${styles.errorTitle}`}>
            Application Onboarding Failed
          </h2>
          <p className={styles.subtitle}>
            We regret to inform you that the citizen's application could not be
            approved at this time.
          </p>

          <div className={styles.reasonBox}>
            <h4>Reason for Rejection:</h4>
            <p>
              {rejectionReason ||
                "The applicant is not a verifiable resident of New Jersey. State health insurance programs are only available to residents of New Jersey."}
            </p>
          </div>

          <div className={styles.actionBtns}>
            <Button
              type="button"
              onClick={onRetry}
              className={styles.retryBtn}
              to="/user/applications/citizen-onboarding"
            >
              Retry Application
            </Button>
            <Button
              type="button"
              className={styles.supportBtn}
              onClick={onSupport}
            >
              <FaEnvelope /> Contact Support
            </Button>
            <button type="button" className={styles.linkBtn} onClick={onBack}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateValidation;

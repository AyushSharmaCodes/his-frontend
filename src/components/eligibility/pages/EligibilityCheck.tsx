import React, { useState } from "react";
import styles from "./EligibilityCheck.module.css";
import { FaCheckCircle } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const EligibilityCheck: React.FC = () => {
  const [citizenCase, setCitizenCase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleRunCheck = () => {
    if (!citizenCase) return;
    setStatus("loading");

    // simulate backend call
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Eligibility Check</h1>

      <section className={styles.scroll}>
        {/* Select Citizen Case */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Select Citizen Case</h2>
          <p className={styles.cardSubtitle}>
            Enter a citizen profile to run the eligibility check.
          </p>
          <Input
            type="text"
            placeholder="Enter Citizen Case ID"
            className={styles.input}
            value={citizenCase}
            onChange={(e) => setCitizenCase(e.target.value)}
          />
        </div>

        {/* Initiate Eligibility Check */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Initiate Eligibility Check</h2>

          {status === "idle" && (
            <>
              <Button
                className={styles.checkBtn}
                disabled={!citizenCase}
                onClick={handleRunCheck}
              >
                Run Eligibility Check
              </Button>
              <p className={styles.helperText}>
                Select a citizen case to initiate the eligibility check.
              </p>
            </>
          )}

          {status === "loading" && (
            <div className={styles.loadingState}>
              <div className={styles.spinner}></div>
              <p>Running eligibility check...</p>
            </div>
          )}

          {status === "success" && (
            <div className={styles.successState}>
              <FaCheckCircle className={styles.successIcon} />
              <p>Eligibility check completed successfully.</p>
              <Button
                className={styles.checkBtn}
                onClick={() => alert("Redirecting to results page...")}
                to="/user/eligibility/result"
              >
                View Eligibility Result
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EligibilityCheck;

// src/modules/reports/pages/DailyStatusReport.tsx
import React from "react";
import styles from "../styles/DailyStatusReport.module.css";
import Button from "@/components/ui/Button";

const DailyStatusReport: React.FC = () => {
  // Dummy snapshot data
  const data = {
    citizensOnboarded: 12,
    applicationsSubmitted: 20,
    eligibilitiesChecked: 18,
    approved: 10,
    denied: 8,
    benefitsIssued: 9,
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Daily Status Report</h2>
        <Button to="/user/reports" className={styles.backBtn}>
          ← Back to Reports Dashboard
        </Button>
      </hgroup>

      {/* Metric Cards */}
      <div className={styles.metricsGrid}>
        <div className={styles.card}>
          <h3>Citizens Onboarded</h3>
          <p>{data.citizensOnboarded}</p>
        </div>
        <div className={styles.card}>
          <h3>Applications Submitted</h3>
          <p>{data.applicationsSubmitted}</p>
        </div>
        <div className={styles.card}>
          <h3>Eligibilities Checked</h3>
          <p>{data.eligibilitiesChecked}</p>
        </div>
        <div className={styles.card}>
          <h3>Benefits Issued</h3>
          <p>{data.benefitsIssued}</p>
        </div>
      </div>

      {/* Approved vs Denied */}
      <div className={styles.chartSection}>
        <h3>Eligibility Decisions Today</h3>
        <div className={styles.barWrapper}>
          <div
            className={`${styles.bar} ${styles.approved}`}
            style={{
              width: `${
                (data.approved / (data.approved + data.denied)) * 100
              }%`,
            }}
          >
            Approved: {data.approved}
          </div>
          <div
            className={`${styles.bar} ${styles.denied}`}
            style={{
              width: `${(data.denied / (data.approved + data.denied)) * 100}%`,
            }}
          >
            Denied: {data.denied}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStatusReport;

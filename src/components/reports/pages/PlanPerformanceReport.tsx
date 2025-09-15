// src/modules/reports/pages/PlanPerformanceReport.tsx
import React, { useState } from "react";
import styles from "../styles/PlanPerformanceReport.module.css";
import Button from "@/components/ui/Button";

interface PlanPerformance {
  plan: string;
  totalEnrolled: number;
  eligible: number;
  ineligible: number;
  active: number;
  inactive: number;
  utilization: number; // %
}

const PlanPerformanceReport: React.FC = () => {
  const [plans] = useState<PlanPerformance[]>([
    {
      plan: "SNAP",
      totalEnrolled: 1200,
      eligible: 1000,
      ineligible: 200,
      active: 1100,
      inactive: 100,
      utilization: 82,
    },
    {
      plan: "Medicaid",
      totalEnrolled: 850,
      eligible: 700,
      ineligible: 150,
      active: 800,
      inactive: 50,
      utilization: 74,
    },
    {
      plan: "CCAP",
      totalEnrolled: 500,
      eligible: 450,
      ineligible: 50,
      active: 480,
      inactive: 20,
      utilization: 68,
    },
  ]);

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Plan Performance Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      {/* Summary Cards */}
      <div className={styles.summaryRow}>
        <div className={styles.card}>
          <h4>Total Plans</h4>
          <p>{plans.length}</p>
        </div>
        <div className={styles.card}>
          <h4>Total Citizens Enrolled</h4>
          <p>{plans.reduce((sum, p) => sum + p.totalEnrolled, 0)}</p>
        </div>
        <div className={styles.card}>
          <h4>Active Plans</h4>
          <p>{plans.reduce((sum, p) => sum + p.active, 0)}</p>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Total Enrolled</th>
              <th>Eligible</th>
              <th>Ineligible</th>
              <th>Active</th>
              <th>Inactive</th>
              <th>Utilization</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.plan}>
                <td>{p.plan}</td>
                <td>{p.totalEnrolled}</td>
                <td className={styles.eligible}>{p.eligible}</td>
                <td className={styles.ineligible}>{p.ineligible}</td>
                <td>{p.active}</td>
                <td>{p.inactive}</td>
                <td>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{ width: `${p.utilization}%` }}
                    />
                  </div>
                  <span className={styles.utilizationText}>
                    {p.utilization}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanPerformanceReport;

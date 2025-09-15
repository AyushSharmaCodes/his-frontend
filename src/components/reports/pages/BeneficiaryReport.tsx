// src/modules/reports/pages/BeneficiaryReport.tsx
import React, { useState } from "react";
import styles from "../styles/BeneficiaryReport.module.css";
import Button from "@/components/ui/Button";

interface BenefitTxn {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: "Success" | "Failed" | "Pending";
}

const BeneficiaryReport: React.FC = () => {
  // Dummy citizen data
  const [citizen] = useState({
    id: "CITIZEN-001",
    applicationId: "APP-2025-1001",
    name: "Alice Johnson",
    age: 34,
    gender: "Female",
    address: "123 Main Street, Springfield",
    contact: "+1 234-567-8901",
    plan: "Medicaid",
    eligibility: "Approved",
    reason: "Meets income and household size requirements.",
  });

  const [history] = useState<BenefitTxn[]>([
    {
      id: "TXN-1001",
      date: "2025-08-01",
      type: "Medical Benefit",
      amount: 500,
      status: "Success",
    },
    {
      id: "TXN-1002",
      date: "2025-08-15",
      type: "Dental Benefit",
      amount: 200,
      status: "Pending",
    },
    {
      id: "TXN-1003",
      date: "2025-09-01",
      type: "Pharmacy Benefit",
      amount: 150,
      status: "Failed",
    },
  ]);

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Beneficiary Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      <div className={styles.contentWrapper}>
        {/* Citizen Details */}
        <h3 className={styles.citizenCardHeading}>Citizen Details</h3>
        <div className={styles.citizenCard}>
          <p>
            <strong>Name:</strong> {citizen.name}
          </p>
          <p>
            <strong>Age:</strong> {citizen.age}
          </p>
          <p>
            <strong>Gender:</strong> {citizen.gender}
          </p>
          <p>
            <strong>Address:</strong> {citizen.address}
          </p>
          <p>
            <strong>Contact:</strong> {citizen.contact}
          </p>
          <p>
            <strong>Citizen ID:</strong> {citizen.id}
          </p>
          <p>
            <strong>Application ID:</strong> {citizen.applicationId}
          </p>
        </div>

        {/* Plan & Eligibility */}
        <h3 className={styles.planCardHeading}>Plan & Eligibility</h3>
        <div className={styles.planCard}>
          <p>
            <strong>Enrolled Plan:</strong> {citizen.plan}
          </p>
          <p>
            <strong>Eligibility Decision:</strong>{" "}
            <span
              className={`${styles.badge} ${
                citizen.eligibility === "Approved"
                  ? styles.approved
                  : styles.rejected
              }`}
            >
              {citizen.eligibility}
            </span>
          </p>
          <p>
            <strong>Reason:</strong> {citizen.reason}
          </p>
        </div>

        {/* Benefit History */}
        <h3 className={styles.benefitsHeading}>Benefits Received History</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.id}</td>
                  <td>{txn.date}</td>
                  <td>{txn.type}</td>
                  <td>${txn.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[txn.status.toLowerCase()]
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryReport;

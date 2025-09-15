// src/modules/payments/pages/PaymentStatusReport.tsx
import React, { useState } from "react";
import styles from "../styles/PaymentStatusReport.module.css";
import Button from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import Input from "@/components/ui/Input";

interface Payment {
  txnId: string;
  citizenName: string;
  benefitType: string;
  amount: number;
  bankRef: string;
  gatewayResponse: string;
  status: "Pending" | "Success" | "Failed" | "On Hold";
}

const PaymentStatusReport: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      txnId: "TXN-1001",
      citizenName: "Alice Smith",
      benefitType: "Medical",
      amount: 500,
      bankRef: "BR12345",
      gatewayResponse: "SUCCESS",
      status: "Success",
    },
    {
      txnId: "TXN-1002",
      citizenName: "John Doe",
      benefitType: "SNAP",
      amount: 250,
      bankRef: "BR12346",
      gatewayResponse: "FAILED",
      status: "Failed",
    },
    {
      txnId: "TXN-1003",
      citizenName: "Mary Johnson",
      benefitType: "Medicaid",
      amount: 800,
      bankRef: "BR12347",
      gatewayResponse: "TIMEOUT",
      status: "On Hold",
    },
    {
      txnId: "TXN-1004",
      citizenName: "Raj Patel",
      benefitType: "CCAP",
      amount: 300,
      bankRef: "BR12348",
      gatewayResponse: "PENDING",
      status: "Pending",
    },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(payments.length / pageSize);
  const paginated = payments.slice((page - 1) * pageSize, page * pageSize);

  const handleRetry = (txnId: string) => {
    alert(`Retry triggered for ${txnId}`);
    // later: trigger backend retry API
  };

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Payment Status Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      {/* 🔹 Filters */}
      <div className={styles.filterBox}>
        <Input
          type="text"
          placeholder="Search by Citizen or Txn ID"
          className={styles.Input}
        />
        <Select onValueChange={(v: string) => v}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {["", "Success", "Failed", "Suspicious", "On Hold"].map(
              (status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        <Button className={styles.applyBtn}>Apply</Button>
        <Button className={styles.clearBtn}>Clear</Button>
      </div>

      {/* 🔹 Payment Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Citizen Name</th>
              <th>Benefit Type</th>
              <th>Amount</th>
              <th>Bank Ref</th>
              <th>Gateway Response</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p) => (
              <tr key={p.txnId}>
                <td>{p.txnId}</td>
                <td>{p.citizenName}</td>
                <td>{p.benefitType}</td>
                <td>${p.amount.toFixed(2)}</td>
                <td>{p.bankRef}</td>
                <td>{p.gatewayResponse}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[p.status.toLowerCase().replace(" ", "")]
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {(p.status === "Failed" || p.status === "On Hold") && (
                    <Button
                      className={styles.retryBtn}
                      onClick={() => handleRetry(p.txnId)}
                    >
                      Retry
                    </Button>
                  )}
                  {p.status === "Success" && <span>—</span>}
                  {p.status === "Pending" && <span>⏳</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination */}
      <div className={styles.pagination}>
        <Button
          className={styles.pageBtn}
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          className={styles.pageBtn}
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentStatusReport;

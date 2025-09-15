// src/modules/reports/pages/BenefitIssuanceReport.tsx
import React, { useState } from "react";
import styles from "../styles/BenefitIssuanceReport.module.css";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface Issuance {
  txnId: string;
  citizenName: string;
  plan: string;
  issuanceDate: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
}

const BenefitIssuanceReport: React.FC = () => {
  const [issuances] = useState<Issuance[]>([
    {
      txnId: "TXN-9001",
      citizenName: "Alice Smith",
      plan: "SNAP",
      issuanceDate: "2025-09-10",
      amount: 250,
      status: "Success",
    },
    {
      txnId: "TXN-9002",
      citizenName: "John Doe",
      plan: "Medicaid",
      issuanceDate: "2025-09-11",
      amount: 500,
      status: "Pending",
    },
    {
      txnId: "TXN-9003",
      citizenName: "Raj Patel",
      plan: "CCAP",
      issuanceDate: "2025-09-11",
      amount: 300,
      status: "Failed",
    },
  ]);

  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(issuances.length / pageSize);
  const paginated = issuances.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.container}>
      <hgroup className={styles.header}>
        <h2 className={styles.title}>Benefit Issuance Report</h2>
        <Button className={styles.backBtn} to="/user/reports">
          Back to Dashboard
        </Button>
      </hgroup>

      {/* Filters */}
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
            {["", "Success", "Failed", "Pending"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className={styles.applyBtn}>Apply</Button>
        <Button className={styles.clearBtn}>Clear</Button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Txn ID</th>
              <th>Citizen Name</th>
              <th>Plan</th>
              <th>Issuance Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((i) => (
              <tr key={i.txnId}>
                <td>{i.txnId}</td>
                <td>{i.citizenName}</td>
                <td>{i.plan}</td>
                <td>{i.issuanceDate}</td>
                <td>${i.amount.toFixed(2)}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      styles[i.status.toLowerCase()]
                    }`}
                  >
                    {i.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

export default BenefitIssuanceReport;
